import {combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

//creates object containing any reducers created
export default combineReducers({
    alert,
    auth,
    profile,
    post
});