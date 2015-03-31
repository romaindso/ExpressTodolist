var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Requests to the root path', function(){
	it('Returns a 200 status code', function(done){
		request(app)
			.get('/')
			.expect(200, done);
	});

	it('Returns a HTML format', function(done){
		request(app)
			.get('/')
			.expect('Content-Type', /html/, done);
	});

	it('Returns an index file with Tasks', function(done){
		request(app)
			.get('/')
			.expect(/tasks/i, done);
	});
});

describe('Listening tasks on /tasks', function(){
	it('Returns a 200 status code', function(done){
		request(app)
			.get('/tasks')
			.expect(200, done);
	});

	it('Returns JSON format', function(done){
		request(app)
			.get('/tasks')
			.expect('Content-Type', /json/)
			.end(function(error){
				if(error) throw error;
				done();
			});
	});

	it('Returns initial tasks', function(done){
		request(app)
			.get('/tasks')
			.expect(JSON.stringify([]), done);
	});
});

describe('Creating new tasks', function(){
	it('Returns a 201 status code', function(done){
		request(app)
			.post('/tasks')
			.send('title=build+an++app&description=based+on+express')
			.expect(201, done);
	});

	it('Returns the task name', function(done){
		request(app)
			.post('/tasks')
			.send('title=build+an+app&description=based+on+express')
			.expect(/build an app/i, done);
	});

	it('Validates the task name', function(done){
		request(app)
			.post('/tasks')
			.send('title=')
			.expect(400, done);
	});
});

describe('Delete a task', function(){

	before(function(){
		client.hset('tasks', 'Cooking', 'Learn to make cookies');
	});

	after(function(){
		client.flushdb();
	});

	it('Returns a 204 status code', function(done){
		request(app)
			.delete('/tasks/Cooking')
			.expect(204, done);
	});
});
