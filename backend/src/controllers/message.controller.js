import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar =async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({message:"Internal Server side error"});
    }
    
};

export const getMessages = async(req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, recieverId:userToChatId},
                {senderId:userToChatId, recieverId:myId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({message:"Internal Server Side error"});
    }
};

export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl; // undefined at first
        if(image){ // to handle the image case
            // upload base 64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl,
        });

        await newMessage.save(); // save message to database

        // to do : implement realtime => socket.io : done yayyy
        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){ // the condtion is basically if user is  online or no
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error:"Internal server Side error"});
    }
};