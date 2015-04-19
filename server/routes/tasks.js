var express = require('express'),
    bodyParser = require('body-parser'),
    urlencode = bodyParser.urlencoded({ extended: false }),
    router = express.Router(),
    tasks = require('../controllers/tasks');

router.route('/')
    .get(function(request, response) {
        tasks.list(request, response);
    })
    .post(urlencode, function(request, response){
        tasks.addTask(request, response);
    });

router.route('/:title')
    .get(function(request, response){
        tasks.getSingleTask(request, response);
    })
    .delete(function(request, response){
        tasks.deleteTask(request, response);
    });

module.exports = router;