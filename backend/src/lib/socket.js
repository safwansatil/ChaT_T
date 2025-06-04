import {Server} from "socket.io";
import http from "http";
import express from "express";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});


export function getRecieverSocketId(userId) {
    return userSocketMap[userId];
};

// to store online users
const userSocketMap = {};


io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId]=socket.id;

    // to send events to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

});



export {io, app, server};