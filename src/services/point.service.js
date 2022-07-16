import axios from "axios";
import authHeader from './auth-header';

const setPoint = (title, lng, lat, author, type, limit) => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/point/', {
    title,
    lng,
    lat,
    author,
    type,
    limit
  }, { headers: authHeader() }).then((response) => {
    return response.data.points
  });
};

const setNFTPoint = (title, lng, lat, author, type, limit, author_wallet,
  token_id,
  contract_type,
  description,
  image,
  token_address) => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/point/nft/', {
    title,
    lng,
    lat,
    author,
    type,
    limit,
    author_wallet,
    token_id,
    contract_type,
    description,
    image,
    token_address
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
  setPoint,
  getPoint,
  resetPoint,
  setNFTPoint,
  getNFTPoint,
  getOwnEventPoint
};