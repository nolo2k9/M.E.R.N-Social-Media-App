import axios from 'axios';
//import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';
import { setAlert } from './alert';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try 
    {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } 
    catch (err) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try 
    {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // make the request (post request to profile api)
        const res = await axios.post('/api/profile', formData, config);

        // our profile
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        // new profile? then redirect
        if(!edit)
        {
            history.push('/dashboard')
        }
    }
    catch (err)
    {
        const errors = err.response.data.errors;
        //if there are errors loop through errors array and dispatch a set alert with the relevent message and colour scheme
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}