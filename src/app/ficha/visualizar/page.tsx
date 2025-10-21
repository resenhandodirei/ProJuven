"use client";

import { FaUser, FaFileAlt, FaGavel } from "react-icons/fa";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "@/styles/globals.css";

import { Card } from "@/components/Cards";
import Badge from "@/components/Badge";
import { Button } from "@/components/Button";

export default function FichaPage() {
  const atendido = {
    nome: "João Pedro da Silva",
    idade: 17,
    faseProcessual: "Execução da medida socioeducativa",
    situacao: "Liberdade assistida",
    dataNascimento: "2008-06-12",
    responsavel: "Maria da Silva (mãe)",
    telefone: "(85) 99876-5432",
  };

  const prontuarios = [
    {
      tipo: "Jurídico",
      dataCriacao: "2025-03-10",
      resumo:
        "Ato infracional análogo a roubo. Medida aplicada: Liberdade assistida por 6 meses.",
      status: "Ativo",
    },
    {
      tipo: "Psicossocial",
      dataCriacao: "2025-04-22",
      resumo:
        "Atendimento psicológico inicial. Indícios de ansiedade leve e dificuldade de socialização.",
      status: "Em acompanhamento",
    },
  ];

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case "Liberdade assistida":
        return "bg-green-50 text-green-700 border border-green-300";
      case "Semiliberdade":
        return "bg-yellow-50 text-yellow-700 border border-yellow-300";
      case "Internamento":
        return "bg-red-50 text-red-700 border border-red-300";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-300";
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header da ficha */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-3 mb-2">
                <FaUser className="text-[var(--greenLight)] text-xl" />
                {atendido.nome}
              </h1>
              <div className="text-gray-700 space-y-1">
                <p><strong>Idade:</strong> {atendido.idade} anos</p>
                <p><strong>Data de nascimento:</strong> {atendido.dataNascimento}</p>
                <p><strong>Responsável:</strong> {atendido.responsavel}</p>
                <p><strong>Telefone:</strong> {atendido.telefone}</p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <Badge
                className={`${getSituacaoColor(atendido.situacao)} px-4 py-1.5 text-sm rounded-full font-medium`}
              >
                {atendido.situacao}
              </Badge>
              <p className="text-gray-700 text-sm">
                <strong>Fase processual:</strong> {atendido.faseProcessual}
              </p>
            </div>
          </div>

          {/* Prontuários */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaFileAlt className="text-[var(--golden)]" />
              Prontuários vinculados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prontuarios.map((p, index) => (
                <Card
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <Badge
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        p.tipo === "Jurídico"
                          ? "bg-blue-50 text-blue-700 border border-blue-300"
                          : "bg-purple-50 text-purple-700 border border-purple-300"
                      }`}
                    >
                      {p.tipo}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Criado em {new Date(p.dataCriacao).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-5">{p.resumo}</p>

                  <div className="flex justify-between items-center">
                    <Badge
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        p.status === "Ativo"
                          ? "bg-green-50 text-green-700 border border-green-300"
                          : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                      }`}
                    >
                      {p.status}
                    </Badge>

                    <Button
                      className="bg-[var(--greenLight)] text-white text-sm px-4 py-2 rounded-lg shadow-sm transition-all duration-300 hover:bg-[var(--golden)] hover:scale-105 flex items-center gap-2"
                      onClick={() => alert(`Abrir prontuário ${p.tipo}`)}
                    >
                      <FaGavel className="text-sm" /> Visualizar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
