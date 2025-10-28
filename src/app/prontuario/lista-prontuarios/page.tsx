"use client";

import { useState, useEffect } from "react";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Search, FileText, Eye } from "lucide-react";

interface Prontuario {
  id: number;
  paciente: string;
  data: string;
  profissional: string;
  descricao: string;
}

export default function ListaProntuariosPage() {
  const [prontuarios, setProntuarios] = useState<Prontuario[]>([]);
  const [busca, setBusca] = useState("");
  const [filtrados, setFiltrados] = useState<Prontuario[]>([]);

  useEffect(() => {
    const dadosMock: Prontuario[] = [
      {
        id: 1,
        paciente: "Maria da Silva",
        data: "2025-10-10",
        profissional: "Dra. Andreia",
        descricao: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        id: 2,
        paciente: "João Pereira",
        data: "2025-10-12",
        profissional: "Dra. Luciana",
        descricao: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        id: 3,
        paciente: "Larissa Costa",
        data: "2025-10-20",
        profissional: "Dra. Rubens",
        descricao: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ];
    setProntuarios(dadosMock);
    setFiltrados(dadosMock);
  }, []);

  useEffect(() => {
    const termo = busca.toLowerCase();
    const filtrados = prontuarios.filter(
      (p) =>
        p.paciente.toLowerCase().includes(termo) ||
        p.profissional.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo)
    );
    setFiltrados(filtrados);
  }, [busca, prontuarios]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="text-[var(--greenDark)]" /> Lista de Prontuários
            </h1>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar prontuário..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-sm"
              />
            </div>
          </div>

          {filtrados.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhum prontuário encontrado.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--greenDark-transparent)] border-b">
                    <th className="p-3 text-sm font-semibold text-gray-700">Atendido</th>
                    <th className="p-3 text-sm font-semibold text-gray-700">Profissional</th>
                    <th className="p-3 text-sm font-semibold text-gray-700">Data</th>
                    <th className="p-3 text-sm font-semibold text-gray-700">Descrição</th>
                    <th className="p-3 text-sm font-semibold text-gray-700 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-blue-50 transition">
                      <td className="p-3 text-sm">{p.paciente}</td>
                      <td className="p-3 text-sm">{p.profissional}</td>
                      <td className="p-3 text-sm">{new Date(p.data).toLocaleDateString("pt-BR")}</td>
                      <td className="p-3 text-sm truncate max-w-xs">{p.descricao}</td>
                      <td className="p-3 text-center">
                        <button
                          className="bg-[var(--greenLight)] text-white p-2 rounded-md hover:bg-[var(--golden)] transition flex items-center gap-2"
                    >
                          <Eye size={16} /> <a href="/prontuario/visualizar-prontuario/id"> Ver </a>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
