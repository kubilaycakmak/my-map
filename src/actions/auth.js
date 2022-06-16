import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    RESET_SUCCESS,
    RESET_FAIL,
    SET_MESSAGE,
    FORGOT_SUCCESS,
    FORGOT_FAIL
  } from "./types";
  
import AuthService from "../services/auth.service";
  
export const register = (fullName, username, email, password, type) => (dispatch) => {
    return AuthService.register(fullName, username, email, password, type).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
};
  
export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        (data) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data },
        });

        return Promise.resolve();
        },
        (error) => {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: LOGIN_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
        }
    );
};

export const reset = (password, id) => (dispatch) => {
  return AuthService.reset(password, id).then(
      (data) => {
      dispatch({
          type: RESET_SUCCESS,
          payload: { status: data },
      });

      return Promise.resolve();
      },
      (error) => {
      const message =
          (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      dispatch({
          type: RESET_FAIL,
      });

      dispatch({
          type: SET_MESSAGE,
          payload: message,
      });

      return Promise.reject();
      }
  );
};

export const forgot = (email) => (dispatch) => {
  return AuthService.forget(email).then(
      (data) => {
      dispatch({
          type: FORGOT_SUCCESS,
          payload: { status: data },
      });

      return Promise.resolve();
      },
      (error) => {
      const message =
          (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      dispatch({
          type: FORGOT_FAIL,
      });

      dispatch({
          type: SET_MESSAGE,
          payload: message,
      });

      return Promise.reject();
      }
  );
};

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};