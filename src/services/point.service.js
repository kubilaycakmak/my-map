import axios from "axios";


const setPoint = (title, lng, lat) => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/point/', {
    title,
    lng,
    lat,
  });
};

const getPoint = () => {
    return axios.get(process.env.REACT_APP_API_URL + '/api/point/').then(
      (response) => {
        if (response.data.points.lenght != 0) {
          localStorage.setItem("point", JSON.stringify(response.data.points));
        }
        return response.data.points
      }
    );
};

export default {
  setPoint,
  getPoint
};