var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/tasks', require('./routes/tasks'));

module.exports = app;