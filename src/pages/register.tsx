import { useState } from 'react';
import { useRouter } from 'next/router';
import FormActions from '@/components/FormActions';
import TailwindJS from '@/components/tailwindjs';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import InputSelect from '@/components/InputSelect';
import FormWrapper from "@/components/FormWrapper";
import InputText from "@/components/InputText";
import InputDate from "@/components/InputDate";


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
    
      <TailwindJS />
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10">
      <FormWrapper title="Dados Pessoais" description="Preencha suas informações básicas.">
        <div className="grid grid-cols-1 gap-4">
        <InputText
            label="Nome Completo"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            required
        />
        <InputText
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
            required
            />

        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              placeholder='Digite sua senha'
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
              placeholder='Confirme sua senha'
              name="confirmarSenha"
              required
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <InputSelect
          label="Perfil"
          name="profile"
          value=""
          onChange={() => {}}
          options={[
            { label: "Administrador", value: "admin" },
            { label: "Defensor", value: "defensor" },
            { label: "Psicossocial", value: "psicossocial" },
            { label: "Servidor", value: "servidor" },
            { label: "Estagiário", value: "estagiario"},
          ]}
        />

           <FormActions
            onSave={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
            isLoading={false} // Implement loading state if needed
            onCancel={() => router.push('/login')}
            onBack={() => router.push('/')}
            /> 
      </FormWrapper>
       
      </div>

      <Footer />
    </>
  );
};

export default RegisterPage;
