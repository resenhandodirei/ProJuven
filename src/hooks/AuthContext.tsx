import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  tipoPerfil: 'admin' | 'coordenador' | 'voluntario';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error('Login inválido');
      }

      const data = await response.json();
      const userData = {
        id: data.id,
        email: data.email,
        tipoPerfil: data.tipoPerfil,
      };

      Cookies.set('user', JSON.stringify(userData));
      setUser(userData);

      // Redirecionar por perfil
      if (data.tipoPerfil === 'admin') router.push('/admin');
      else if (data.tipoPerfil === 'coordenador') router.push('/coordenador');
      else router.push('/voluntario');
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    }
  };

  const logout = () => {
    Cookies.remove('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
