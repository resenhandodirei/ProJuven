"use client";

import { useState } from "react";
import { Bell, Menu, Search, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="w-full bg-gray-900 text-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Botão Mobile - abre/fecha sidebar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-800 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">ProJuven</h1>
      </div>

      {/* Barra de Pesquisa */}
      <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1 w-1/3">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="ml-2 bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Ações Direita */}
      <div className="flex items-center gap-5">
        {/* Notificações */}
        <button className="relative p-2 rounded-full hover:bg-gray-800 transition">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full px-1">
            3
          </span>
        </button>

        {/* Dropdown do Usuário */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition"
          >
            <User className="w-6 h-6" />
            <span className="hidden md:inline">Larissa</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {openDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50"
              >
                <a
                  href="/perfil"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                >
                  Perfil
                </a>
                <a
                  href="/configuracoes"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Configurações
                </a>
                <button
                  onClick={() => alert("Saindo...")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                >
                  Sair
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
