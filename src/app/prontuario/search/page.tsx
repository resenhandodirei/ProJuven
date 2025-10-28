"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "@/styles/globals.css";
import { Input } from "@/components/form/Input";
import InputSelect from "@/components/form/InputSelect";
import { Button } from "@/components/Button";
import { Card } from "@/components/Cards";
import Badge from "@/components/Badge";
import { FaSearch, FaUser, FaCalendarAlt, FaFilter, FaGavel, FaClipboardList } from "react-icons/fa";
import InputCPF from "@/components/form/InputCPF";

export default function BuscaProntuarioPage() {
  const [filters, setFilters] = useState({
    nome: "",
    tipo: "",
    situacao: "",
    faseProcessual: "",
    cpf: "",
  });

  const [resultados, setResultados] = useState<any[]>([]);
  const [buscou, setBuscou] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setBuscou(true);

    const mockResultados = [
      {
        id: 1,
        nome: "João Pedro da Silva",
        tipo: "Jurídico",
        situacao: "Liberdade assistida",
        fase: "Execução da medida socioeducativa",
        data: "2025-03-10",
      },
      {
        id: 2,
        nome: "Maria Eduarda Lima",
        tipo: "Psicossocial",
        situacao: "Semiliberdade",
        fase: "Cumprimento da medida",
        data: "2025-05-02",
      },
    ];

    const filtrados = mockResultados.filter(
      (r) =>
        (!filters.nome || r.nome.toLowerCase().includes(filters.nome.toLowerCase())) &&
        (!filters.tipo || r.tipo === filters.tipo) &&
        (!filters.situacao || r.situacao === filters.situacao)
    );

    setResultados(filtrados);
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <FaSearch className="text-[var(--greenLight)]" /> Busca Avançada de Prontuários
            </h1>
            <p className="text-gray-600">
              Utilize os filtros abaixo para localizar prontuários específicos ou por categoria.
            </p>
          </div>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <FaFilter className="text-[var(--golden)]" />
              <h2 className="font-semibold text-lg">Filtros de pesquisa</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                id="nome"
                label="Nome do Atendido"
                placeholder="Digite o nome completo ou parcial"
                value={filters.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
              />

              <InputSelect
                id="tipo"
                label="Tipo de Prontuário"
                options={[
                  { label: "Todos", value: "" },
                  { label: "Jurídico", value: "Jurídico" },
                  { label: "Psicossocial", value: "Psicossocial" },
                ]}
                value={filters.tipo}
                onChange={(v) => handleChange("tipo", v)}
              />

              <InputSelect
                id="situacao"
                label="Situação Atual"
                options={[
                  { label: "Todas", value: "" },
                  { label: "Liberdade assistida", value: "Liberdade assistida" },
                  { label: "Semiliberdade", value: "Semiliberdade" },
                  { label: "Internamento", value: "Internamento" },
                ]}
                value={filters.situacao}
                onChange={(v) => handleChange("situacao", v)}
              />

              <InputSelect
                id="fase"
                label="Fase Processual"
                options={[
                  { label: "Todas", value: "" },
                  { label: "Execução da medida socioeducativa", value: "Execução da medida socioeducativa" },
                  { label: "Cumprimento da medida", value: "Cumprimento da medida" },
                  { label: "Em análise judicial", value: "Em análise judicial" },
                ]}
                value={filters.faseProcessual}
                onChange={(v) => handleChange("faseProcessual", v)}
              />

              
              <InputCPF />
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSearch}
                className="bg-[var(--greenLight)] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[var(--golden)] transition-all flex items-center gap-2"
              >
                <FaSearch /> Buscar
              </Button>
            </div>
          </Card>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaClipboardList className="text-[var(--golden)]" /> Resultados da Pesquisa
            </h2>

            {buscou && resultados.length === 0 && (
              <div className="text-center text-gray-500 py-10 bg-white rounded-xl border border-gray-200">
                Nenhum prontuário encontrado com os critérios informados.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resultados.map((p) => (
                <Card
                  key={p.id}
                  className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-3">
                    <Badge
                      className={`px-3 py-1 rounded-lg ${
                        p.tipo === "Jurídico"
                          ? "bg-blue-100 text-blue-700 border-blue-400"
                          : "bg-purple-100 text-purple-700 border-purple-400"
                      }`}
                    >
                      {p.tipo}
                    </Badge>

                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <FaCalendarAlt /> {new Date(p.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <p className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-1">
                    <FaUser className="text-[var(--greenLight)]" /> {p.nome}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">{p.fase}</p>

                  <Badge
                    className={`${getSituacaoColor(p.situacao)} px-3 py-1 rounded-lg text-sm`}
                  >
                    {p.situacao}
                  </Badge>

                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={() => alert(`Abrir prontuário de ${p.nome}`)}
                      className="bg-[var(--greenLight)] text-white px-4 py-2 rounded-lg hover:bg-[var(--golden)] transition flex items-center gap-2"
                    >
                      <FaGavel /> Visualizar
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
