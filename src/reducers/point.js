import {
  POINT_GET_SUCCESS,
  POINT_SET_SUCCESS,
  POINT_SET_FAIL,
  POINT_GET_FAIL,
  POINT_RESET_SUCCESS,
  POINT_RESET_FAIL,
  OWN_NFT_POINT_GET_SUCCESS,
  OWN_NFT_POINT_GET_FAIL
  } from "../actions/types";
  
  // const points = JSON.parse(localStorage.getItem("point"));
  
  const initialState = [];
  
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
          point: [...state.point, payload.point],
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
      case OWN_NFT_POINT_GET_SUCCESS: 
        return{
          ...state,
          own_points: payload.point,
        };
      case OWN_NFT_POINT_GET_FAIL:
        return{
          ...state,
        };
      default:
        return state;
    }
  }