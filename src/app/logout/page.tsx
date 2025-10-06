import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login'); // redireciona para login
  }, [router]);

  return <p>Saindo...</p>;
}
