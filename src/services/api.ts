import axios from 'axios';
export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4500/'
    : 'http://localhost:4500/';

const api = axios.create({
  baseURL,
});

const token = localStorage.getItem('MyApp@token');


api.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config;
});
api.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  console.log("🚀 ~ error", error);
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
// axios.interceptors


export default api;

