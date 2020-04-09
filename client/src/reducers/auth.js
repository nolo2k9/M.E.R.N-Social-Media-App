//importing action types
import{REGISTER_SUCCESS,REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED} from '../actions/types';

/*
    initial state object
    It will contain:
    -A json webtoken which will be stored in local storage and is called token.

    -isAuthenticated when a request to register or login is made and the response is a success. Is Authenticated is set to true.
    The default id null.

    -loading To make sure that when a user is authenticated, that the loading is done. That a request was made to the backend 
    and a response was recieved. Default is true. When data is recieved set to false.

    -user when the user data is recieved, the user statev will get put in there. EG name, etc 

*/
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action){
    //taking type and payload out and assinging it to action
    const {type, payload} = action;

    switch(type){
        //functionality for USER_LOADED type
        case USER_LOADED:
            /*
                make a copy of the state, set isAuth to tru, loading false,
                and return the user in the paylaod as it includes the user data
            */
            return{
                ...state,
                isAuthenticated: true,
                loading:false,
                user: payload
            }
        //testing case of REGISTER_SUCCESS
        case REGISTER_SUCCESS:
            /*
                if the registration is a success the user will be logged in
                When the user registers they get a token, that will be saved in storage
                Token is then passed into the payload 

            */
            localStorage.setItem('token', payload.token);
            /*
                using spread operator to return whats currently in the state
                The current objects in the payload, isAuthenticated to true, and loading to false
            */
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        //what happens if the user fails to register
        case REGISTER_FAIL:
            //remove items from local storage
            localStorage.removeItem('token');
            return{
                /*
                using spread operator to return whats currently in the state
                Set the token to null, isAuthenticated to false, and loading to false
            */
                 ...state,
                token: null,
                isAuthenticated:false,
                loading:false
            }
            case AUTH_ERROR:
                //remove items from local storage
            localStorage.removeItem('token');
            return{
                /*
                using spread operator to return whats currently in the state
                Set the token to null, isAuthenticated to false, and loading to false
                */
                 ...state,
                token: null,
                isAuthenticated:false,
                loading:false
            }
            //same as register success
        case LOGIN_SUCCESS:
            /*
                if the registration is a success the user will be logged in
                When the user registers they get a token, that will be saved in storage
                Token is then passed into the payload 

            */
            localStorage.setItem('token', payload.token);
            /*
                using spread operator to return whats currently in the state
                The current objects in the payload, isAuthenticated to true, and loading to false
            */
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case LOGIN_FAIL:
             //remove items from local storage
             localStorage.removeItem('token');
             return{
                 /*
                 using spread operator to return whats currently in the state
                 Set the token to null, isAuthenticated to false, and loading to false
             */
                  ...state,
                 token: null,
                 isAuthenticated:false,
                 loading:false
             }
        case LOGOUT:
        case ACCOUNT_DELETED:
             //remove items from local storage
             localStorage.removeItem('token');
             return{
                 /*
                 using spread operator to return whats currently in the state
                 Set the token to null, isAuthenticated to false, and loading to false
             */
                  ...state,
                 token: null,
                 isAuthenticated:false,
                 loading:false
             }

                
        //default action
        default:
            return state;

            

    }

}