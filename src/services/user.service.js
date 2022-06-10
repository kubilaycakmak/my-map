import axios from "axios";
import authHeader from "./auth-header";


const getPublicContent = () => {
  return axios.get(process.env.REACT_APP_API_URL + "/all");
};

const getModeratorBoard = () => {
  return axios.get(process.env.REACT_APP_API_URL + "/mod", { headers: authHeader() });
};

export default {
  getPublicContent,
  getModeratorBoard,
};