import axios from "axios";
import { store } from "store";

// let store;
// export const injectStore = _store => {
//   store = _store
// }

export const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    const headerToken = store.getState().authen?.user?.accessToken ?? "";
    if (headerToken) {
      config.headers.Authorization = `Bearer ${headerToken}`;
    }

    // Do something before request is sent
    return config;
  },
  async function (error) {
    // Do something with request error
    return await Promise.reject(error);
  },
);

// Add a response interceptor
// custom nhu nay thi khong biet duoc kieu type cua axios
/*
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data ? response.data : response;
  },
  function (err) {
    // any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // if(err.response.status === 400){
    //   let headerToken = store.getState()?.account?.userInfo?.access_token ?? "";
    //   if(headerToken){
    //     err.config.headers.Authorization = `Bearer ${headerToken}`;
    //   }
    //   return axios.request(err.config);
    // }

    if (err?.response?.data) return err.response.data;
    return Promise.reject(err);
  },
);
*/
