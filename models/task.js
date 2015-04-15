var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Task', taskSchema);