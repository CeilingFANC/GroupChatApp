import React, {Component} from 'react';
import ChooseManager from './chooseManager';
import axios from 'axios';
import * as actions from '../redux/actions/actions';
import {connect} from 'react-redux';

class ChatPanel extends Component{
    constructor(props){
        super(props);
        this.state = {target:null,currentUser:null,threads:[]};
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

    fetchRooms = (id) =>{

        axios.get('http://localhost:5001/api/threads/owner/'+id)
            .then(res=>{
                console.log(res)
                this.setState({threads:res.data})
            })
            .catch(err=>console.log(err));
    }


    clickHandler = e =>{
        //console.log(e.target.innerHTML);
        const thread_id = e.target.getAttribute('name');
        console.log(e.target.getAttribute('name'));
        const room = this.props.roomList.rooms.reduce(
            (room,val)=>room=val.thread_id==thread_id?val:room,{});
        //console.log(room);
        this.props.setThread(room);
       
    }

    render(){
        console.log(this.props)
        return <div >
            List of room:
            <div onClick={this.clickHandler}>
                {this.props.roomList.rooms.map((val,index)=><Room key={index} room={val}/>)}
            </div>
            


            <div>
                <h4>current user </h4>
                <ChooseManager manager={{}} userUpdate={this.userUpdate('currentUser')}/>
            </div>
            <br/>
      

        </div>;
    }
}

function Room(props){
    console.log(props);
    return <div name={props.room.thread_id}>{props.room.thread_name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel);
