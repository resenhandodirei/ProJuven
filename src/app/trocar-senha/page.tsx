"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import "@/styles/globals.css";

import { InputPassword } from "@/components/form/InputPassword";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TrocarSenhaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/auth-token=([^;]+)/);
    setToken(match ? match[1] : null);
  }, []);

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

    if (!token) {
      setMessage("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "/api/auth/trocar-senha",
        {
          senhaAtual: form.senhaAtual,
          novaSenha: form.novaSenha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setMessage("Senha alterada com sucesso!");
        setTimeout(() => router.push("/home"), 1500);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erro ao alterar a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Trocar Senha
          </h1>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Senha Atual
            </label>
            <InputPassword
              name="senhaAtual"
              value={form.senhaAtual}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Nova Senha
            </label>
            <InputPassword
              name="novaSenha"
              value={form.novaSenha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Confirmar Nova Senha
            </label>
            <InputPassword
              name="confirmarSenha"
              value={form.confirmarSenha}
              onChange={handleChange}
              required
            />
          </div>

          {message && (
            <p
              className={`text-center text-sm mb-4 ${
                message.includes("sucesso")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--greenLight)] text-white py-2 px-4 rounded-lg hover:bg-[var(--golden)] transition disabled:opacity-50"
          >
            {loading ? "Processando..." : "Trocar Senha"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
