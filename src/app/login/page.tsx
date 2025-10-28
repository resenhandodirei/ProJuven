"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro("Por favor, insira um e-mail válido.");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || "E-mail ou senha incorretos.");
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (error) {
      setErro("Erro de conexão. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-fade-in">
          <h1 className="text-3xl font-bold text-center text-[var(--greenDark)] mb-6">
            Acesse sua conta
          </h1>

          {erro && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md mb-4 text-center border border-red-200">
              {erro}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--greenLight)] focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--greenLight)] focus:border-transparent transition"
                required
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => router.push("/trocar-senha")}
                className="text-sm text-[var(--greenLight)] hover:underline"
              >
                <a href="/trocar-senha"> Esqueci minha senha </a>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
                loading
                  ? "bg-[var(--greenLight-transparent)] cursor-not-allowed"
                  : "bg-[var(--greenLight)] hover:bg-[var(--golden)] shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Ainda não possui uma conta?{" "}
            <a
              href="/registro"
              className="text-[var(--greenLight)] font-semibold hover:underline"
            >
              Cadastre-se aqui
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
