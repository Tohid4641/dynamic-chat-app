// constants require
const app = require('express')();
const http = require('http').Server(app);
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost'

// connect db
mongoose.connect("mongodb+srv://tohid4641:tauhid%40123@cluster0.yucl9of.mongodb.net/dynamic-chat-app").then(()=>{
    console.log("Database connected!");
}).catch((err)=>{
    console.log("Database Err! :",err.message);
});

// server
http.listen(port, ()=>{
    console.log(`Server listening ::: ${host}:${port}`);
})