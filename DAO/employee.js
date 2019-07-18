var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    
    name: String,
    title: String,
    sex: String,
    startDate: {type:Date,default:Date.now},
    officePhone: String,
    cellPhone: String,
    email: String,
    profile:String,
    manager:{
        _id:{type:Schema.Types.ObjectId,ref:'Employee'},
        name: String,
    },
    reported: [{type:Schema.Types.ObjectId,ref:'Employee'}],

});


module.exports = mongoose.model('Employee',EmployeeSchema);
