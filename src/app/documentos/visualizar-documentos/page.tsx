"use client";

import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/Button";
import { Card } from "@/components/Cards";
import Badge from "@/components/Badge";
import {
  FaFileAlt,
  FaEnvelope,
  FaEye,
  FaPrint,
  FaDownload,
  FaTimes,
} from "react-icons/fa";

import "@/styles/globals.css";

export default function ModelosDocumentosPage() {
  const [abaAtiva, setAbaAtiva] = useState<"peticoes" | "oficios">("peticoes");
  const [modeloSelecionado, setModeloSelecionado] = useState<any | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // --- Função para imprimir diretamente ---
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: modeloSelecionado ? modeloSelecionado.titulo : "Modelo de Documento",
  });

  // --- Função para gerar DOCX ---
const handleDownloadDOCX = async () => {
  if (!modeloSelecionado) return;

  const { Document, Packer, Paragraph, TextRun } = await import("docx");
  const { saveAs } = await import("file-saver");

  // Montagem do documento Word
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: modeloSelecionado.titulo,
                bold: true,
                size: 28,
              }),
            ],
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Autor: ${modeloSelecionado.autor}`,
                italics: true,
                size: 24,
              }),
            ],
            spacing: { after: 300 },
          }),
          ...modeloSelecionado.conteudo
            .trim()
            .split("\n")
            .map(
              (line: string) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: line.trim(),
                      size: 24,
                    }),
                  ],
                  spacing: { after: 150 },
                })
            ),
        ],
      },
    ],
  });

  // Gera e baixa o arquivo
  const buffer = await Packer.toBlob(doc);
  const nomeArquivo = `${abaAtiva === "peticoes" ? "Petição" : "Ofício"} - ${
    modeloSelecionado.titulo
  }.docx`;
  saveAs(buffer, nomeArquivo);
};

  // --- Mock dos modelos ---
  const modelosPeticoes = [
    {
      titulo: "Pedido de Liberdade Assistida",
      descricao:
        "Modelo de petição para solicitação de substituição de medida socioeducativa.",
      autor: "Defensoria Pública do Estado do Ceará",
      conteudo: `
Excelentíssimo(a) Senhor(a) Doutor(a) Juiz(a) da Vara da Infância e Juventude,

O Defensor Público infra-assinado, no exercício de suas atribuições constitucionais,
vem, respeitosamente, requerer a substituição da medida socioeducativa aplicada ao adolescente
João Pedro da Silva, atualmente em liberdade assistida, por medida em meio aberto.

Termos em que,
Pede deferimento.`,
    },
    {
      titulo: "Requerimento de Acompanhamento Familiar",
      descricao: "Petição voltada à solicitação de acompanhamento social para o adolescente.",
      autor: "Núcleo Jurídico",
      conteudo: `
Ilustríssimo Senhor Coordenador do Setor Psicossocial,

Solicita-se acompanhamento familiar ao adolescente João Pedro da Silva,
em cumprimento de medida socioeducativa de liberdade assistida, tendo em vista
a necessidade de fortalecimento dos vínculos familiares.

Atenciosamente,
Defensoria Pública do Estado do Ceará.`,
    },
  ];

  const modelosOficios = [
    {
      titulo: "Ofício ao Conselho Tutelar",
      descricao: "Solicitação de informações sobre acompanhamento familiar do adolescente.",
      autor: "Setor Psicossocial",
      conteudo: `
Senhor(a) Conselheiro(a),

Solicitamos informações atualizadas acerca do acompanhamento familiar
prestado ao adolescente João Pedro da Silva, residente na Rua das Flores, nº 123,
bairro Centro, Fortaleza-CE.

Sem mais para o momento,
Atenciosamente,
Defensoria Pública do Estado do Ceará.`,
    },
    {
      titulo: "Ofício à Vara da Infância",
      descricao: "Encaminhamento de relatório técnico referente ao cumprimento da medida.",
      autor: "Núcleo de Execuções Socioeducativas",
      conteudo: `
Excelentíssimo(a) Senhor(a) Juiz(a) da Vara da Infância e Juventude,

Encaminhamos, por meio deste, relatório técnico referente ao acompanhamento
do adolescente João Pedro da Silva, em cumprimento de medida socioeducativa
de liberdade assistida, conforme determinação judicial.

Respeitosamente,
Defensoria Pública do Estado do Ceará.`,
    },
  ];

  const modelos = abaAtiva === "peticoes" ? modelosPeticoes : modelosOficios;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
        <div className="w-full max-w-5xl space-y-8">
          {/* Cabeçalho */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              {abaAtiva === "peticoes" ? (
                <>
                  <FaFileAlt className="text-[var(--golden)]" /> Modelos de Petições
                </>
              ) : (
                <>
                  <FaEnvelope className="text-[var(--golden)]" /> Modelos de Ofícios
                </>
              )}
            </h1>

            <div className="flex gap-3">
              <Button
                onClick={() => setAbaAtiva("peticoes")}
                className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  abaAtiva === "peticoes"
                    ? "bg-[var(--golden)] text-white shadow-md"
                    : "bg-[var(--greenLight)] border border-gray-300 text-gray-700 hover:bg-[var(--golden)]"
                }`}
              >
                Petições
              </Button>
              <Button
                onClick={() => setAbaAtiva("oficios")}
                className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  abaAtiva === "oficios"
                    ? "bg-[var(--golden)] text-white shadow-md"
                    : "bg-[var(--greenLight)] border border-gray-300 text-gray-700 hover:bg-[var(--golden)]"
                }`}
              >
                Ofícios
              </Button>
            </div>
          </div>

          {/* Lista de Modelos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modelos.map((modelo, index) => (
              <Card
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{modelo.titulo}</h3>
                <p className="text-gray-600 text-sm mb-4">{modelo.descricao}</p>
                <Badge className="bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1 rounded-lg text-xs mb-3">
                  {modelo.autor}
                </Badge>

                <Button
                  onClick={() => setModeloSelecionado(modelo)}
                  className="bg-[var(--greenLight)] text-white w-full py-2 rounded-xl mt-2 hover:bg-[var(--golden)] flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <FaEye /> Visualizar Modelo
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Modal de Visualização */}
      {modeloSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8 relative animate-fadeIn">
            <button
              onClick={() => setModeloSelecionado(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={18} />
            </button>

            <div ref={printRef}>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {modeloSelecionado.titulo}
              </h2>
              <p className="text-sm text-gray-500 mb-6">{modeloSelecionado.autor}</p>
              <pre className="bg-gray-50 p-4 rounded-xl text-gray-700 whitespace-pre-wrap leading-relaxed border border-gray-200">
                {modeloSelecionado.conteudo}
              </pre>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={handlePrint}
                className="bg-[var(--greenLight)] text-white px-5 py-2 rounded-xl hover:bg-[var(--golden)] flex items-center gap-2 transition-all duration-300"
              >
                <FaPrint /> Imprimir
              </Button>
              <Button
                onClick={handleDownloadDOCX}
                className="bg-[var(--greenLight)] text-gray-800 px-5 py-2 rounded-xl hover:-[var(--golden)] flex items-center gap-2 transition-all duration-300"
              >
                <FaDownload /> Baixar DOCX
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
