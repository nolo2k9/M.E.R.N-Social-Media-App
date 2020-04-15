import axios from 'axios';
import {setAlert} from './alert';
import {GET_POST, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, SINGLE_POST } from './types';
import reducers from '../reducers';

//GET POSTS FUNCTION
export const getPosts = () => async dispatch => {
    //try catch to make request 
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
// Add like to a post 
export const addLike = id => async dispatch => {
    //try catch to make request 
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            //sedning object with post id and array of likes in the payload
            payload: {id,likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
//remove a like  
export const removeLike = id => async dispatch => {
    //try catch to make request 
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            //sedning object with post id and array of likes in the payload
            payload: {id,likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete a post  
export const removePost = id => async dispatch => {
    //try catch to make request 
    try {
        const res = await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            //sending id, so we can filter out which posts got deleted from the UI
            payload: id
        });
        dispatch(setAlert('You have removed this post', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Add a post   
export const addPost = formData => async dispatch => {
    //config added to be able to send data
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    //try catch to make request 
    try {
       const res = await axios.post('/api/posts', formData, config);
        dispatch({
            type: ADD_POST,
           //seding data in the payload 
            payload: res.data
        });
        dispatch(setAlert('Post has been added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//GET SINGLE POST  FUNCTION
export const getPost = id => async dispatch => {
    //try catch to make request 
    try {
        //Making a get request to api/posts/id
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            //sending data in payload 
            type: SINGLE_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
