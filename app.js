var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var tasks = ['task1', 'task2', 'task3'];
app.get('/tasks', function(request, response){
	response.json(tasks);
});

app.post('/tasks', function(request, response){
	var newTask = request.body.name;
	tasks.push(newTask);
	response.status(201).json(newTask);
});

module.exports = app; 