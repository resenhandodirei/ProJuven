"use client";

import React, { useEffect, useState } from "react";
import "@/styles/globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card } from "@/components/Cards";
import { Button } from "@/components/Button";
import Badge from "@/components/Badge";
import { FaBell, FaCheckCircle, FaExclamationCircle, FaClock, FaSearch } from "react-icons/fa";

interface Notificacao {
  id: number;
  tipo: "info" | "alerta" | "sucesso";
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
}

const notificacoesMock: Notificacao[] = [
  {
    id: 1,
    tipo: "sucesso",
    titulo: "Prontuário salvo com sucesso",
    mensagem: "O prontuário de João Pedro foi salvo e sincronizado no sistema.",
    data: new Date().toISOString(),
    lida: false,
  },
  {
    id: 2,
    tipo: "alerta",
    titulo: "Audiência marcada",
    mensagem: "Nova audiência de Maria Eduarda — 17/10/2025 às 14h, Vara da Infância.",
    data: new Date(Date.now() - 86400000).toISOString(), // Ontem
    lida: false,
  },
  {
    id: 3,
    tipo: "info",
    titulo: "Atualização de caso",
    mensagem: "Larissa Corrêa adicionou uma anotação no prontuário de Lucas Andrade.",
    data: new Date(Date.now() - 2 * 86400000).toISOString(), // Anteontem
    lida: true,
  },
];

export default function NotificacoesPage() {
  const [notificacoes, setNotificacoes] = useState(notificacoesMock);
  const [filtro, setFiltro] = useState<"todas" | "naoLidas" | "lidas">("todas");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const nova = {
        id: Date.now(),
        tipo: ["info", "alerta", "sucesso"][Math.floor(Math.random() * 3)] as
          | "info"
          | "alerta"
          | "sucesso",
        titulo: "Nova atualização de caso",
        mensagem: "Uma nova anotação foi adicionada automaticamente para teste.",
        data: new Date().toISOString(),
        lida: false,
      };
      setNotificacoes((prev) => [nova, ...prev]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const notificacoesFiltradas = notificacoes
    .filter((n) => {
      if (filtro === "naoLidas") return !n.lida;
      if (filtro === "lidas") return n.lida;
      return true;
    })
    .filter((n) =>
      (n.titulo + n.mensagem).toLowerCase().includes(busca.toLowerCase())
    );

  const agruparPorData = (notificacoes: Notificacao[]) => {
    const hoje = new Date();
    const ontem = new Date(Date.now() - 86400000);

    const grupos: Record<string, Notificacao[]> = {
      "Hoje": [],
      "Ontem": [],
      "Anteriores": [],
    };

    notificacoes.forEach((n) => {
      const data = new Date(n.data);
      if (data.toDateString() === hoje.toDateString()) grupos["Hoje"].push(n);
      else if (data.toDateString() === ontem.toDateString()) grupos["Ontem"].push(n);
      else grupos["Anteriores"].push(n);
    });

    return grupos;
  };

  const grupos = agruparPorData(notificacoesFiltradas);

  const marcarComoLida = (id: number) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  const getIcone = (tipo: Notificacao["tipo"]) => {
    switch (tipo) {
      case "sucesso":
        return <FaCheckCircle className="text-green-500" />;
      case "alerta":
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return <FaBell className="text-yellow-500" />;
    }
  };

  const getBadgeColor = (tipo: Notificacao["tipo"]) => {
    switch (tipo) {
      case "sucesso":
        return "bg-green-100 text-green-700 border-green-300";
      case "alerta":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Cabeçalho */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaBell className="text-[var(--golden)]" /> Notificações
            </h1>

            <div className="flex flex-wrap gap-3">
              {["todas", "naoLidas", "lidas"].map((tipo) => (
                <Button
                  key={tipo}
                  className={`px-4 py-2 text-sm rounded-xl border transition-all duration-300 ${
                    filtro === tipo
                      ? "bg-[var(--golden)] text-white"
                      : "bg-[var(--greenLight)] border-gray-300 text-gray-700 hover:bg-[var(--golden)]"
                  }`}
                  onClick={() => setFiltro(tipo as any)}
                >
                  {tipo === "todas"
                    ? "Todas"
                    : tipo === "naoLidas"
                    ? "Não lidas"
                    : "Lidas"}
                </Button>
              ))}

              <Button
                onClick={marcarTodasComoLidas}
                className="bg-[var(--golden)] text-white px-4 py-2 text-sm rounded-xl hover:bg-[var(--greenLight)] transition-all duration-300"
              >
                Marcar todas como lidas
              </Button>
            </div>
          </div>

          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--greenLight)] text-gray-700"
            />
          </div>

          {Object.entries(grupos).map(([titulo, lista]) =>
            lista.length > 0 ? (
              <div key={titulo} className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-1">
                  {titulo}
                </h2>
                <div className="space-y-3">
                  {lista.map((n) => (
                    <Card
                      key={n.id}
                      className={`p-5 rounded-2xl border transition-all duration-300 ${
                        n.lida
                          ? "bg-gray-50 border-gray-200"
                          : "bg-white border-[var(--greenLight)] shadow-sm"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-start gap-3">
                          <div className="text-xl mt-1">{getIcone(n.tipo)}</div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{n.titulo}</h3>
                            <p className="text-gray-600 text-sm mt-1">{n.mensagem}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                              <FaClock /> {new Date(n.data).toLocaleString("pt-BR")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={`${getBadgeColor(n.tipo)} px-3 py-1 rounded-lg`}>
                            {n.tipo === "sucesso"
                              ? "Sucesso"
                              : n.tipo === "alerta"
                              ? "Alerta"
                              : "Informação"}
                          </Badge>

                          {!n.lida && (
                            <Button
                              className="bg-[var(--greenLight)] text-white px-3 py-1 rounded-lg text-sm hover:bg-[var(--golden)]"
                              onClick={() => marcarComoLida(n.id)}
                            >
                              Marcar como lida
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
