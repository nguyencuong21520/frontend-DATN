import { v4 as uuidv4 } from 'uuid';
export const uuid = () => {
    return uuidv4();
}
export const getCrrToken = () => {
    const token = localStorage.getItem('access_token');
    return token;
};
export const getDomain = () => {
    return document.URL.includes('localhost') ? (process.env.REACT_APP_HOST + ':' + window.location.port) : process.env.REACT_APP_DOMAIN
}