import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import point from './point'
import user from './user';

export default combineReducers({
  auth,
  message,
  point,
  user
});