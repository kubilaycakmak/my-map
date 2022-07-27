import axios from "axios";

const register = (fullName, email, password, type, walletAddress) => {
  return axios.post(process.env.REACT_APP_API_URL + "/api/auth/signup", {
    fullName,
    email,
    password,
    type,
    walletAddress
  });
};

const login = (email, password) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "/api/auth/signin", {
      email,
      password,
    })
    .then((response) => {
      let user = response.data.user;

      if (response.data.accessToken) {
        user.accessToken = response.data.accessToken;
        user.refreshToken = response.data.refreshToken;
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
};

const googleLogin = (token) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "/api/auth/google-signin", {
      token
    })
    .then((response) => {
      let user = response.data.user;

      if (response.data.accessToken) {
        user.accessToken = response.data.accessToken;
        user.refreshToken = response.data.refreshToken;
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
};

const googleRegister = (token, type) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "/api/auth/google-signup", {
      token, type
    })
    .then((response) => {
      let user = response.data.user;

      if (response.data.accessToken) {
        user.accessToken = response.data.accessToken;
        user.refreshToken = response.data.refreshToken;
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
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

const refreshAuth = (token) => {
  return axios.post(process.env.REACT_APP_API_URL + "/api/auth/refreshToken/", {
    token
  })
  .then((response) => {
    let user = response.data.user;

    if (response.data.accessToken) {
      user.accessToken = response.data.accessToken;
      user.refreshToken = response.data.refreshToken;
      localStorage.setItem("user", JSON.stringify(user));
    }
    
    return user;
  })
}

export default {
  register,
  login,
  logout,
  reset,
  forget,
  googleLogin,
  googleRegister,
  refreshAuth
};