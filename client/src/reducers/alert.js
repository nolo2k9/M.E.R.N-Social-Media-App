import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
//reducer is a function that takes in state, in this case any state to do with alerts and an action.

//initial state is an array that contains objects
const initialState = [

];
/*
    creates object containing any reducers created
    takes in initial stae and an action.
    An action takes in a type and a payload which is data being sent
    The constants for the actions can be found in the actions folder

*/
export default function (state = initialState, action) {
    //pull out type and payload from action
    const { type, payload } = action;

    switch (type) {
        /*
            Depending on what type is used it sends down the relevant state in an array
            Since state is immutable we need to include what is already in the state, 
            so the spread operator must be used to copy the state and add the new alert.

            The action then sends the data in the form of a payload 
        */
        case SET_ALERT:
            return [...state, payload];
        /*
            Remove a specific alert by it's id
            Return the array state and filter through the alerts
            Then for each alert check and see if the alert.id is not equal to the payload 
        */
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        //Default case: return the state
        default:
            return state;


    }

}
