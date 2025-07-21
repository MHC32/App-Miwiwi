import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  // baseURL: 'https://sgpme.com'
  // baseURL:'http://127.0.0.1:8000'
  baseURL: 'http://192.168.1.205:5000'
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error?.response && error?.response?.data) || "Quelque chose s'est mal passé")
);

export default axiosInstance;