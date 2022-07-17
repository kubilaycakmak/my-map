import {
    POINT_SET_SUCCESS,
    POINT_GET_SUCCESS,
    POINT_RESET_SUCCESS,
    POINT_GET_FAIL,
    POINT_SET_FAIL,
    POINT_RESET_FAIL,
    SET_MESSAGE,
    POINT_GET_OWN_SUCCESS,
    POINT_GET_OWN_FAIL,
    POINT_GET_BY_ID_SUCCESS
  } from "./types";

import PointService from "../services/point.service";

export const setPoint = (data) => (dispatch) => {
    return PointService.setPoint(data).then(
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
            type: POINT_SET_FAIL,
        });
  
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
  
        return Promise.reject();
        }
    );
};

export const setNFTPoint = (data) => (dispatch) => {
    return PointService.setNFTPoint(data).then(
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
            type: POINT_SET_FAIL,
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
            type: POINT_GET_FAIL,
        });
  
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
  
        return Promise.reject();
        }
    );
};

// export const getNFTPoint = () => (dispatch) => {
//     return PointService.getNFTPoint().then(
//         (data) => {
//         dispatch({
//             type: POINT_GET_SUCCESS,
//             payload: { point: data },
//         });

//         return Promise.resolve();
//         },
//         (error) => {
//         const message =
//             (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//             error.message ||
//             error.toString();
  
//         dispatch({
//             type: POINT_GET_FAIL,
//         });
  
//         dispatch({
//             type: SET_MESSAGE,
//             payload: message,
//         });
  
//         return Promise.reject();
//         }
//     );
// };

export const getOwnEventPoint = (username) => (dispatch) => {
    return PointService.getOwnEventPoint(username).then(
        (data) => {
        dispatch({
            type: POINT_GET_OWN_SUCCESS,
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
            type: POINT_GET_OWN_FAIL,
        });
  
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
  
        return Promise.reject();
        }
    );
};

export const resetPoint = () => (dispatch) => {
    return PointService.resetPoint().then(
        (data) => {
        dispatch({
            type: POINT_RESET_SUCCESS,
            payload: { message: "success" },
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
            type: POINT_RESET_FAIL,
        });
  
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
  
        return Promise.reject();
        }
    );
};

export const getPointById = (id) => (dispatch) => {
    return PointService.getPointById(id).then(
        (data) => {
            dispatch({
                type: POINT_GET_BY_ID_SUCCESS,
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
            type: POINT_GET_FAIL,
        });
  
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
  
        return Promise.reject();
        }
    );
};
