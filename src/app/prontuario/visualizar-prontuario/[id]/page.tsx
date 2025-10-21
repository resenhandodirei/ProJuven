"use client";

import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Navbar from "@/components/navbar";
import NavbarLogo from "@/components/NavbarLogo";
import Footer from "@/components/footer";
import { Button } from "@/components/Button";
import { Card } from "@/components/Cards";
import Badge from "@/components/Badge";
import icon from "../../../assets/icon.png";
import dpgeceIcon from "../../../assets/header-dpgece.png";
import { FaFileAlt, FaPrint, FaLock } from "react-icons/fa";

import "@/styles/globals.css";

const prontuarioMock = {
  id: 1,
  tipo: "Jurídico",
  nomeAtendido: "João Pedro da Silva",
  idade: 17,
  faseProcessual: "Execução da medida socioeducativa",
  situacao: "Liberdade assistida",
  responsavel: "Maria da Silva (mãe)",
  telefone: "(85) 99876-5432",
  atoInfracional: "Ato análogo a roubo (art. 157 do CP)",
  resumo:
    "Jovem apreendido por ato análogo a roubo, atualmente cumprindo medida de liberdade assistida. Apresenta comportamento cooperativo e segue com acompanhamento jurídico e psicossocial.",
  dataCriacao: "2025-03-10",
  anotacoes: [
    {
      autor: "Dr. Rubens Lima",
      perfil: "DEFENSOR",
      conteudo: "Encaminhar para acompanhamento psicossocial.",
      confidencial: false,
      data: "2025-10-14",
    },
    {
      autor: "Larissa Corrêa",
      perfil: "ESTAGIÁRIA",
      conteudo: "Jovem demonstra evolução positiva nas audiências.",
      confidencial: true,
      data: "2025-10-15",
    },
  ],
};

const usuarioAtivo = { nome: "Larissa Corrêa", perfil: "ESTAGIÁRIA" };

export default function ProntuarioDetalhePage() {
  const [prontuario, setProntuario] = useState(prontuarioMock);
  const [novaNota, setNovaNota] = useState({ conteudo: "", confidencial: false });
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef, // <--- o correto agora
    documentTitle: `Prontuário - ${prontuario.nomeAtendido}`,
  });

  const handleAdicionarNota = () => {
    if (!novaNota.conteudo.trim()) return;
    const nova = {
      autor: usuarioAtivo.nome,
      perfil: usuarioAtivo.perfil,
      conteudo: novaNota.conteudo,
      confidencial: novaNota.confidencial,
      data: new Date().toISOString(),
    };
    setProntuario((prev) => ({ ...prev, anotacoes: [...prev.anotacoes, nova] }));
    setNovaNota({ conteudo: "", confidencial: false });
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case "Liberdade assistida":
        return "bg-green-100 text-green-700 border-green-400";
      case "Semiliberdade":
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
      case "Internamento":
        return "bg-red-100 text-red-700 border-red-400";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  // 👇 Aqui começa o return PRINCIPAL, agora no lugar certo!
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaFileAlt className="text-[var(--golden)]" /> Prontuário {prontuario.tipo}
            </h1>

            <Button
              onClick={handlePrint}
              className="bg-[var(--greenLight)] text-white px-6 py-2 rounded-xl transition-all duration-300 hover:bg-[var(--golden)] shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <FaPrint /> Imprimir Prontuário
            </Button>
          </div>

          {/* Conteúdo imprimível */}
          <div
            ref={printRef}
            className="bg-white p-10 rounded-2xl shadow-md border border-gray-200"
          >
            <div className="text-right">
                    <p className="text-sm text-gray-600">
                        <strong>Data de criação:</strong>{" "}
                        {new Date(prontuario.dataCriacao).toLocaleDateString("pt-BR")}
                        <Badge
                            className={`${getSituacaoColor(prontuario.situacao)} px-3 py-1 rounded-lg mt-2 ml-4`}
                            >
                            {prontuario.situacao}
                            </Badge>
                    </p>
                </div>

            {/* Cabeçalho da impressão */}
            <div className="flex justify-center items-center mb-8 border-b pb-4">
                <img src={dpgeceIcon.src} alt="Cabeçalho DPGECE" />


              <div className="text-right">
                
                
              </div>
            </div>

            {/* Dados primários */}
            <Card className="p-5 mb-8 bg-gray-50 border border-gray-200 rounded-2xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {prontuario.nomeAtendido} — {prontuario.idade} anos
              </h2>
              <p className="text-gray-700">
                <strong>Responsável:</strong> {prontuario.responsavel}
              </p>
              <p className="text-gray-700">
                <strong>Contato:</strong> {prontuario.telefone}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Fase processual:</strong> {prontuario.faseProcessual}
              </p>
            </Card>

            {/* Ato infracional */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Ato Infracional</h3>
              <p className="text-gray-700">{prontuario.atoInfracional}</p>
            </section>

            {/* Resumo do caso */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Resumo do Caso</h3>
              <p className="text-gray-700 leading-relaxed">{prontuario.resumo}</p>
            </section>

            {/* Anotações */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Anotações do Caso</h3>
              {prontuario.anotacoes.map((nota, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl mb-3 border ${
                    nota.confidencial
                      ? "bg-red-50 border-red-300"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>
                      <strong>{nota.autor}</strong> ({nota.perfil})
                    </span>
                    <span>{new Date(nota.data).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <p className="text-gray-800">{nota.conteudo}</p>
                  {nota.confidencial && (
                    <span className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <FaLock /> Confidencial
                    </span>
                  )}
                </div>
              ))}

              {/* Adicionar anotação */}
              <textarea
                className="w-full p-3 border border-gray-300 rounded-xl mt-4 focus:ring-2 focus:ring-[var(--greenLight)] outline-none"
                placeholder="Escreva uma nova anotação..."
                value={novaNota.conteudo}
                onChange={(e) =>
                  setNovaNota({ ...novaNota, conteudo: e.target.value })
                }
              />

              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={novaNota.confidencial}
                    onChange={(e) =>
                      setNovaNota({
                        ...novaNota,
                        confidencial: e.target.checked,
                      })
                    }
                    className="accent-[var(--greenLight)] w-4 h-4"
                  />
                  Marcar como confidencial
                </label>

                <Button
                  className="bg-[var(--greenLight)] text-white px-8 py-2 rounded-xl hover:bg-[var(--golden)] transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={handleAdicionarNota}
                >
                  Adicionar Anotação
                </Button>
              </div>
            </section>

            {/* Rodapé da impressão */}
            <div className="flex justify-between items-center text-gray-500 text-sm mt-10 border-t pt-4">
                <div className="flex justify-start">
                    <img src={icon.src} width={60} alt="Logo" />
                    <NavbarLogo />
                </div>
              <p className="text-right">
                Emitido por <strong>{usuarioAtivo.nome}</strong> ({usuarioAtivo.perfil}) —{" "}
                {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
