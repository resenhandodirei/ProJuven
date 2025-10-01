"use client";

import { useState, useEffect } from "react";
import { Bell, Menu, User } from "lucide-react";

import MenuDropdownUse from "./MenuDropdownUse";

import SearchBar from "./SearchBar";

interface UserData {
  nome: string;
  perfil: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔎 Busca dados do usuário logado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1️⃣ Recupera o token salvo no login (localStorage ou cookie)
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("⚠️ Nenhum token encontrado. Usuário não autenticado.");
          setLoading(false);
          return;
        }

        // 2️⃣ Faz a requisição para a rota /api/me enviando o token
        const res = await fetch("/api/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Envia o JWT no cabeçalho
          },
        });

        // 3️⃣ Se a resposta não for 200, lança erro
        if (!res.ok) {
          throw new Error(`Erro ao buscar usuário: ${res.status}`);
        }

        // 4️⃣ Converte o JSON e atualiza o estado
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("❌ Erro ao buscar dados do usuário:", error);
      } finally {
        // 5️⃣ Sempre desliga o carregamento
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-tight">
          ProJuven
        </a>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          {/* ... seus dropdowns aqui ... */}
        </ul>

        {/* Ações Direita */}
        <div className="flex items-center gap-4">
          {/* Pesquisa */}
          <SearchBar />

          {/* Notificações */}
          <button className="relative p-2 rounded-full hover:bg-gray-800 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full px-1">
              3
            </span>
          </button>

          {/* Usuário */}
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <User className="w-5 h-5" />
            <span className="hidden md:inline">
              {loading
                ? "Carregando..."
                : userData
                ? `Olá, ${userData.nome} (${userData.perfil})`
                : "Não autenticado"}
            </span>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 bg-gray-800 rounded p-4 space-y-3">
          <a href="/dashboard" className="block hover:text-blue-400">
            Dashboard
          </a>
          <a href="/prontuarios" className="block hover:text-blue-400">
            Prontuários
          </a>
          <a href="/documentos" className="block hover:text-blue-400">
            Documentos
          </a>
          <a href="/anotacoes" className="block hover:text-blue-400">
            Anotações
          </a>
          <a href="/usuarios" className="block hover:text-blue-400">
            Administração
          </a>
          <a href="/importar" className="block hover:text-blue-400">
            Dados
          </a>

                <MenuDropdownUse items={[]} />

        </div>
      )}

    </nav>
  );
}
