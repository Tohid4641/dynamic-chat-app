// constants require
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const userRoute = require('./routes/userRoute');
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost';
const sessionSecret = process.env.SESSION_SECRET;

// connect db
mongoose.connect("mongodb+srv://tohid4641:tauhid%40123@cluster0.yucl9of.mongodb.net/dynamic-chat-app").then(()=>{
    console.log("Database connected!");
}).catch((err)=>{
    console.log("Database Err! :",err.message);
});

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:true} ));
app.use(express.static('public'));
app.use(session({ 
    secret:sessionSecret, 
    resave: false,
    saveUninitialized: true, 
}));

// view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// routes
app.use('/',userRoute);

// server
http.listen(port, ()=>{
    console.log(`Server listening ::: ${host}:${port}`);
})