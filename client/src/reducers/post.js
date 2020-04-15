
import {
    GET_POST,
    POST_ERROR,UPDATE_LIKES, DELETE_POST,ADD_POST,SINGLE_POST, SINGLE_POST_COMMENT, SINGLE_POST_DELETE
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
        case ADD_POST:
            return {
                ...state,
                //current array with state.posts and add new post in payload 
                //will return post down to any component that uses post component in their state
                //putting payload first will put the comment at the top
                posts: [payload,...state.posts],
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                //return all of the post exept the one with that id as it has been deleted
                posts: state.posts.filter(post => post._id !==payload),
                loading: false
            }
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
        case SINGLE_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case SINGLE_POST_COMMENT: 
            //return state, edit a single post with the post id
            //get the post from the state and manipulate the comments, replace it with the payload i.e the entered text for the comments 
            return {
                ...state,
                post: {...state.post, comments: payload},
                loading: false
            }
            case SINGLE_POST_DELETE: 
            /*
            return state, delete a single post with the post id
            filter through the comments, get whats currently in the post 
            filter through the comments array in the state. For each comment filter out the comment with that spcific id contained within the payload 
            */
            return {
                ...state,
                post: {...state.post, comment:state.post.comments.filter(comment => comment._id === payload ),
            },
               loading: false
            }

            default:
                return state;
    }
}