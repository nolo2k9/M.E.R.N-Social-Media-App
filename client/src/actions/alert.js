import {SET_ALERT, REMOVE_ALERT} from './types';
import uuid from 'uuid';

/*
    Dispatch multiple action types using dispatch, used with thunk middleware
    Generate a random id using uuid for payload.
    dispatch an alert a payload including a mesg, an alertype and a random id 
*/
export const setAlert = (msg, alertType, timeOut = 5000) => dispatch => {

    //generating a unique id from uuid
    const id = uuid.v4();

    //Set alert resolves the sitch case type in ../redcuers/alert
    //payload includes the message, the alert type and the id 
    dispatch({
        type: SET_ALERT,
        payload:{msg, alertType, id}
    });
    /*
        js function that does an action after a certain amount of time.
        Dispatach an object with a type of REMOVE_ALERT.
        Passing in a paylaod of id, because it doesnt need to send anymore datas
        Timer set to 5k milliseconds so will remove in 5 seconds
    */
    setTimeout(()=> dispatch({type: REMOVE_ALERT, payload: id}),timeOut)

};