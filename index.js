const express = require('express');
const app = express();
const socketIo = require("socket.io");
const http = require('http');
const path = require('path');

require('dotenv').config();

const server = http.createServer(app);

const io = socketIo(server);

app.set("view engine", "ejs");
app.set('views', './views');
app.use(express.static(path.resolve('./Public')));

let users = {};

io.on('connection', (socket) => {
    socket.on("send-location", (data) => {
        console.log(`Location received from ${socket.id}:`, data);
        users[socket.id] = {
            id: socket.id,
            latitude: data.latitude,
            longitude: data.longitude
        };
        io.emit("receive-location", Object.values(users));
    })

    socket.on("disconnect", () => {
        delete users[socket.id];
        io.emit("user-disconnect", socket.id);
        console.log("User disconnect...")
    })
    console.log("Connected");
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Server connection error...");
    } else {
        console.log(`Server connected on post ${process.env.PORT}`);
    }
});