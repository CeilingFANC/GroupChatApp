import React, {Component} from 'react';

class ChatPanel extends Component{

    render(){
        
        return <div >
            List of room:
            {this.props.threads.map((val,index)=><Room key={index} room={val}/>)}
        </div>;
    }
}

function Room(props){
    return <div>{props.room.room.name}</div>
}

export default ChatPanel;