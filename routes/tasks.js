var express = require('express'),
    bodyParser = require('body-parser'),
    urlencode = bodyParser.urlencoded({ extended: false }),
    router = express.Router(),
    redis = require('redis'),
    client = redis.createClient();

client.select((process.env.NODE_ENV || 'development').length);

router.route('/')
    .get(function(request, response){
        client.hkeys('tasks', function(error, replies){
            if(error) throw error;
            response.json(replies);  
        });
    })
    .post(urlencode, function(request, response){
        var newTask = request.body;
        if(!newTask.title || !newTask.description){
            response.sendStatus(400);
            return false;
        }
        client.hset('tasks', newTask.title, newTask.description, function(error) {
            if(error) throw error;
            response.status(201).json(newTask.title);
        });
    });

router.route('/:title')
    .get(function(request, response){
        client.hget('tasks', request.params.title, function(error, description){
            response.render('show.ejs', 
                { 
                    task: {
                        title: request.params.title,
                        description: description
                    }
                } 
            );
        });
    })
    .delete(function(request, response){
        client.hdel('tasks', request.params.title, function(error){
            if(error) throw error;
            response.sendStatus(204);
        });
    });

module.exports = router;