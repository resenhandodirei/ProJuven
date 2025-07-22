import React from "react";
import TailwindJS from "./tailwindjs";

export default function Footer() {
  return (
    <>
      <TailwindJS />
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-white">
          <p>&copy; {new Date().getFullYear()} ProJuven. Todos os direitos reservados.</p>
          <p>
            <a href="/privacy" className="text-white underline">Política de Privacidade</a> | 
            <a href="/terms" className="text-white underline ml-2">Termos de Uso</a>
          </p>
        </div>
      </footer>
    </>
  );
}