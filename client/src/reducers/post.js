
import {
    GET_POST,
    POST_ERROR,UPDATE_LIKES
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
            /*
             Map through the posts 
             For each post check to see if it is the correct post ( if it matches he payload id)
             If it does return the post likes 
             Else just return the post 
            */
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? {...post, likes: payload.likes} : post),
                //Set loading to false 
                loading: false 
            }
            default:
                return state;
    }
}