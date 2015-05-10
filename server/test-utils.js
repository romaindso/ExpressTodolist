var mongoose = require('mongoose');
var config = require('./config');

process.env.NODE_ENV = 'test';

mongoose.connection.on('error', function(err){
    console.log(err);
});

beforeEach(function (done) {

    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove();
        }
        return done();
    }

    function reconnect() {
        mongoose.connect(config.db.test, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    }

    function checkState() {
        switch (mongoose.connection.readyState) {
            case 0:
                reconnect();
                break;
            case 1:
                clearDB();
                break;
            default:
                process.nextTick(checkState);
        }
    }

    checkState();
});

afterEach(function (done) {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.disconnect();
    return done();
});