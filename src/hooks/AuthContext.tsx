import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  tipoPerfil: 'admin' | 'defensor' | 'psicossocial' | 'servidor' | 'estagiario';
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
  const [error, setError] = useState<string | null>(null);
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
        const data = await response.json()
        throw new Error(data?.message || 'Erro ao fazer login');
      }

      const data = await response.json();
      const userData = {
        id: data.id,
        email: data.email,
        tipoPerfil: data.tipoPerfil,
      };

      setUser(userData);
      Cookies.set('user', JSON.stringify(userData));

      // Redirecionar por perfil
      switch (userData.tipoPerfil) {
        case 'admin':
          router.push('/admin/dashboard');
          console.log('Login bem-sucedido, redirecionando...');
          break;
        case 'defensor':
          router.push('/defensor/dashboard');
          console.log('Login bem-sucedido, redirecionando...');
          break;
        case 'psicossocial':
          router.push('/psicossocial/dashboard');
          console.log('Login bem-sucedido, redirecionando...');
          break;
        case 'servidor':
          router.push('/servidor/dashboard');
          console.log('Login bem-sucedido, redirecionando...');
          break;
        case 'estagiario':
          router.push('/estagiario/dashboard');
          console.log('Login bem-sucedido, redirecionando...');
          break;
        default:
          throw new Error('Perfil de usuário desconhecido');
      }

    } catch (error: any) {
      console.error('Erro ao fazer login:', error);

      if (error.response) {
        console.log('Erro de resposta do servidor:', error.response.data);
        setError(error.response.data?.message || 'Erro desconhecido');
      } else {
        setError('Erro de conexão. Detalhes: ' + error.message);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // limpa o estado global
    router.push('/login'); // redireciona para login
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
      {/* Optionally render error message */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </AuthContext.Provider>
  );
}
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

