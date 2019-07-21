const roomList = (state={rooms:[],loading:false},action)=>{
    switch(action.type){
        case "LIST_FETCH_REQUEST":
            return {
                ...state,
                loading:true,
            };
        case "LIST_FETCH_SUCCESS":
            return {
                ...state,
                loading:false,
                rooms:action.data,
            };
        case "LIST_FETCH_FAIL":
            return {
                ...state,
                loading:false,
            };
        default:
                return state;        
    }

}

export default roomList;