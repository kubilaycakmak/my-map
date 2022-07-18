import axios from "axios";
import authHeader from './auth-header';

const setPoint = async (data) => {
  const response = await axios.post(process.env.REACT_APP_API_URL + '/api/point/promo', {
    data
  }, { headers: authHeader() });
  return response.data.points;
};

const setNFTPoint = async (data) => {
  const response = await axios.post(process.env.REACT_APP_API_URL + '/api/point/nft', {
    data
  }, { headers: authHeader() });
  return response.data.points;
};

const getPoint = async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/api/point/', { headers: authHeader() });
  return response.data.points;
};

const getNFTPoint = async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL + '/api/point/nft', { headers: authHeader() });
  return response.data.points;
};

const getOwnEventPoint = async (username) => {
  const response = await axios.get(process.env.REACT_APP_API_URL + `/api/point/own-event?author=${username}`, { headers: authHeader() });
  return response.data.points;
};

const resetPoint = async () => {
  await axios.delete(process.env.REACT_APP_API_URL + '/api/point/', { headers: authHeader() });
  return [];
};

const getPointById = async (id) => {
  const response = await axios.get(process.env.REACT_APP_API_URL + `/api/point/${id}`, { headers: authHeader() });
  return response.data.point;
}

const updatePoint = async (data) => {
  const response = await axios.put(process.env.REACT_APP_API_URL + '/api/point/update', {
    data
  } , {header: authHeader () });
  return response.data;
}

export default {
  setPoint,
  getPoint,
  resetPoint,
  setNFTPoint,
  getNFTPoint,
  getOwnEventPoint,
  getPointById,
  updatePoint
};