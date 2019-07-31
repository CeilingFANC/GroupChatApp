import {combineReducers} from 'redux';
import roomListReducer from './roomListReducer';
import currentUserReducer from './currentUserReducer';
const reducers = combineReducers({
    //chatRoomReducer,
    roomList: roomListReducer,
    current: currentUserReducer,
});

export default reducers;