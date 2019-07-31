import React, {Component} from 'react';
import axios from 'axios';


class ChooseManager extends Component{
    constructor(props){
        super(props);
        this.state = {prefix:"",invalidList:[],data:[],current:{}};
    }
    componentDidUpdate = (prevProps) =>{
        if(this.props.manager!==null && prevProps.manager===null){
            this.setState({current:this.props.manager});
        }
    }
    onChange = e =>{
        this.setState({prefix:e.target.value});
        this.debounce(this.up(e.target.value),500)();

    }

    up = e=>()=>{
         axios.get('http://localhost:5000/api/employees/getallnames/i'+e)
            .then(response=>{
                console.log(response.data);
                this.setState({data:response.data});
            })
            .catch(err=>{
                console.log(err);
            })       
    }

    debounce = (func, delay) => { 
        let debounceTimer 
        return function() { 

            const context = this
            const args = arguments 
                clearTimeout(debounceTimer) 
                    debounceTimer 
                = setTimeout(() => func.apply(context, args), delay) 
        } 
    }  
    selectManager= index =>{ return e =>{
        e.preventDefault();
        console.log(index);
        if(index===-1){
            this.setState({current:{}});
            this.props.userUpdate('manager',{})
            return;
        }
        console.log(this.state.data[index])
        const manager = {...this.state.data[index]};
        //manager._id = this.state.data[index]._id;
        //manager.name = this.state.data[index].name

        this.setState({current:manager});
        this.props.userUpdate('manager',manager)
    }}

    render(){
        return <div>
            {'_id' in this.state.current?<p> Current selected user is {this.state.current.name}</p>:<p>None</p>}
            <input value={this.state.prefix} name="prefix" onChange={this.onChange}></input>
            <ul>
                {this.state.data.map((val,index)=>{
                    const show = true;
                    return <React.Fragment key={index}>
                    {show?<li key={index} val={index} onClick={this.selectManager(index)}>
                            <img key={index} src={'http://localhost:5000/'+val.profile} width="30px" height="30px"></img>
                            {' '+val.name+' -- '+val.title+' '}
                            
                        </li>:""
                    }
                                           
                    </ React.Fragment>;
                })}
            </ul>
        </div>;

    }


}

export default ChooseManager;