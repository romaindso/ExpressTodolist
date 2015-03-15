var express = require('express');
var app = express();

app.get('/', function(request, response){
	response.send('Hello world !');
});

module.exports = app; 