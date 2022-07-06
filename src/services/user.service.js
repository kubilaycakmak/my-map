import axios from "axios";
import authHeader from "./auth-header";

const getPublicContent = () => {
  return axios.get(process.env.REACT_APP_API_URL + "/all");
};

const getModeratorBoard = () => {
  return axios.get(process.env.REACT_APP_API_URL + "/mod", { headers: authHeader() });
};

const setWalletAddress = (email, walletAddress) => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/user/setWalletAddress', {
    email,
    walletAddress
  }, { headers: authHeader() }).then((response) => {
    return response.data;
  });
}

const me = () => {
  return axios.get(process.env.REACT_APP_API_URL + '/api/user/me', { headers: authHeader() })
  .then((response) => {
    let user = response.data.user;

    if (response.data.accessToken) {
      user.accessToken = response.data.accessToken;
      user.refreshToken = response.data.refreshToken;
      localStorage.setItem("user", JSON.stringify(user));
    }
    return user;
  });
}

export default {
  getPublicContent,
  getModeratorBoard,
  setWalletAddress,
  me
};