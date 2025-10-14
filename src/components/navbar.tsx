"use client";

import { useState, useEffect } from "react";
import { Bell, Menu, User, ChevronDown, StickyNote, FileText } from "lucide-react";


import SearchBar from "@/components/SearchBar";
import NotificationBell from "@/components/NotificationBell";
import UserMenu from "./UserMenu";
import NavbarLogo from "./NavbarLogo";
import icon from "../app/assets/icon.png";
   
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
    <>
    <nav className="bg-[var(--greenDark)] text-white shadow-md px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex justify-center">
          <a href="/"
            className="flex items-center gap-3 text-2xl font-bold tracking-tight text-gray-800">
            <img src={icon.src} width={60} alt="Logo" />
            <NavbarLogo />
          </a>
        </div>

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
                href="/dashboard/produtividade"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Produtividade NUAJA
              </a>
            </li>
            <li>
              <a
                href="/dashboard/juridico"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Jurídico
              </a>
            </li>
            <li>
              <a
                href="/dashboard/psicossocial"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Psicossocial
              </a>
            </li>

            <li>
              <a
                href="/dashboard/integral"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Integral
              </a>
            </li>
          </ul>

        )}
      </li>

      {/* PRONTUÁRIOS */}
      
        <ul className="hidden md:flex items-center gap-8 font-medium relative text-white">
          <li
            className="relative group"
            onMouseEnter={() => toggleMenu("prontuarios")}
            onMouseLeave={() => toggleMenu("")}
          >
          <button className="flex items-center gap-1 transition">
            Prontuários <ChevronDown className="w-4 h-4" />
          </button>

    {openMenu === "prontuarios" && (
      <ul className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-60 py-2 animate-fade-in z-50">
        <li>
          <a
            href="/prontuarios/busca-avancada"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            🔍 Busca avançada
          </a>
        </li>
        <li>
          <a
            href="/prontuarios/listagem"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            📋 Listagem geral
          </a>
        </li>
        <li>
          <a
            href="/prontuarios/adicionar"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            ➕ Novo prontuário ou ficha
          </a>
        </li>
        <li>
          <a
            href="/dashboard/integral"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            📊 Visualização integral
          </a>
        </li>
      </ul>
    )}
  </li>

    <li
        className="relative group"
        onMouseEnter={() => toggleMenu("registros")}
        onMouseLeave={() => toggleMenu("")}
      >
        <button className="flex items-center gap-1 hover:text-blue-400 transition">
          Registros Complementares <ChevronDown className="w-4 h-4" />
        </button>

        {openMenu === "registros" && (
          <ul className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-56 py-2 animate-fade-in">
            <li>
              <a
                href="/documentos"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                Documentos
              </a>
            </li>
            <li>
              <a
                href="/anotacoes"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <StickyNote className="w-4 h-4 text-blue-500" />
                Anotações
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

      {/* ===== CENTRAL DE RECURSOS ===== */}
  <li
    className="relative group"
    onMouseEnter={() => toggleMenu("recursos")}
    onMouseLeave={() => toggleMenu("")}
  >
    <button className="flex items-center gap-1 hover:text-blue-500 transition">
      Central de Recursos <ChevronDown className="w-4 h-4" />
    </button>

    {openMenu === "recursos" && (
      <ul className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-60 py-2 animate-fade-in z-50">
        <li>
          <a
            href="/recursos/modelos"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            🧾 Modelos de Petições
          </a>
        </li>
        <li>
          <a
            href="/recursos/documentos"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            📁 Documentos de Encaminhamento
          </a>
        </li>
        <li>
          <a
            href="/central-recursos/faq"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            ❓ FAQ - Dúvidas Frequentes
          </a>
        </li>
      </ul>
    )}
  </li>
</ul>
    </ul>

        <div className="flex items-center gap-4">
          <SearchBar />
          

          <NotificationBell />

         <UserMenu userData={userData ?? undefined} loading={loading} />

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
    </>
  );
}
