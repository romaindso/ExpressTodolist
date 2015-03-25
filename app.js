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
	var newTask = request.body.title;
	if(!newTask){
		response.sendStatus(400);
		return false;
	}
	tasks.push(newTask);
	response.status(201).json(newTask);
});

app.delete('/tasks/:title', function(request, response){
    var index = tasks.indexOf(request.body.title);
    if(index > -1){
        tasks.splice(index);
    }
    response.sendStatus(204);
});

module.exports = app; 