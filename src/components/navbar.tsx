"use client";

import { useState, useEffect } from "react";
import { Bell, Menu, User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import SearchBar from "@/components/SearchBar";
import NotificationBell from "@/components/NotificationBell";
import { Button } from "./Button";
import UserMenu from "./UserMenu";
import NavbarLogo from "./NavbarLogo";
import icon from "../app/assets/icon.png";

interface UserData {
  nome: string;
  perfil: string;
}

let closeTimeout: NodeJS.Timeout;

export default function Navbar() {
  const userRouter = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("⚠️ Nenhum token encontrado. Usuário não autenticado.");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Erro ao buscar usuário: ${res.status}`);

        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("❌ Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  function toggleMenu(menu: string): void {
    if (menu === "") {
      closeTimeout = setTimeout(() => setOpenMenu(""), 150);
    } else {
      clearTimeout(closeTimeout);
      setOpenMenu(menu);
    }
  }

  return (
    <nav className="bg-[var(--greenDark)] text-white shadow-md px-6 py-3 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex justify-center">
          <a
            href="/page"
            className="flex items-center gap-3 text-2xl font-bold tracking-tight text-gray-800"
          >
            <img src={icon.src} width={60} alt="Logo" />
            <NavbarLogo />
          </a>
        </div>

        {!userData && !loading && (
          <div className="flex items-center gap-4">
            <Button
              className="bg-[var(--greenLight)] text-white px-6 py-2 rounded-xl transition-all duration-300 hover:bg-[var(--golden)] shadow-md hover:shadow-lg"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </Button>

            <Button
              className="bg-[var(--greenLight-transparent)] text-white px-6 py-2 rounded-xl transition-all duration-300 hover:bg-[var(--greenLight)] shadow-md hover:shadow-lg"
              onClick={() => (window.location.href = "/registro")}
            >
              Faça seu cadastro
            </Button>
          </div>
        )}

        {userData && (
          <div className="flex items-center gap-6">
            <ul className="hidden md:flex items-center gap-6 font-medium relative">
              <li
                className="relative"
                onMouseEnter={() => toggleMenu("dashboard")}
                onMouseLeave={() => toggleMenu("")}
              >
                <button className="flex items-center gap-1 hover:text-[var(--golden)] transition">
                  Dashboard <ChevronDown className="w-4 h-4" />
                </button>
                {openMenu === "dashboard" && (
                  <div
                    className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-48 py-2 animate-fade-in z-50"
                    onMouseEnter={() => toggleMenu("dashboard")}
                    onMouseLeave={() => toggleMenu("")}
                  >
                    <ul>
                      <li><a href="/dashboard/produtividade" className="block px-4 py-2 hover:bg-gray-100">Produtividade NUAJA</a></li>
                      <li><a href="/dashboard/juridico" className="block px-4 py-2 hover:bg-gray-100">Jurídico</a></li>
                      <li><a href="/dashboard/psicossocial" className="block px-4 py-2 hover:bg-gray-100">Psicossocial</a></li>
                      <li><a href="/dashboard/integral" className="block px-4 py-2 hover:bg-gray-100">Integral</a></li>
                    </ul>
                  </div>
                )}
              </li>

              <li
                className="relative"
                onMouseEnter={() => toggleMenu("prontuarios")}
                onMouseLeave={() => toggleMenu("")}
              >
                <button className="flex items-center gap-1 hover:text-[var(--golden)] transition">
                  Prontuários <ChevronDown className="w-4 h-4" />
                </button>
                {openMenu === "prontuarios" && (
                  <div
                    className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-60 py-2 animate-fade-in z-50"
                    onMouseEnter={() => toggleMenu("prontuarios")}
                    onMouseLeave={() => toggleMenu("")}
                  >
                    <ul>
                      <li><a href="/prontuario/search" className="block px-4 py-2 hover:bg-gray-100">🔍 Busca avançada</a></li>
                      <li><a href="/prontuario/lista-prontuarios" className="block px-4 py-2 hover:bg-gray-100">📋 Listagem geral</a></li>
                      <li><a href="/prontuario/juridico" className="block px-4 py-2 hover:bg-gray-100">➕ Novo prontuário</a></li>
                      <li><a href="/ficha" className="block px-4 py-2 hover:bg-gray-100">➕ Nova ficha de atendimento</a></li>
                      <li><a href="/dashboard/integral" className="block px-4 py-2 hover:bg-gray-100">📊 Visualização integral</a></li>
                    </ul>
                  </div>
                )}
              </li>

              <li
                className="relative"
                onMouseEnter={() => toggleMenu("dados")}
                onMouseLeave={() => toggleMenu("")}
              >
                <button className="flex items-center gap-1 hover:text-[var(--golden)] transition">
                  Dados <ChevronDown className="w-4 h-4" />
                </button>
                {openMenu === "dados" && (
                  <div
                    className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-56 py-2 animate-fade-in z-50"
                    onMouseEnter={() => toggleMenu("dados")}
                    onMouseLeave={() => toggleMenu("")}
                  >
                    <ul>
                      <li className="px-4 py-2 text-sm font-semibold text-gray-700">Importar Dados</li>
                      <li><a href="/importar/usuarios" className="block px-4 py-1 hover:bg-gray-100 text-sm">Atendimentos presenciais</a></li>
                      <li><a href="/importar/prontuarios" className="block px-4 py-1 hover:bg-gray-100 text-sm">Prontuários</a></li>
                      <li className="border-t border-gray-200 my-1"></li>
                      <li><a href="/exportar" className="block px-4 py-2 hover:bg-gray-100">Exportar Dados</a></li>
                    </ul>
                  </div>
                )}
              </li>

              <li
                className="relative"
                onMouseEnter={() => toggleMenu("recursos")}
                onMouseLeave={() => toggleMenu("")}
              >
                <button className="flex items-center gap-1 hover:text-[var(--golden)] transition">
                  Central de Recursos <ChevronDown className="w-4 h-4" />
                </button>
                {openMenu === "recursos" && (
                  <div
                    className="absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-60 py-2 animate-fade-in z-50"
                    onMouseEnter={() => toggleMenu("recursos")}
                    onMouseLeave={() => toggleMenu("")}
                  >
                    <ul>
                      <li><a href="/recursos/modelos" className="block px-4 py-2 hover:bg-gray-100">🧾 Modelos de Petições</a></li>
                      <li><a href="/recursos/documentos" className="block px-4 py-2 hover:bg-gray-100">📁 Documentos de Encaminhamento</a></li>
                      <li><a href="/recursos/faq" className="block px-4 py-2 hover:bg-gray-100">❓ FAQ - Dúvidas Frequentes</a></li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <SearchBar />
              <NotificationBell />
              <UserMenu userData={userData} loading={loading} />
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      {userData && isMenuOpen && (
        <div className="md:hidden mt-3 bg-gray-800 rounded p-4 space-y-3">
          <a href="/dashboard" className="block hover:text-[var(--golden)]">Dashboard</a>
          <a href="/prontuarios" className="block hover:text-[var(--golden)]">Prontuários</a>
          <a href="/documentos" className="block hover:text-[var(--golden)]">Documentos</a>
          <a href="/anotacoes" className="block hover:text-[var(--golden)]">Anotações</a>
          <a href="/usuarios" className="block hover:text-[var(--golden)]">Administração</a>
          <a href="/importar" className="block hover:text-[var(--golden)]">Dados</a>
        </div>
      )}
    </nav>
  );
}
