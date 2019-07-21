import {combineReducers} from 'redux';
import chatRoomReducer from './chatRoomReducer';
import roomList from './roomList';

const reducers = combineReducers({
    chatRoomReducer,
    roomList,
});

export default reducers;