import axios from "axios";
import authHeader from './auth-header';

const setPromoPoint = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/point/promo/', {
    data
  }, { headers: authHeader() }).then((response) => {
    return response.data.points
  });
};

const setNFTPoint = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/point/nft/', {
    data
  }, { headers: authHeader() }).then((response) => {
    return response.data.points
  });
};

const getPoint = () => {
    return axios.get(process.env.REACT_APP_API_URL + '/api/point/', { headers: authHeader() }).then(
      (response) => {
        return response.data.points
      }
    );
};

const getNFTPoint = () => {
  return axios.get(process.env.REACT_APP_API_URL + '/api/point/nft', { headers: authHeader() }).then(
    (response) => {
      return response.data.points
    }
  );
};

const getOwnEventPoint = (username) => {
  return axios.get(process.env.REACT_APP_API_URL + `/api/point/own-event?author=${username}`, { headers: authHeader() }).then(
    (response) => {
      return response.data.points
    }
  );
};

const resetPoint = () => {
  return axios.delete(process.env.REACT_APP_API_URL + '/api/point/', { headers: authHeader() }).then(
    () => {
      return []
    }
  );
};

export default {
  setPromoPoint,
  getPoint,
  resetPoint,
  setNFTPoint,
  getNFTPoint,
  getOwnEventPoint
};