"use strict";
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Message = require('./DAO/message');



router.use(bodyParser.json());

// CRUD FOR threads
router.get('/',(req,res)=>{
    Message.find(function(err,messages){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            console.log(messages);
            res.send(messages);
        }
    })

});



router.post('/',(req,res)=>{
    let newMessage = new Message(req.body);
    newMessage.save(function(err,mass){
        if(err){
            console.log(err);
            res.status(500)
                .send(err);
        }else{
            res.status(200)
                .send(mass);
        }
    })
});

router.get('/:id',(req,res)=>{
    Message.findById(req.params.id)
        .exec(function(err,message){
            if(err){
                console.log(err);
                res.status(500).send(500);
            }else{
                console.log(message);
                res.send(message);
            }
        }) 
});



module.exports = router