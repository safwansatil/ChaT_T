import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        fullName:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
            maxlength:100,
        },
        profilePic:{
            type: String,
            default: "",
        }
    },
    { timestamps: true}
);

const User = mongoose.model("User", userSchema); // mongoose wants singular, capitalised first letter for model

export default User;