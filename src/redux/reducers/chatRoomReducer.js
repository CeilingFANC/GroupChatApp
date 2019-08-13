const chatRoomReducer = (state={data:[],loading:false},action)=>{
    switch(action.type){
        case "TEXTLIST_FETCH_REQUEST":
            return {
                ...state,
                loading:true,
            };
        case "TEXTLIST_FETCH_SUCCESS":
            return {
                ...state,
                loading:false,
                data:action.data,
            };
        case "TEXTLIST_FETCH_FAIL":
            return {
                ...state,
                loading:false,
            };
        default:
            return state;
    }

}

export default chatRoomReducer;