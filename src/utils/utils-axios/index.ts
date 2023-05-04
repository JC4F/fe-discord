import axios from "axios";
import axiosRetry from "axios-retry";
import { store } from "store";
import { authenWithUserDataPayload, logoutAsync } from "store/authen";

// let store;
// export const injectStore = _store => {
//   store = _store
// }

export const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

axiosRetry(http, {
  retries: 3,
});

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    const headerToken = store.getState().authen?.user?.accessToken ?? "";
    console.log(">> check header token", headerToken);
    if (headerToken) {
      config.headers.Authorization = `Bearer ${headerToken}`;
    }

    return config;
  },
  async function (error) {
    return await Promise.reject(error);
  },
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    if (err.response.status === 401) {
      if (err.response.data.userData) {
        store.dispatch(authenWithUserDataPayload(err.response.data.userData));
        const headerToken = store.getState().authen?.user?.accessToken ?? "";
        console.log(">> check header token2", headerToken);
        if (headerToken) {
          err.config.headers.Authorization = `Bearer ${headerToken}`;
        }
        return await http.request(err.config);
      } else {
        await store.dispatch(logoutAsync());
      }
    }

    return await Promise.reject(err);
  },
);
