import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.jwt; // since we assigned the name of cookies as jwt

        if(!token){
            return res.status(401).json({message:"Unauthorized - No token provided"});
        }

        // the payload of token has user id(since u gave it), we should decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // it should return a truey value
        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid token"});
        }

        // find the user
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }


        req.user = user;

        next(); // calls the next function since this is supposed to be middleware
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({message:"Internal server side error"});
    }
};