import React, {Component} from 'react';
import ChooseManager from './chooseManager';
import axios from 'axios';

class ChatPanel extends Component{
    constructor(props){
        super(props);
        this.state = {target:null,currentUser:null,threads:[]};
    }
    userUpdate = (selection) => (useless,target)=>{
        if(selection==='currentUser'){
            this.fetchRooms(target._id);
            this.props.setUser(target);
        }

        const temp = {};
        temp[selection]=target;
        
        this.setState((state,props)=>{
            return temp;
        });
    }

    fetchRooms = (id) =>{

        axios.get('http://localhost:5001/api/threads/owner/'+id)
            .then(res=>{
                console.log(res)
                this.setState({threads:res.data})
            })
            .catch(err=>console.log(err));
    }

    createNewRoom = ()=>{
        if(!this.state.target && !this.state.currentUser){
            return;
        }
        console.log('why');
        const thread = {owner_id:this.state.currentUser._id,
                        participant_id:[this.state.currentUser._id,this.state.target._id],
                        nickName:this.state.currentUser.name,
                    };
        axios.post('http://localhost:5001/api/threads/',thread)
                    .then(res=>{
                        
                        this.fetchRooms(this.state.currentUser._id);
                        
                        console.log(res)
                    })
                    .catch(err => console.log(err));

    }

    clickHandler = e =>{
        console.log(e.target.innerHTML);
        this.props.setCurrent(e.target.innerHTML);
       
    }

    render(){
        console.log(this.state)
        return <div >
            List of room:
            <div onClick={this.clickHandler}>
                {this.state.threads.map((val,index)=><Room key={index} room={val}/>)}
            </div>
            


            <div>
                <h4>current user </h4>
                <ChooseManager manager={{}} userUpdate={this.userUpdate('currentUser')}/>
            </div>
            <br/>
            <div>
                <h4>target user </h4>
                <ChooseManager manager={{}} userUpdate={this.userUpdate('target')}/>
            </div>          

            <button onClick={this.createNewRoom} 
                    disabled={!this.state.target && !this.state.currentUser}>
                    New Room
            </button> 
        </div>;
    }
}

function Room(props){
    return <div>{props.room.thread_id}</div>
}

export default ChatPanel;