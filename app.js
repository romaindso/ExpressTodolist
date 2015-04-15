var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/todolist');

app.use(express.static(__dirname + '/public'));
app.use('/tasks', require('./routes/tasks'));

module.exports = app;