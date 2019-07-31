"use strict";
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Thread = require('./DAO/threads');
const Message = require('./DAO/message');


//  :5001/api/threads

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
//get all thread by owner
router.get('/owner/:owner_id',(req,res)=>{
    Thread.find({owner_id:req.params.owner_id})
        .exec(function(err,threads){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            console.log(threads);
            res.send(threads);
        }
    })

});

function copyThreadObject(body,newOwnerId,thread_id,nickName){
    let rep = JSON.parse(JSON.stringify(body));
    rep.owner_id = newOwnerId;
    rep.thread_id = thread_id;
    rep.nickName = nickName?nickName:'';
    return rep;
}


//create new Thread
router.post('/',(req,res)=>{
    
    let rep = JSON.parse(JSON.stringify(req.body));
    rep.nickName = req.body.participant_id.reduce((red,val)=>val._id===rep.owner_id?val.name:red,'')
    console.log("here")
    console.log(req.body)
    let newThread = new Thread(rep);
    newThread.save()
            .then(thread=>{
                let id = thread._id;
                thread.thread_id=id;
       
                // create rest thread for other participant


                let promise_arr = req.body.participant_id
                    .filter(newOwner=>newOwner._id!==req.body.owner_id) 
                    .map(newOwner=>{
                        console.log(newOwner)
                        let newThread2 = new Thread(copyThreadObject(req.body,newOwner._id,id,newOwner.name));
                        return newThread2.save();
                    })            

                //update original thread_id
                promise_arr.push(Thread.findOneAndUpdate({_id:id},thread));  
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

//find all message under given thread id
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