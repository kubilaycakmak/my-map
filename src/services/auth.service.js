import axios from "axios";

const register = (fullName, username, email, password, type) => {
  return axios.post(process.env.REACT_APP_API_URL + "/api/auth/signup", {
    fullName,
    username,
    email,
    password,
    type
  });
};

const login = (email, password) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "/api/auth/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const reset = (password, id) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "/api/auth/reset", {
      password,
      id,
    })
    .then((response) => {
      return response.status;
    });
};

const forget = (email) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "/api/auth/forget", {
      email,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  reset,
  forget
};