import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import ChatInput from './chatInput';
import ChatCard from './chatCard';

import {connect} from 'react-redux';

//props
//
class ChatContent extends Component{
    constructor(props){
        super(props);
        this.state = {texts:[...this.props.conversations]};
    }

    componentDidMount(){
        this.socket = socketIOClient("http://127.0.0.1:4000");
        this.socket.on('new User',function(data){
           // console.log(data);
        })
        const ref = this.addMessage;
        this.socket.on('read message',function(data){
            ref(data);
            //console.log(data);
        })
       // console.log(this.props)
        
    }

    //reset room
    componentDidUpdate(prevProps){
        console.log('update thread connect'+this.props);
        console.log(this.props)
        const prevThread = prevProps.current.thread;
        const currThread = this.props.current.thread;
        console.log(prevThread)
        console.log(currThread)
 
        if(prevThread.thread_id !== currThread.thread_id){
            const req = {};
            if(currThread._id) req['connect']=currThread;
            if(prevThread._id) req['disconnect']=prevThread;
            this.socket.emit('connect thread',req);
        }
    }
    addMessage = message =>{
        this.setState((prevState,props)=>{
            console.log(prevState)
            return {texts:[...prevState.texts,message]};
        });          
    }

    tempAdd = (id,name,text)=>{
        return {author_id:id,author:name,text:text};
    }

    handleKey = (event)=>{
        if(event.keyCode===13){
            const user = this.props.current.user;
            const newText = this.tempAdd(user._id,user.name,event.target.value);
            //add new message
            this.setState((prevState,props)=>{
                return {texts:[...prevState.texts,newText]};
            });

            //send new message to server
            const newMessage = Object.assign(newText,{thread_id:this.props.current.thread.thread_id});
            this.socket.emit('new Message',newMessage);
            console.log(newMessage);
            event.target.value="";
        }
 
    }
    render(){
        const user = this.props.current.user;

        
        return <div style={{overflowY:'scroll',height:'90vh',}}>
            
            {this.state.texts.map((val,index)=>
                            <ChatCard key={index} left={user._id===val.author_id} message={val}/>        
            )}

            <div style={{bottom:30,position:'absolute',width:'100%'}}>
                <ChatInput handleKeyPress={this.handleKey}/>
            </div>
            
        </div>;
    }
}

function Word(props){
    const {author,text} = props.content;
    return <div>
        <span>{author} </span>
        : &nbsp;
        <span>{text}</span>
    </div>;
}


const mapStateToProps = state => {
    return {
      current: state.current,
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
