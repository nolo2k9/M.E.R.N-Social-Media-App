// Bring our profile actions
import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
  } from '../actions/types';
  
  // initial state
  // our actions will fill in these initial states
  const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return{
                ...state, //current
                profile: payload, //includes the whole profile
                loading: false
            };
        // fill empty profile array with profiles from the server
        case GET_PROFILES:
            return {
                ...state, 
                profiles: payload, 
                loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload, // error status
                loading: false,
                profile: null   
            };
        // case to clear profile from view
        // emptying the state
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                repos: [],
                loading: false
            };
        case GET_REPOS:
            return {
                ...state,
                repos: payload, // repositories array filled
                loading: false
            }
        default:
            return state;
    }
  }