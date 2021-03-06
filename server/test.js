var request = require('supertest');
var utils = require('./test-utils');
var app = require('./app');
var Task = require('./models/task');


describe('Requests to the root path', function () {
    it('Returns a 200 status code', function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('Returns a HTML format', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done);
    });

    it('Returns an index file with Tasks', function (done) {
        request(app)
            .get('/')
            .expect(/tasks/i, done);
    });
});

describe('Listening tasks on /tasks', function () {
    it('Returns a 200 status code', function (done) {
        request(app)
            .get('/tasks')
            .expect(200, done);
    });

    it('Returns JSON format', function (done) {
        request(app)
            .get('/tasks')
            .expect('Content-Type', /json/, done);
    });

    it('Returns initial tasks', function (done) {
        request(app)
            .get('/tasks')
            .expect([], done);
    });
});

describe('Creating new tasks', function () {
    it('Returns a 201 status code', function (done) {
        request(app)
            .post('/tasks')
            .send('title=build+an++app&description=based+on+express')
            .expect(201, done);
    });

    it('Returns the task', function (done) {
        request(app)
            .post('/tasks')
            .send('title=build+an+app&description=based+on+express')
            .expect(/build an app/i, done);
    });

    it('Validates the task name', function (done) {
        request(app)
            .post('/tasks')
            .send('title=')
            .expect(400, done);
    });
});

describe('Delete a task', function () {

    it('Returns a 204 status code', function (done) {
        request(app)
            .delete('/tasks/Cooking')
            .expect(204, done);
    });
});

describe('Shows tasks description', function () {

    beforeEach(function (done) {
        var task = new Task({title: 'Cooking', description: 'Learn to make cookies'});
        task.save(function (err) {
            if (err) {
                throw err;
            }
            done();
        });
    });

    afterEach(function(done){
        var query = Task.where({title: 'Cooking'});
        query.findOneAndRemove(function(err){
            if(err){
                throw err;
            }
            done();
        });
    });

    it('Returns 200 status code', function (done) {
        var task = new Task({title: 'Cooking', description: 'Learn to make cookies'});
        task.save(function (err) {
            if (err) {
                throw err;
            }
        });
        request(app)
            .get('/tasks/Cooking')
            .expect(200, done);
    });

    it('Returns a HTML format', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done);
    });

    it('Returns description for given task', function (done) {
        request(app)
            .get('/tasks/Cooking')
            .expect(/cookies/, done);
    });
});