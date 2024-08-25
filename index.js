const express = require('express');
const app = express();

require('dotenv').config();

app.get('/',(req,res)=>{
    res.send("Hello from realtime tracker...");
});

app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("Server connection error...");
    }else{
        console.log(`Server connected on post ${process.env.PORT}`);
    }
});