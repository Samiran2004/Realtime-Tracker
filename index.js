const express = require('express');
const app = express();
const socketIo = require("socket.io");
const http = require('http');

require('dotenv').config();

const server = http.createServer(app);

const io = socketIo(server);

app.get('/',(req,res)=>{
    res.send("Hello from realtime tracker...");
});

server.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("Server connection error...");
    }else{
        console.log(`Server connected on post ${process.env.PORT}`);
    }
});