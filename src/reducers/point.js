import {
  POINT_GET_SUCCESS,
  POINT_SET_SUCCESS,
    POINT_FAIL
  } from "../actions/types";
  
  const point = JSON.parse(localStorage.getItem("point"));
  
  const initialState = point
    ? { point }
    : { point: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case POINT_GET_SUCCESS:
        return {
          ...state,
          point: payload.point,
        };
        case POINT_SET_SUCCESS:
        return {
          ...state,
          point: payload.point,
        };
      case POINT_FAIL:
        return {
          ...state,
          isAnyPoint: false,
        };
      default:
        return state;
    }
  }