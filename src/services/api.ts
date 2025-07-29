import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-3-21-164-223.us-east-2.compute.amazonaws.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
