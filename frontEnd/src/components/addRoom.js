import React, {Component} from 'react';
import ChooseManager from './chooseManager';
import axios from 'axios';
import * as actions from '../redux/actions/actions';
import {connect} from 'react-redux';
import AvatarWithAlt from './avatarWithAlt';

class AddRoom extends Component{
    constructor(props){
        super(props);
        let usersInRoom = this.props.current.user._id?[{...this.props.current.user}]:[];
        this.state = {target:null,name:'', usersInRoom:usersInRoom,threads:[]};

    }
    setName = e => {
        console.log(e)
        this.setState({name:e.target.value})
    }

    addUser = (useless,target) =>{
        this.setState((state,props)=>{
            let id = target._id;
            //let unique = state.usersInRoom.filter(val=>val._id!==id);
            let duplicate = state.usersInRoom.reduce((dup,val)=>dup||(val._id===id),false);
            if(duplicate) return state;
            else
            return {
                usersInRoom:[...state.usersInRoom,target]
            };
        })
    }

    userUpdate = (selection) => (useless,target)=>{
        if(selection==='currentUser'){
            console.log('trigger')
            this.props.setUser(target);
            this.props.getRooms();
            
        }

        const temp = {};
        temp[selection]=target;
        
        this.setState((state,props)=>{
            return temp;
        });
    }



    createNewRoom = ()=>{

        console.log('why');
        const thread = {owner_id:this.props.current.user._id,
                        participant_id:[...this.state.usersInRoom],
                        nickName:this.props.current.name,
                        thread_name:this.state.name,
                    };
        axios.post('http://localhost:5001/api/threads/',thread)
                    .then(res=>{
                        //this.props.getRooms()
                        //this.fetchRooms(this.state.currentUser._id);
                        console.log(res)
                        this.props.getRooms();
                    })
                    .catch(err => console.log(err));

    }

    clickHandler = e =>{
        console.log(e.target.innerHTML);
        const thread_id = e.target.innerHTML;
        const room = this.props.roomList.rooms.reduce(
            (room,val)=>room=val.thread_id===thread_id?val:room,{});
        console.log(room);
        this.props.setThread(room);
       
    }

    render(){
        console.log(this.props);
        console.log(this.state)
        return <div >
            <div>
                <input value={this.state.name} onChange={this.setName}/>
            </div>
            List of users:
            <div className='flex-container' onClick={this.clickHandler}>
                {this.state.usersInRoom.map((val,index)=><NameTag key={index} user={val}/>)}
            </div>
            



            <div>
                <h4>target user </h4>
                <ChooseManager manager={{}} userUpdate={this.addUser}/>
            </div>          

            <button onClick={this.createNewRoom} 
                    disabled={this.state.usersInRoom.length<2}>
                    New Room
            </button> 
        </div>;
    }
}

function Room(props){
    return <div>{props.room.thread_id}</div>
}
function NameTag(props){

    return <div style={{width:'30%'}}>
        <AvatarWithAlt name={props.user.name} url={props.user.profile}/>
        <div>{props.user.name}</div>
    </div>;
}



const mapStateToProps = state => {
    return {
      current: state.current,
      roomList: state.roomList
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        setUser: user =>{
            dispatch(actions.setUser(user));
        },
        setThread: thread =>{
            dispatch(actions.setThread(thread));
        },    
        getRooms: ()=>{
            dispatch(actions.getRooms());
        },
    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);
