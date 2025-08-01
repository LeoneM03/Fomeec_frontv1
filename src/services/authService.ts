// src/services/authService.ts
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

export const register = async (
  name: string,
  email: string,
  password: string,
  tipo_usuario: number
) => {
  const response = await api.post('/auth/registro', {
    name,
    email,
    password,
    tipo_usuario
  });
  return response.data;
};

export const getUser = async (): Promise<User> => {
  const response = await api.post('/auth/usuario');
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};
