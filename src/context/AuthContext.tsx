import { createContext, useContext, useEffect, useState } from 'react';

// Importa User solo como tipo
import type { User } from '../services/authService';

// Importa funciones reales normalmente
import { getUser, login as loginService, logout as logoutService, register as registerService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const data = await loginService(email, password);
    localStorage.setItem('token', data.token);
    await fetchUser();
  };

  const register = async (name: string, email: string, password: string) => {
    await registerService(name, email, password);
    await login(email, password);
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (_) {}
    localStorage.removeItem('token');
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const data = await getUser();
      setUser(data);
    } catch (_) {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);