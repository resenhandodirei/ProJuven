"use client";

import React from "react";
import "@/styles/globals.css";
import dpgece from "@/app/assets/header-dpgece.png";
import ufc from "@/app/assets/ufc.png"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-10">
        <section className="max-w-5xl mx-auto text-gray-800 leading-relaxed">
          <h1 className="text-4xl font-bold mb-6 text-[var(--greenLight)]">
            Sobre o ProJuven
          </h1>

          <p className="mb-6 text-lg text-gray-700">
            O <strong>ProJuven</strong> é uma plataforma tecnológica desenvolvida
            para aprimorar a gestão e o acompanhamento de adolescentes e jovens em
            cumprimento de medidas socioeducativas, fortalecendo a atuação integrada
            entre núcleos jurídicos e psicossociais. Seu propósito é unir tecnologia,
            dados e humanização em prol da defesa integral da juventude.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Origem Institucional
          </h2>
          <p className="mb-6 text-gray-700">
            O projeto nasceu dentro do <strong>Escritório Popular da Juventude João Nogueira Jucá (EPJUV)</strong>, fruto de uma parceria entre a
            <strong> Defensoria Pública do Estado do Ceará (DPGE-CE)</strong> e a
            <strong> Universidade Federal do Ceará (UFC)</strong>, com o objetivo de integrar
            estudantes de Direito a experiências reais no atendimento à juventude em conflito com a lei.
          </p>

          <p className="mb-6 text-gray-700">
            A ideia do ProJuven surgiu a partir do entusiasmo do <strong>Dr. Rubens Lima</strong>, Defensor Público,
            ao identificar potencial tecnológico em uma das estagiárias: <strong>Larissa Corrêa</strong>.
            Larissa é estagiária de Direito e também desenvolvedora Full Stack formada em
            <strong> Análise e Desenvolvimento de Sistemas — XP Educação</strong>, sendo a principal responsável
            pela tradução das necessidades jurídicas em código.
          </p>

          <p className="mb-8 text-gray-700">
            Desde o início, <strong>todo o código, arquitetura e implementação técnica</strong> do sistema foram desenvolvidos por <strong>Larissa Corrêa</strong>,
            garantindo integração entre frontend, backend e banco de dados para uma solução ágil e segura.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Linha do Tempo Institucional</h2>

          <div className="relative border-l-4 border-[var(--greenLight)] pl-6 mb-10 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Junho de 2025 — Concepção e Escopo</h3>
              <p className="text-gray-700">
                Início da definição de objetivos, levantamento de requisitos junto ao EPJUV e à Defensoria, e desenho do escopo.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Julho de 2025 — Estruturação Inicial</h3>
              <p className="text-gray-700">
                Protótipos e primeiros componentes do frontend, definição da identidade visual e bibliotecas base.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Agosto a Setembro de 2025 — Backend e Integrações</h3>
              <p className="text-gray-700">
                Desenvolvimento da API, autenticação, modelos de dados e integração com armazenamento de arquivos.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Setembro a Outubro de 2025 — Finalização do Frontend</h3>
              <p className="text-gray-700">
                Implementação de telas finais, dashboards, relatórios e entregas UX para testes em campo.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Missão, Visão e Valores</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--greenLight)] mb-1">🌱 Missão</h3>
              <p className="text-gray-700">
                Promover gestão humanizada e eficiente dos atendimentos a adolescentes, fortalecendo acesso à justiça e dignidade.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--greenLight)] mb-1">👁️ Visão</h3>
              <p className="text-gray-700">
                Tornar-se referência em tecnologia aplicada à defesa pública e aos direitos da juventude no Brasil.
              </p>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-[var(--greenLight)] mb-2">💚 Valores</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Humanização:</strong> empatia e respeito no atendimento.</li>
                  <li><strong>Ética:</strong> confidencialidade e transparência.</li>
                  <li><strong>Colaboração:</strong> integração entre saberes jurídicos, sociais e tecnológicos.</li>
                  <li><strong>Inovação Social:</strong> tecnologia para equidade e cidadania.</li>
                  <li><strong>Comprometimento Público:</strong> contribuir para políticas mais justas e eficientes.</li>
                </ul>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-200">
              <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Parcerias Institucionais</h2>
              <div className="flex flex-wrap justify-center items-center gap-10 mb-6">
                <img src={ufc.src} alt="UFC" width={150} height={60} />
                <img src={dpgece.src} alt="DPGE-CE" width={300} height={150} />
              </div>

              
            </div>

            <div className="text-center mt-6 border-t border-gray-200 pt-4">
                    <p className="text-[var(--greenLight)] font-semibold text-lg">
                    “ProJuven — Tecnologia a serviço da defesa integral da juventude.”
                    </p>
              </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
