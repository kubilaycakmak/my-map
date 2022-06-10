import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5001/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export default {
  getPublicContent,
  getModeratorBoard,
};