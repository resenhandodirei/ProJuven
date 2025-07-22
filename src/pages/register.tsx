import { useState } from 'react';
import { useRouter } from 'next/router';

const RegisterPage = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    perfil: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          alert(errorData.message || 'Erro ao cadastrar usuário.');
          return;
        }

        alert('Usuário cadastrado com sucesso!');
        router.push('/login');
    } catch (err) {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao cadastrar usuário.');
    }
  };

  return (
    <>
      <head>
        <meta />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>

      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg space-y-4"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">Cadastro de Usuário</h1>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nome completo</label>
            <input
              type="text"
              name="nome"
              required
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail institucional</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              name="senha"
              required
              value={formData.senha}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar senha</label>
            <input
              type="password"
              name="confirmarSenha"
              required
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Perfil</label>
            <select
              name="perfil"
              required
              value={formData.perfil}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Selecione o perfil</option>
              <option value="adm">Administrador</option>
              <option value="defensor">Defensor</option>
              <option value="psicossocial">Psicossocial</option>
              <option value="servidor">Servidor</option>
              <option value="estagiario">Estagiário</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
