
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());



module.exports = app;
