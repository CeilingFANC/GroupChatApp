import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import ChatInput from './chatInput';
import ChatCard from './chatCard';


class ChatContent extends Component{
    constructor(props){
        super(props);
        this.state = {texts:[...this.props.conversations]};
    }

    componentDidMount(){
        this.socket = socketIOClient("http://127.0.0.1:4000");
        this.socket.on('new User',function(data){
            console.log(data);
        })
    }
    tempAdd = (id,text)=>{
        return {author:id,text:text};
    }

    handleKey = (event)=>{
        if(event.keyCode===13){
            const newText = this.tempAdd(this.props.user.id,event.target.value);
            console.log(event.target)
            this.setState((prevState,props)=>{
                return {texts:[...prevState.texts,newText]};
            });
            event.target.value="";
        }
 
    }
    render(){
        return <div style={{overflowY:'scroll',height:'90vh',}}>
            
            {this.state.texts.map((val,index)=>
                            <ChatCard key={index} left={index%2===0} message={val}/>        
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