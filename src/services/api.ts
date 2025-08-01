// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-3-139-59-104.us-east-2.compute.amazonaws.com/api', 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
