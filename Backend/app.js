var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./mongo')
var cors = require('cors')
// require('dotenv').config()
var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/list', require('./routes/list'));
// app.use('/card',require('./routes/card'));

module.exports = app;
