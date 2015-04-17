var express = require('express'),
    bodyParser = require('body-parser'),
    urlencode = bodyParser.urlencoded({ extended: false }),
    router = express.Router(),
    Task = require('../models/task');

router.route('/')
    .get(function(request, response){
        Task.find(function(err, tasks){
            if(err){
               response.send(err);
            }
            response.json({tasks: tasks});
        });
    })
    .post(urlencode, function(request, response){
        var newTask = request.body;
        if(!newTask.title || !newTask.description){
            response.sendStatus(400);
            return false;
        }
        var task = new Task(newTask);
        task.save(function(err){
            if(err){
                response.send(err);
            }
            response.status(201).json(task.title);
        });
    });

router.route('/:title')
    .get(function(request, response){
        Task.where('title', request.params.title).findOne(function(err, task){
            if(err){
                response.send(err);
            }
            response.render('show.ejs',
                {
                    task: {
                        title: task.title,
                        description: task.description
                    }
                }
            );
        });
    })
    .delete(function(request, response){
        Task.where('title', request.params.title).findOneAndRemove(function(err){
            if(err){
                response.send(err);
            }
            response.sendStatus(204);
        });
    });

module.exports = router;