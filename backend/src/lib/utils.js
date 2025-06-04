import jwt from "jsonwebtoken";

export const generateToken = (userId, res) =>{

    // create a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    }); // the first thing sign takes is a payload, then secretkey, then options

    // send jwt in cookie
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, // since it is in ms
        httpOnly: true, // prevents XSS attacks, basically makes ur website a bit secure
        sameSite: "strict", // CSRF attacks, forgery attacks, basically makes it a bit secure
        secure: process.env.NODE_ENV !== "development" // should be secure for https in production mode
    });

    return token;
}