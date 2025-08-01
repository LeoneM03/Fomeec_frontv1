// src/services/catalogService.ts
import api from './api';

export interface TipoUsuario {
  id: number;
  tipo_usuario: string;
  descripcion: string;
}

export const fetchTiposUsuario = async (): Promise<TipoUsuario[]> => {
  const response = await api.get('/catalogo/tipo-usuarios');
  return response.data.data;
};
