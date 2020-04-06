import axios from 'axios';

/*
        Global header
    Function takes in a token
    If the token is there add it to the headers
    if its not delete it from the headers.

    If there is a token send it with every request, instead of picking
    and chooseing which request to send it with 
    
*/

const setAuthToken = token => {
    //Checks to see if there is a token in local storage
    if (token) {
        //if there is send this global header and assign it to the token
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        //if what is passed in is not a token, delete it from the global headers
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;