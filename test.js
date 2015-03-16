var request = require('supertest');
var app = require('./app');

describe('Requests to the root path', function(){
	it('Returns a 200 status code', function(done){
		request(app)
			.get('/')
			.expect(200)
			.end(function(error){
				if(error) throw error;
				done();
			});
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
			.expect(JSON.stringify(['task1', 'task2', 'task3']), done)
	});
});