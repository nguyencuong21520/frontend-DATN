import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Authorization: (localStorage.getItem("access_token") as string) || "",
  },
});
export default httpClient;
