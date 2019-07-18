const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const thread_router = require('./thread'); 
const message_router = require('./message'); 
const mongoose = require('mongoose');

mongoose.connect('mongodb://Ziggy:cf10293@cluster0-shard-00-00-crvpq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
  });


app.use('/api/threads',thread_router);
app.use('/api/messages',message_router);

  
app.listen(5000,()=>{
    console.log("lisening to port 5000");
});