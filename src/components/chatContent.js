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
        //const socket = socketIOClient("http://127.0.0.1:4000");
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
        return <div>
            
            {this.state.texts.map((val,index)=>
                                
                                    <ChatCard key={index} left={index%2===0} message={val}/>
                                            
                                )}

            <ChatInput handleKeyPress={this.handleKey}/>
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