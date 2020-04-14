
import {
    GET_POST,
    POST_ERROR
} from '../actions/types';
//object containing state
const initialState = {
posts:[],
post: null,
loading: true,
error:{}
}

export default function(state=initialState,action){
    //pulling type and paload from the action
    const {type, payload} = action;

    switch(type) {
        //returning the state and the array of posts in the payload
        case GET_POST:
            return{
                ...state,
                posts: payload,
                loading: false
            };

        case POST_ERROR:
            //returning the state and the  of error in the payload
            return{
                ...state,
                error: payload,
                loading: false
            };
            default:
                return state;
    }
}