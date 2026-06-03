import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && token.trim() !== '') {
    config.headers.Authorization = `Token ${token}`;
  } else {
    // Remove Authorization header if no token
    delete config.headers.Authorization;
  }
  return config;
});

export default api;
