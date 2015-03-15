var express = require('express');
var app = express();

app.get('/', function(request, response){
	response.send('Hello world !');
});

app.get('/tasks', function(request, response){
	response.send('Ok');
});

module.exports = app; 