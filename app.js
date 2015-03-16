var express = require('express');
var app = express();

app.get('/', function(request, response){
	response.send('Hello world !');
});

app.get('/tasks', function(request, response){
	var tasks = ['task1', 'task2', 'task3'];
	response.json(tasks);
});

module.exports = app; 