import Axios from "axios";

export const setUser = user =>({
    type: 'SET_USER',
    user:user,
});

export const setThread = thread => ({
    type: 'SET_THREAD',
    thread:thread,
});




function requestStart(){
    return {
        type:'LIST_FETCH_REQUEST',
    };
}

function requestSuccess(response){
    return {
        type:'LIST_FETCH_SUCCESS',
        data:response.data,
    };
}

function requestFail(response){
    return {
        type:'LIST_FETCH_REQUEST',
        error: response,
    };
}

export function getRooms(){
    return (dispatch,getState) =>{
        const {current} = getState()
        dispatch(requestStart());
        if(!current.user._id){
            return;
        }
        
        const {_id:id} = current.user;
        Axios
            .get('http://localhost:5001/api/threads/owner/'+id)
            .then(response=>{
                console.log(response);
                dispatch(requestSuccess(response));
            })
            .catch(err=>{
                dispatch(requestFail(err));
            });
    }
}

