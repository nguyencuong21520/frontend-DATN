import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_HOST
})
export default httpClient;