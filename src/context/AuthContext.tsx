import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser, login as loginService, logout as logoutService, register as registerService } from "../services/authService";

interface User {
  id: number;
  name: string;
  email: string;
  tipo_usuario: number; // Asegúrate que el backend lo envía así
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, tipo_usuario: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginService(email, password);
    localStorage.setItem("token", data.token);
    await fetchUser();
  };

  const register = async (name: string, email: string, password: string, tipo_usuario: number) => {
    await registerService(name, email, password, tipo_usuario);
    await login(email, password);
  };

  const logout = async () => {
    await logoutService();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
