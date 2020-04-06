import axios from 'axios';
import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';


//load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        //if there is a token use the set auth token function and pass in the token in local storage
        //this will set the header with the token if there is a token present in local storage
        setAuthToken(localStorage.token);
    }
    //if there is a token make request 
    try {
        //wait for axios to get a response from api/auth
        const res = await axios.get('/api/auth');
        //if the response if ok dispatch USER_LOADED type and the res.data which is the user data
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    
    } catch (error) {
        //if its not successfl dispatch the auth error typr
        dispatch({
            type:AUTH_ERROR
        })
        
    }

}

/*
    Function to register a user takes in a name, email and password.
*/
export const register = ({name, email,password}) => async dispatch =>{
    const config = {
        //Sending data so need to send headers 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    //Stringifying the name, email, password getting it ready to be sent over the request
    const body = JSON.stringify({name, email, password});

    try {
        /*
            waiting the post request to hit the end point
            passing in the body of stringified data and the headers
        */

        const res = await axios.post('/api/users', body, config);
        //dispatch a succeslful registration and get the response.data (token)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data

        })
        dispatch(loadUser);
    } catch (error) {
        //get the errors if there are any from errors array
        const errors = error.response.data.errors;
        //if there are errors loop through errors array and dispatch a set alert with the relevent message and colour scheme
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        //Dispatch the regular REGISTER_FAIL type 
        dispatch({
            type: REGISTER_FAIL
        })
        
    }

}

/*
    Function to Log in a user takes in a email and password.
*/
export const login = (email,password) => async dispatch =>{
    const config = {
        //Sending data so need to send headers 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    //Stringifying the email, password getting it ready to be sent over the request
    const body = JSON.stringify({email, password});

    try {
        /*
            waiting the post request to hit the end point
            passing in the body of stringified data and the headers
        */

        const res = await axios.post('/api/auth', body, config);
        //dispatch a succeslful registration and get the response.data (token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data

        });

        dispatch(loadUser);
    } catch (error) {
        //get the errors if there are any from errors array
        const errors = error.response.data.errors;
        //if there are errors loop through errors array and dispatch a set alert with the relevent message and colour scheme
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        //Dispatch the regular REGISTER_FAIL type 
        dispatch({
            type: LOGIN_FAIL
        })
        
    }

};

//Logout/clear profile

export const logout = () => dispatch=>{
    dispatch({type: CLEAR_PROFILE});
    dispatch({type: LOGOUT});
}
