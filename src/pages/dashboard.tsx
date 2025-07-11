import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      // opcional: fazer fetch a rota protegida
      setUser({ email: 'teste@exemplo.com' });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <h1 className="text-2xl font-bold text-center">Bem-vindo ao Painel</h1>
    </div>
  );
}
