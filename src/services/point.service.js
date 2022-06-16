import axios from "axios";
import authHeader from './auth-header';

const setPoint = (title, lng, lat, author, type, limit) => {
  console.log(authHeader());
  return axios.post(process.env.REACT_APP_API_URL + '/api/point/', {
    title,
    lng,
    lat,
    author,
    type,
    limit
  }, { headers: authHeader() }).then((response) => {
    if(response.data.points){
    }
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
  resetPoint
};