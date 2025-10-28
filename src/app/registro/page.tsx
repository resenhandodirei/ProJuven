"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';
import "@/styles/globals.css";
import FormActions from '@/components/form/FormActions';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import InputSelect from '@/components/form/InputSelect';
import FormWrapper from "@/components/form/FormWrapper";
import InputText from "@/components/form/InputText";
import InputDate from "@/components/form/InputDate";


const RegisterPage = () => {

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipo_de_perfil: '',
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
            body: JSON.stringify({
              nome: formData.nome,
              email: formData.email,
              senha: formData.senha,
              tipo_de_perfil: formData.tipo_de_perfil,
            })
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
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-8 px-4 flex justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-6">
          <FormWrapper
            title="Cadastro de Usuário"
            description="Preencha suas informações para criar uma conta no ProJuven."
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  name="senha"
                  required
                  value={formData.senha}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-1 focus:ring-[var(--greenLight)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                <input
                  type="password"
                  placeholder="Confirme sua senha"
                  name="confirmarSenha"
                  required
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-1 focus:ring-[var(--greenLight)] focus:outline-none"
                />
              </div>

              <InputSelect
                label="Perfil"
                name="tipo_de_perfil"
                value={formData.tipo_de_perfil}
                onChange={handleChange}
                options={[
                  { label: "Administrador", value: "ADMIN" },
                  { label: "Defensor", value: "DEFENSOR" },
                  { label: "Psicossocial", value: "PSICOSSOCIAL" },
                  { label: "Servidor", value: "SERVIDOR" },
                  { label: "Estagiário", value: "ESTAGIARIO" },
                ]}
              />

              <div className="mt-4">
                <FormActions
                  onSave={() => handleSubmit(new Event("submit") as unknown as React.FormEvent)}
                  isLoading={false}
                  onCancel={() => router.push("/login")}
                  onBack={() => router.push("/")}
                />
              </div>
            </form>
          </FormWrapper>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RegisterPage;
