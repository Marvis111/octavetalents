
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const dotenv = require("dotenv"),
expressSession = require('express-session'),
 
app = express();
//configure env vars
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors());
app.use(cookieParser("secretkey"));
app.use(expressSession({
    secret:"secretkey",
    cookie:{
            maxAge:1000 * 60 * 20,
    },
    resave:false,saveUninitialized:false
}) )


app.use((req,res,next)=>{
    res.data = {
        status:"",
        data:{},
        statusCode:200
    }
    next();
});




module.exports = app;
