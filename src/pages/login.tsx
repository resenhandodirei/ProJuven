import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPage } from 'next';
//import Head from 'next/head';
import app from '../pages/_app';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const login = async (email: string, password: string, router: ReturnType<typeof useRouter>) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token); // sugestão usar cookies HttpOnly em produção
    router.push('/dashboard');
  } else {
    alert(data.message);
  }

};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    //Validação simples
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErro(data.message || 'E-mail ou senha incorretos.');
        return;
      }
      //Validação de e-mail com regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErro('Por favor, insira um e-mail válido.');
        return;
      }

      setLoading(true);

      const data = await response.json();
      setErro(''); // Limpa o erro se o login for bem-sucedido

      // Armazena o token no localStorage
      localStorage.setItem('token', data.token);

      // Redireciona para a página de dashboard
      try {
        const { ok, data } = await loginUser(email, senha);

        if (ok) {
          localStorage.setItem('token', data.token);
          router.push('/dashboard');
        } else {
          setErro(data.message || 'E-mail ou senha incorretos.');
        }
      } catch {
        setErro('Erro de conexão. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    } catch (error) {
      setErro('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (

    <><head>
      <meta />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>

    <Navbar />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Entrar</h1>

          {erro && (
            <p className="text-red-600 text-sm text-center mb-4">{erro}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required />

            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required />

            </div>

            <div className="text-right">
              <a
                href="/recuperar-senha"
                className="text-sm text-blue-600 hover:underline"
              >
                Esqueci minha senha
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white transition ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Entrando...' : 'Acessar'}
            </button>
          </form>
        </div>
      </div>

    <Footer />
    </>
  );
}


function loginUser(email: string, senha: string): { ok: any; data: any; } | PromiseLike<{ ok: any; data: any; }> {
  throw new Error('Function not implemented.');
}
