
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const dotenv = require("dotenv");

const app = express();

app.use(cors());

dotenv.config({path:"./config/config.env"});

app.use((req,res,next)=>{
    res.data = {
        status:"",
        data:{},
        statusCode:200
    }
    next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());



module.exports = app;
