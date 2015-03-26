var express = require('express'),
    bodyParser = require('body-parser'),
    urlencode = bodyParser.urlencoded({ extended: false }),
    router = express.Router();

var tasks = ['task1', 'task2', 'task3'];

router.route('/tasks')
    .get(function(request, response){
        response.json(tasks);
    })
    .post(urlencode, function(request, response){
        var newTask = request.body.title;
        if(!newTask){
            response.sendStatus(400);
            return false;
        }
        tasks.push(newTask);
        response.status(201).json(newTask);
    });

router.route('/tasks/:title')
    .delete(urlencode, function(request, response){
        var index = tasks.indexOf(request.body.title);
        if(index > -1){
            tasks.splice(index);
        }
        response.sendStatus(204);
});

module.exports = router;