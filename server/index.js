const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require('dotenv').config()
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_URL,
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })
    socket.on("disconnect", () => {
    })
})

server.listen(process.env.PORT, () => {
});