import axios from "axios";
import { getCrrToken } from ".";
import { Obj } from "../global/interface";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});
httpClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  (config.headers as Obj).Authorization = getCrrToken();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default httpClient;
