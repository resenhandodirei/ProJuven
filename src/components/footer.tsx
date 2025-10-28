import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--greenDark)] text-gray-300 py-10 mt-auto border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        <div>
          <h2 className="text-white text-2xl font-bold mb-2">ProJuven</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Plataforma desenvolvida para apoiar a Defensoria Pública e o EPJUV na
            gestão de atendimentos e acompanhamento de adolescentes em medidas
            socioeducativas.
          </p>
          <div className="mt-3 text-sm text-gray-400">
            <p><strong>Endereço:</strong> Rua Tabelião Fabião, 114 - Pres. Kennedy, Fortaleza - CE, 60355-515</p>
            <p><strong>Telefone:</strong> (85) 3278-1330</p>
          </div>

          <div className="mt-6 text-center md:text-left">
            <p className="text-xs text-gray-500 mt-3">
              © {currentYear} ProJuven — Todos os direitos reservados.
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Desenvolvido integralmente por <strong>Larissa Corrêa</strong>.
            </p>
            <p className="text-sm text-gray-400">
              <em>Todos os direitos de desenvolvimento de código pertencem a Larissa Corrêa.</em>
            </p>
          </div>
  
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-semibold text-lg mb-2">Desenvolvido por</h3>
          <p className="text-gray-200 font-medium">Larissa Corrêa</p>
          <p className="text-sm text-gray-400">
            Estagiária de Direito | Desenvolvedora FullStack<br />
            Formada em Análise e Desenvolvimento de Sistemas (XP Educação)
          </p>

          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            <a
              href="https://github.com/resenhandodirei"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://linkedin.com/in/resenhandodirei"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://instagram.com/resenhandodirei"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="mailto:larimscorrea@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaEnvelope size={22} />
            </a>
            <a
              href="https://wa.me/5585991984587?text=Olá%20Larissa!%20Gostaria%20de%20conversar%20sobre%20o%20ProJuven."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaWhatsapp size={22} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end justify-center gap-2">
          <a
            href="/privacy"
            className="hover:text-white transition text-sm"
          >
            Política de Privacidade
          </a>
          <a
            href="/terms"
            className="hover:text-white transition text-sm"
          >
            Termos de Uso
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        <p>
          “ProJuven — Tecnologia e Justiça Social caminhando juntas.” <br />
          <span className="text-[var(--greenLight)] font-semibold">
            Desenvolvido com 💚 por Larissa Corrêa
          </span>
        </p>
      </div>
    </footer>
  );
}
