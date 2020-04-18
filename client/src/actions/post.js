import axios from 'axios';
import {setAlert} from './alert';
import {GET_POST, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, SINGLE_POST, SINGLE_POST_COMMENT,SINGLE_POST_DELETE } from './types';
import reducers from '../reducers';

//GET POSTS FUNCTION
export const getPosts = () => async dispatch => {
    //try catch to make request 
    try {
        const res = await axios.get('/api/posts');
        //Dispatch type of GET_POST with the data
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        //Dispatch type of POST_ERROR with message and status
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
            //sending object with post id and array of likes in the payload
            payload: {id,likes: res.data}
        });
    } catch (err) {
        dispatch({
             //Dispatch type of POST_ERROR with message and status
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
          //Dispatch type of UPDATE_LIKES with the data
        dispatch({
            type: UPDATE_LIKES,
            //sending object with post id and array of likes in the payload
            payload: {id,likes: res.data}
        });
    } catch (err) {
          //Dispatch type of POST_ERROR with message and status
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
             //Dispatch type of DELETE_POST with message and status
            type: DELETE_POST,
            //sending id, so we can filter out which posts got deleted from the UI
            payload: id
        });
         //Success message with success colour
        dispatch(setAlert('You have removed this post', 'success'))
    } catch (err) {
        dispatch({
              //Dispatch type of POST_ERROR with message and status
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
        //Making a post request to /api/posts with the form data and the headers
       const res = await axios.post('/api/posts', formData, config);
        dispatch({
            
            type: ADD_POST,
           //seding data in the payload 
            payload: res.data
        });
         //Dispatch and alert with message and colour of success
        dispatch(setAlert('Post has been added', 'success'))
    } catch (err) {
         //Dispatch type of POST_ERROR with message and status
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
         //Dispatch type of SINGLE_POST 
        dispatch({
            //sending data in payload 
            type: SINGLE_POST,
            payload: res.data
        });
    } catch (err) {
         //Dispatch type of POST_ERROR with message and status
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Add a comment to a single post   
export const addCommentSingle = (postId, formData) => async dispatch => {
    //config added to be able to send data
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    //try catch to make request 
    try {
        //Making a post request to /api/posts/comment/postid with the form data and the headers
       const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        dispatch({
            type: SINGLE_POST_COMMENT,
           //seding data in the payload 
            payload: res.data
        });
           //Dispatch and alert with message and colour of success
        dispatch(setAlert('Comment has been added', 'success'))
    } catch (err) {
        dispatch({
             //Dispatch type of POST_ERROR with message and status
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete a comment to a single post   
export const deleteCommentSingle = (postId, commentId) => async dispatch => {
   
    //try catch to make request 
    try {
       const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: SINGLE_POST_DELETE,
           //sending comment id in state, so we know which comment to delete in ui
            payload: commentId
        });
         //Dispatch and alert with message and colour of success
        dispatch(setAlert('Comment has been removed', 'success'))
    } catch (err) {
        dispatch({
            //Dispatch type of POST_ERROR with message and status
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};