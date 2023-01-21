const express = require("express");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const router = require("./routes/userRoute");
const sequelize = require("./db");
const { User } = require("./models/models");
const { UserController } = require("./controllers/main.js");

const PORT = process.env.PORT || 3214;

const app = require("express")();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(router);

const server = require("http").createServer(app);

const port = process.env.PORT || 8080;

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.on("join", async ({ name, room }) => {
        socket.join(room);

        const user = UserController(name, room);

        socket.emit("message", {
            data: { user: { name: "Admin" }, message: `Hy bro how is going? ` },
        });
        socket.broadcast.to(user.room).emit("message", {
            data: {
                user: { name: "Admin" },
                message: `${name} user was connect`,
            },
        });
        const userInRoom = await User.findAll({ where: { room: room } });
        io.to(room).emit("room", {
            data: {
                users: userInRoom.length,
            },
        });
        socket.on("sendMessage", async ({ message, params }) => {
            const user = await User.findOne({
                where: { name: params.name, room: params.room },
            });

            if (user) {
                io.to(user.room).emit("message", { data: { user, message } });
            }
        });
    });
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});

server.listen(port, async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Listening on port ${port}`);
});
