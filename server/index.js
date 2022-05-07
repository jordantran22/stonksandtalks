const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]

    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
        console.log("sent message back");
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});


server.listen(process.env.PORT || 5000, () => {
    console.log("SERVER RUNNING ON PORT 5000");
});