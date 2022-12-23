import axios from "axios";
import { getCrrToken } from ".";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Authorization: getCrrToken(),
  },
});
export default httpClient;
