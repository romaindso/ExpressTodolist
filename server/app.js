var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var app = express();

process.env.NODE_ENV = 'development';

// Set dbUrl depending to current NODE_ENV
app.set('dbUrl', config.db[process.env.NODE_ENV]);
mongoose.connect(app.get('dbUrl'));

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use('/tasks', require('./routes/tasks'));

module.exports = app;