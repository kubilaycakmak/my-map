import {
  POINT_GET_SUCCESS,
  POINT_SET_SUCCESS,
  POINT_SET_FAIL,
  POINT_GET_FAIL,
  POINT_RESET_SUCCESS,
  POINT_RESET_FAIL,
  POINT_GET_OWN_SUCCESS,
  POINT_GET_OWN_FAIL,
  POINT_GET_BY_ID_SUCCESS
  } from "../actions/types";
  
  // const points = JSON.parse(localStorage.getItem("point"));
  
  const initialState = {
    point:[],
    points:[]
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case POINT_GET_SUCCESS:
        return {
          ...state,
          points: payload.point,
        };
      case POINT_SET_SUCCESS:
        return {
          ...state,
          points: [...state.point, payload.point],
        };
      case POINT_SET_FAIL:
        return {
        ...state,
        isAnyPoint: false,
      };
      case POINT_RESET_SUCCESS:
        return {
        ...state,
        isAnyPoint: false,
      };
      case POINT_RESET_FAIL:
        return {
          ...state,
          isAnyPoint: false,
        };
      case POINT_GET_FAIL:
        return {
          ...state,
          isAnyPoint: false,
        };
      case POINT_GET_OWN_SUCCESS: 
        return{
          points: payload.point,
        };
      case POINT_GET_OWN_FAIL:
        return{
          ...state,
        };
      case POINT_GET_BY_ID_SUCCESS:
        return{
          ...state,
          point: payload.point
        }
      default:
        return state;
    }
  }