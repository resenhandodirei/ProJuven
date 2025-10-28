"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, Users, UserPlus, ChevronDown, UserRoundPen, Settings } from "lucide-react";

interface UserMenuProps {
  userData?: { nome: string; perfil: string };
  loading?: boolean;
  onLogout?: () => void;
}

export default function UserMenu({
  userData,
  loading = false,
  onLogout,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-1 hover:bg-[var(--golden)] transition"
      >
        <User className="w-5 h-5 text-white-700" />
        <span className="hidden md:inline text-sm font-medium text-white-700">
          {loading
            ? "Carregando..."
            : userData
            ? `Olá, ${userData.nome} (${userData.perfil})`
            : ""}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
          <li className="px-4 py-2 border-b border-gray-100 text-sm text-gray-700">
            <p className="font-medium">{userData?.nome}</p>
            <p className="text-xs text-gray-500">{userData?.perfil}</p>
          </li>

          <li>
            <a
              href="/editar-usuario"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <UserRoundPen className="w-4 h-4 text-gray-500" />
              Perfil
            </a>
          </li>

          <li>
            <a
              href="/editar-usuario"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <Settings className="w-4 h-4 text-gray-500" />
              Configurações
            </a>
          </li>

          <li>
            <a
              href="/usuarios"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <Users className="w-4 h-4 text-gray-500" />
              Gerenciar Usuários
            </a>
          </li>

          <li>
            <a
              href="/registro"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <UserPlus className="w-4 h-4 text-gray-500" />
              Registrar Novo Usuário
            </a>
          </li>

          <li className="border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4" />
              <a href="/logout">Sair</a>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
