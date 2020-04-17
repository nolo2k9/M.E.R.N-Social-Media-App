import axios from 'axios';
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS
} from './types';
import { setAlert } from './alert';

// Get current users profile
// going to hit api/user/me in the backend
export const getCurrentProfile = () => async dispatch => {
    try {
	const res = await axios.get('/api/profile/me');
    
    //dispatch({ type: CLEAR_PROFILE });

    // gets put into our state
	dispatch({
	    type: GET_PROFILE,
	    payload: res.data
	});
    } catch (err) {
 
    // our error response (status code)
	dispatch({
	    type: PROFILE_ERROR,
	    payload: { msg: err.response.statusText, status: err.response.status }
	});
    }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try 
    {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
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

// Get profile by ID
// uses the userId from the profile to get the specified profile
export const getProfileById = userId => async dispatch => {
    try 
    {
        const res = await axios.get(`/api/profile/user/${userId}`);

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

// Get github repos
// uses the username (entered github username) from the profile to get the repos of that username
export const getGithubRepos = username => async dispatch => {
    try 
    {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
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
// history has a method push that will redirect us to a client route
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
};

// Add experience
// takes in our formData and uses history to redirect back
export const addExperience = (formData, history) => async dispatch =>{
    try 
    {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/experience', formData, config);

        // dispatch our profile
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data 
        });

        dispatch(setAlert('Experience Added', 'success'));
        history.push('./dashboard');

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

// Add education
export const addEducation = (formData, history) => async dispatch =>{
    try 
    {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        // our profile
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));
        history.push('./dashboard');

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
};

// Delete experience
export const deleteExperience = id => async dispatch => {
    try 
    {
        // hits the end point and uses id to identify it
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } 
    catch (err) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete education
export const deleteEducation = id => async dispatch => {
    try 
    {
        // hits the end point and uses id to identify it
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } 
    catch (err) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete account and profile
// with confirmation
// will be able to identify the account using the current auth token
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        // request
        await axios.delete('/api/profile');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
  
        dispatch(setAlert('Your account has been permanantly deleted'));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };