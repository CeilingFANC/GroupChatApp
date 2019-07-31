var mongoose = require('mongoose');
var Employee = require('./employee');
var Thread = require('./threads');

var Schema = mongoose.Schema;


var MessageSchema = new Schema({
    thread_id: {type:Schema.Types.ObjectId,ref:'Thread'},
    author_id: {type:Schema.Types.ObjectId,ref:'Employee'},
    created_at: {type:Date,default:Date.now},
    text: String,

});

module.exports = mongoose.model('Message', MessageSchema);