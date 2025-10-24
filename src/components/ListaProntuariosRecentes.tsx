"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/Cards";
import { Button } from "@/components/Button";
import Badge from "@/components/Badge";
import { FaFileAlt, FaClock, FaUser } from "react-icons/fa";

interface Prontuario {
  id: number;
  nomeAtendido: string;
  tipo: string; 
  dataAtualizacao: string;
  status: string;
  autor: string;
}

interface ListaProntuariosRecentesProps {
  prontuarios: Prontuario[];
  onVisualizar?: (id: number) => void;
}

export default function ListaProntuariosRecentes({
  prontuarios,
  onVisualizar,
}: ListaProntuariosRecentesProps) {
  const [tipoFiltro, setTipoFiltro] = useState<"Todos" | "Jurídico" | "Psicossocial">("Todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const prontuariosPorPagina = 5;

  const prontuariosFiltrados = useMemo(() => {
    if (tipoFiltro === "Todos") return prontuarios;
    return prontuarios.filter((p) => p.tipo === tipoFiltro);
  }, [tipoFiltro, prontuarios]);

  const totalPaginas = Math.ceil(prontuariosFiltrados.length / prontuariosPorPagina);
  const inicio = (paginaAtual - 1) * prontuariosPorPagina;
  const prontuariosExibidos = prontuariosFiltrados.slice(
    inicio,
    inicio + prontuariosPorPagina
  );

  const handlePagina = (novaPagina: number) => {
    if (novaPagina < 1 || novaPagina > totalPaginas) return;
    setPaginaAtual(novaPagina);
  };

  const getTipoBadge = (tipo: string) =>
    tipo === "Jurídico"
      ? "bg-blue-100 text-blue-700 border-blue-400"
      : "bg-purple-100 text-purple-700 border-purple-400";

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FaFileAlt className="text-[var(--golden)]" /> Prontuários Recentes
        </h2>

        <div className="flex gap-2">
          {["Todos", "Jurídico", "Psicossocial"].map((tipo) => (
            <Button
              key={tipo}
              onClick={() => {
                setTipoFiltro(tipo as any);
                setPaginaAtual(1);
              }}
              className={`px-4 py-1.5 text-sm rounded-lg border transition-all duration-300 ${
                tipoFiltro === tipo
                  ? "bg-[var(--golden)] text-white"
                  : "bg-[var(--greenLight)] text-gray-700 border-gray-300 hover:bg-[var(--golden)]"
              }`}
            >
              {tipo}
            </Button>
          ))}
        </div>
      </div>

      {/* Lista */}
      {prontuariosExibidos.length === 0 ? (
        <p className="text-center text-gray-500 py-6">
          Nenhum prontuário encontrado.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {prontuariosExibidos.map((p) => (
            <li key={p.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1">
                <p className="text-gray-800 font-medium">{p.nomeAtendido}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FaUser className="text-gray-400" /> {p.autor}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-gray-400" />{" "}
                    {new Date(p.dataAtualizacao).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className={`px-3 py-1 rounded-lg text-sm font-medium ${getTipoBadge(p.tipo)}`}>
                  {p.tipo}
                </Badge>

                <Badge
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    p.status === "Ativo"
                      ? "bg-green-100 text-green-700 border-green-400"
                      : "bg-yellow-100 text-yellow-700 border-yellow-400"
                  }`}
                >
                  {p.status}
                </Badge>

                <Button
                  onClick={() => onVisualizar?.(p.id)}
                  className="bg-[var(--greenLight)] text-white px-4 py-2 rounded-xl hover:bg-[var(--golden)] transition-all duration-300"
                >
                  Visualizar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <Button
            className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg bg-[var(--greenLight)] text-gray-700 hover:bg-[var(--golden)]"
            onClick={() => handlePagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </Button>
          <span className="text-gray-600 text-sm">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <Button
            className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg bg-[var(--greenLight)] text-gray-700 hover:bg-[var(--golden)]"
            onClick={() => handlePagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </Button>
        </div>
      )}
    </Card>
  );
}
