
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const dotenv = require("dotenv");

const app = express();

app.use(cors())

dotenv.config();


app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());



module.exports = app;
