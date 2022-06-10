import {
    POINT_SET_SUCCESS,
    POINT_GET_SUCCESS,
    POINT_FAIL,
    SET_MESSAGE,
  } from "./types";

import PointService from "../services/point.service";

export const setPoint = (title, lng, lat) => (dispatch) => {
    return PointService.setPoint(title, lng, lat).then(
        (data) => {
        dispatch({
            type: POINT_SET_SUCCESS,
            payload: { point: data },
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
            type: POINT_FAIL,
        });
  
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
  
        return Promise.reject();
        }
    );
};

export const getPoint = () => (dispatch) => {
    return PointService.getPoint().then(
        (data) => {
        dispatch({
            type: POINT_GET_SUCCESS,
            payload: { point: data },
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
            type: POINT_FAIL,
        });
  
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
  
        return Promise.reject();
        }
    );
};
  