import axios from 'axios';
import {setAlert} from './alert';
import {GET_POST, POST_ERROR  } from './types';
import reducers from '../reducers';

//GET POSTS FUNCTION
export const getPosts = () => async dispatch => {
    //try catch to make request 
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POST,
            payload: reducers.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
