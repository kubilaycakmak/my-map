import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import point from './point'

export default combineReducers({
  auth,
  message,
  point
});