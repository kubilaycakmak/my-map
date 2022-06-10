import axios from "axios";

const API_URL = "http://localhost:5001/api/point/";

const setPoint = (title, lng, lat) => {
  return axios.post(API_URL, {
    title,
    lng,
    lat,
  });
};

const getPoint = () => {
    return axios.get(API_URL).then(
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