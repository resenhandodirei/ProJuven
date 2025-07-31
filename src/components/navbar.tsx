"use client";

import React, { useState } from "react";
import { Bell, Menu, User } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
}

export default function Navbar({ isAuthenticated = false, userName = "Usuário" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-md px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-white text-2xl font-bold tracking-tight">
          ProJuven
        </a>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <a
                href="/login"
                className="text-gray-300 hover:text-white transition font-medium"
              >
                Login
              </a>
              <a
                href="/register"
                className="text-gray-300 hover:text-white transition font-medium"
              >
                Registrar
              </a>
            </>
          ) : (
            <>
              {/* Botão Notificações */}
              <button
                className="relative bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition flex items-center justify-center"
                aria-label="Notificações"
              >
                <Bell className="text-gray-300 w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                  5
                </span>
              </button>

              {/* Avatar Usuário */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-full hover:bg-gray-700 transition"
                >
                  <User className="text-gray-300 w-5 h-5" />
                  <span className="text-gray-200 font-medium">{userName}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Meu Perfil
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Configurações
                    </a>
                    <button
                      onClick={() => alert("Logout")}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Menu Mobile (Hambúrguer) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="text-white w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 mt-2 rounded-lg shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            {!isAuthenticated ? (
              <>
                <a href="/login" className="text-gray-300 hover:text-white">
                  Login
                </a>
                <a href="/register" className="text-gray-300 hover:text-white">
                  Registrar
                </a>
              </>
            ) : (
              <>
                <button className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <Bell className="w-5 h-5" /> Notificações
                </button>
                <a href="/profile" className="text-gray-300 hover:text-white">
                  Meu Perfil
                </a>
                <a href="/settings" className="text-gray-300 hover:text-white">
                  Configurações
                </a>
                <button
                  onClick={() => alert("Logout")}
                  className="text-red-400 hover:text-red-500"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
