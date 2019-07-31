var mongoose = require('mongoose');
var Employee = require('./employee');
var Schema = mongoose.Schema;


var ThreadSchema = new Schema({
    owner_id: String,
    participant_id: [{type:Schema.Types.ObjectId,ref:'Employee'}],
    thread_id: {type:Schema.Types.ObjectId,ref:'Tread'},
    thread_name: String,
    nickName: String,
    created_at: {type:Date,default:Date.now},
    updated_at: Date,

});

module.exports = mongoose.model('Thread', ThreadSchema);