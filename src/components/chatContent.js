import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import ChatInput from './chatInput';
import ChatCard from './chatCard';


class ChatContent extends Component{
    constructor(props){
        super(props);
        this.state = {texts:[...this.props.conversations]};
    }
    addMessage = message =>{
        this.setState((prevState,props)=>{
            console.log(prevState)
            return {texts:[...prevState.texts,message]};
        });          
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
        console.log(this.props)
        
    }
    componentDidUpdate(prevProps){

        if(prevProps.current!==this.props.current){
            this.socket.emit('connect thread',{connect:this.props.current,disconnect:prevProps.current});
        }
    }

    tempAdd = (id,name,text)=>{
        return {author_id:id,author:name,text:text};
    }

    handleKey = (event)=>{
        if(event.keyCode===13){
            const newText = this.tempAdd(this.props.user._id,this.props.user.name,event.target.value);
            console.log(event.target)
            this.setState((prevState,props)=>{
                return {texts:[...prevState.texts,newText]};
            });
            const newMessage = this.tempAdd(this.props.user._id,this.props.user.name,event.target.value);
            newMessage.thread_id = this.props.current;
            this.socket.emit('new Message',newMessage);
            console.log(newMessage);
            event.target.value="";
        }
 
    }
    render(){
        return <div style={{overflowY:'scroll',height:'90vh',}}>
            
            {this.state.texts.map((val,index)=>
                            <ChatCard key={index} left={this.props.user._id===val.author_id} message={val}/>        
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

export default ChatContent;