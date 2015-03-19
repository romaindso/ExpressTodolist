var request = require('supertest');
var app = require('./app');

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
			.expect(JSON.stringify(['task1', 'task2', 'task3']), done);
	});
});

describe('Creating new tasks', function(){
	it('Returns a 201 status code', function(done){
		request(app)
			.post('/tasks')
			.send('name=build+an+express+app')
			.expect(201, done);
	});

	it('Returns the task name', function(done){
		request(app)
			.post('/tasks')
			.send('name=build+an+express+app')
			.expect(/build an express app/i, done);
	});
});