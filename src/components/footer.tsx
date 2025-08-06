import React from "react";
import { useState } from "react";

export default function Footer() {
  return (
    <>
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Logo e texto */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-white text-xl font-bold">ProJuven</h2>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ProJuven. Todos os direitos reservados.
          </p>

          <p className="text-sm text-gray-400">
            <strong>Endereço:</strong> Rua Tabelião Fabião, 114 - N° - Pres. Kennedy, Fortaleza - CE, 60355-515
          </p>

          <p className="text-sm text-gray-400">
            <strong>Telefone:</strong> (85) 3278-1330
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-4 text-sm">
          <a
            href="/privacy"
            className="hover:text-white transition duration-200"
          >
            Política de Privacidade
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="/terms"
            className="hover:text-white transition duration-200"
          >
            Termos de Uso
          </a>
        </div>
      </div>
    </footer>
    </>
  );
}
