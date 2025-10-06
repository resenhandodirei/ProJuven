"use client";

import { useState, useEffect } from "react";
import { Bell, Menu, User, ChevronDown } from "lucide-react";


import SearchBar from "@/components/SearchBar";

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

  const [openMenu, setOpenMenu] = useState<string>("");

  function toggleMenu(menu: string): void {
    setOpenMenu(menu);
  }

  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-tight">
          ProJuven
        </a>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center gap-6 font-medium relative">
      {/* DASHBOARD */}
      <li
        className="relative group"
        onMouseEnter={() => toggleMenu("dashboard")}
        onMouseLeave={() => toggleMenu("")}
      >
        <button className="flex items-center gap-1 hover:text-blue-400 transition">
          Dashboard <ChevronDown className="w-4 h-4" />
        </button>
        {openMenu === "dashboard" && (
          <ul className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-48 py-2 animate-fade-in">
            <li>
              <a
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Visão Geral
              </a>
            </li>
            <li>
              <a
                href="/boas-vindas"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Boas-vindas
              </a>
            </li>
          </ul>
        )}
      </li>

      {/* PRONTUÁRIOS */}
      <li>
        <a href="/prontuarios" className="hover:text-blue-400 transition">
          Prontuários
        </a>
      </li>

      {/* DOCUMENTOS */}
      <li>
        <a href="/documentos" className="hover:text-blue-400 transition">
          Documentos
        </a>
      </li>

      {/* ANOTAÇÕES */}
      <li>
        <a href="/anotacoes" className="hover:text-blue-400 transition">
          Anotações
        </a>
      </li>

      {/* ADMINISTRAÇÃO */}
      <li
        className="relative group"
        onMouseEnter={() => toggleMenu("admin")}
        onMouseLeave={() => toggleMenu("")}
      >
        <button className="flex items-center gap-1 hover:text-blue-400 transition">
          Administração <ChevronDown className="w-4 h-4" />
        </button>
        {openMenu === "admin" && (
          <ul className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-56 py-2 animate-fade-in">
            <li>
              <a
                href="/usuarios"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Gerenciar Usuários
              </a>
            </li>
            <li>
              <a
                href="/registro"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Registrar Novo Usuário
              </a>
            </li>
          </ul>
        )}
      </li>

      {/* DADOS */}
      <li
        className="relative group"
        onMouseEnter={() => toggleMenu("dados")}
        onMouseLeave={() => toggleMenu("")}
      >
        <button className="flex items-center gap-1 hover:text-blue-400 transition">
          Dados <ChevronDown className="w-4 h-4" />
        </button>
        {openMenu === "dados" && (
          <ul className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-56 py-2 animate-fade-in">
            <li className="px-4 py-2 text-sm font-semibold text-gray-700">
              Importar Dados
            </li>
            <ul className="ml-2">
              <li>
                <a
                  href="/importar/usuarios"
                  className="block px-4 py-1 hover:bg-gray-100 text-sm"
                >
                  Atendimentos presenciais
                </a>
              </li>
              <li>
                <a
                  href="/importar/prontuarios"
                  className="block px-4 py-1 hover:bg-gray-100 text-sm"
                >
                  Prontuários
                </a>
              </li>
            </ul>
            <li className="border-t border-gray-200 my-1"></li>
            <li>
              <a
                href="/exportar"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Exportar Dados
              </a>
            </li>
          </ul>
        )}
      </li>
    </ul>

        <div className="flex items-center gap-4">
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
                : ""}
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

        </div>
      )}

    </nav>
  );
}
