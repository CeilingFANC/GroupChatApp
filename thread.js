"use strict";
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Thread = require('./DAO/threads');
const Message = require('./DAO/message');




router.use(bodyParser.json());

// CRUD FOR threads
router.get('/',(req,res)=>{
    Thread.find(function(err,threads){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            console.log(threads);
            res.send(threads);
        }
    })

});



router.post('/',(req,res)=>{
    let newThread = new Thread(req.body);

    console.log("here")
    newThread.save()
            .then(thread=>{
                let id = thread._id;
                let promise_arr = [];
                
                let rep = JSON.parse(JSON.stringify(req.body));
                rep.owner_id = req.body.participant_id.reduce((prev,val)=>val!==req.body.owner_id?val:prev);
                rep.thread_id = id;
                let newThread2 = new Thread(rep);
                
                thread.thread_id=id;    

                promise_arr.push(Thread.findOneAndUpdate({_id:id},thread));  
                promise_arr.push(newThread2.save());
                return Promise.all(promise_arr);
            })
            .then(mass=>{
                console.log(mass);
                res.status(200)
                    .send(mass);
            })
            .catch(err=>{
                console.log(err);
                res.status(500)
                    .send(err);
            })

});

router.get('/:id',(req,res)=>{
    Thread.findById(req.params.id)
        .populate('participant_id')
        .exec(function(err,users){
            if(err){
                console.log(err);
                res.status(500).send(500);
            }else{
                console.log(users);
                res.send(users);
            }
        }) 
});
router.put('/:id',(req,res)=>{
    let rep = JSON.parse(JSON.stringify(req.body));
    delete rep._id;
    Thread.findOneAndUpdate({_id:req.params.id},rep,(err,old)=>{
        if(err){
            console.log(err);
            res.status(500)
                .send(500);
        }else{
            console.log(old);
            res.status(200)
                .send(users);
        }        
    })
});

router.get('/:thread_id/messages',(req,res)=>{
    Message.find({thread_id:req.params.thread_id})
        .exec(function(err,messages){
            if(err){
                console.log(err);
                res.status(500).send(500);
            }else{
                console.log(messages);
                res.send(messages);
            }
        }) 
});
module.exports = router