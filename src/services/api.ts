import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
})

api.interceptors.request.use(async (config) => {
  const userStoragedData = localStorage.getItem("user");


  if(userStoragedData) {
    const user = JSON.parse(userStoragedData);
    config.headers!.userid = user.id;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403) {
      document.location.assign(`${document.location.origin}/login`);
    }
    return Promise.reject(error);
  },
);