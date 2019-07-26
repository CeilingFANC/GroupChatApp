const initState = {
    user:{},
    thread:{},
}
const currentUserReducer = (state=initState,action) =>{
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user:{...action.user},
            };
        case 'SET_THREAD':
            return {
                ...state,
                thread:{...action.thread},
            };
        default:
            return state;
    }
}

export default currentUserReducer;