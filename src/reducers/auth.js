import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    AUTH_FAIL,
    AUTH_SUCCESS
  } from "../actions/types";
  import axios from 'axios';
  import store from '../store';
  import {refreshAuth} from '../actions/auth'

  axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    store.dispatch({
        type: AUTH_FAIL,
        payload: error,
    })
    return Promise.reject(error);
});
  
  
  const user = JSON.parse(localStorage.getItem("user"));
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case REFRESH_SUCCESS:
        return{
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case REFRESH_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case AUTH_FAIL:
        if(user){
          localStorage.removeItem("user");
          // store.dispatch(refreshAuth(user.refreshToken));
        }
      case AUTH_SUCCESS:
        console.log('auth_success');
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      default:
        return state;
    }
  }