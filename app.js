var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/tasks', function(request, response){
	var tasks = ['task1', 'task2', 'task3'];
	response.json(tasks);
});

app.post('/tasks', function(request, response){
	response.sendStatus(201);
});

module.exports = app; 