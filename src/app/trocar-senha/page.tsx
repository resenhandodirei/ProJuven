"use client";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parse } from "cookie";
import { useRouter } from "next/navigation"; // <- Pages Router usa next/router
import { useState } from "react";
import axios from "axios";

import { InputPassword } from "@/components/InputPassword";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies["auth-token"]; // ajuste o nome do cookie conforme seu app

  /* if (!token) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  } */

  // opcional: validar token no servidor

  return { props: {} };
}; // <- fecha corretamente a função e o export

export default function TrocarSenha() {
  const router = useRouter();
  const [form, setForm] = useState({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (form.novaSenha !== form.confirmarSenha) {
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/trocar-senha", form);

      if (res.status === 200) {
        setMessage("Senha alterada com sucesso!");
        setTimeout(() => router.push("/client-area"), 1500);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erro ao alterar a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Trocar Senha</h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Senha Atual</label>
          <InputPassword
            type="password"
            name="senhaAtual"
            value={form.senhaAtual}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Nova Senha</label>
          <InputPassword
            type="password"
            name="novaSenha"
            value={form.novaSenha}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Confirmar Nova Senha</label>
          <InputPassword
            type="password"
            name="confirmarSenha"
            value={form.confirmarSenha}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {message && <p className="text-center text-sm mb-4 text-red-500">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Processando..." : "Trocar Senha"}
        </button>
      </form>
    </div>
  );
}
