import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data; 
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/registro', { name, email, password });
  return response.data;
};

export const getUser = async (): Promise<User> => {
  // POST vacío por requerimiento del backend
  const response = await api.post('/auth/usuario', {});
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};
