import {combineReducers} from 'redux';
import chatRoomReducer from './chatRoomReducer';
import roomListReducer from './roomListReducer';
import currentUserReducer from './currentUserReducer';
const reducers = combineReducers({
    //chatRoomReducer,
    roomList: roomListReducer,
    current: currentUserReducer,
});

export default reducers;