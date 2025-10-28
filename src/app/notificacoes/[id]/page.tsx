"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card } from "@/components/Cards";
import { Button } from "@/components/Button";
import Badge from "@/components/Badge";
import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowLeft,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";

import "@/styles/globals.css";

interface Notificacao {
  id: number;
  tipo: "info" | "alerta" | "sucesso";
  titulo: string;
  mensagem: string;
  data: string;
  remetente: string;
  lida: boolean;
}

const notificacoesMock: Notificacao[] = [
  {
    id: 1,
    tipo: "sucesso",
    titulo: "Prontuário salvo com sucesso",
    mensagem:
      "O prontuário do adolescente João Pedro foi salvo e sincronizado no sistema às 15h42.",
    data: "2025-10-13T15:42:00Z",
    remetente: "Sistema ProJuven",
    lida: false,
  },
  {
    id: 2,
    tipo: "alerta",
    titulo: "Audiência marcada",
    mensagem:
      "Audiência para Maria Eduarda foi agendada para 17/10/2025 às 14h, na Vara da Infância e Juventude.",
    data: "2025-10-12T11:30:00Z",
    remetente: "Dr. Rubens Lima (Defensor)",
    lida: false,
  },
  {
    id: 3,
    tipo: "info",
    titulo: "Atualização no caso de Lucas Andrade",
    mensagem:
      "Uma nova anotação foi adicionada ao prontuário de Lucas Andrade pela estagiária Larissa Corrêa.",
    data: "2025-10-10T10:00:00Z",
    remetente: "Larissa Corrêa (Estagiária)",
    lida: true,
  },
];

export default function NotificacaoDetalhePage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id ? Number(params.id) : null;

  const [notificacao, setNotificacao] = useState<Notificacao | null>(null);

  useEffect(() => {
    const encontrada =
      notificacoesMock.find((n) => n.id === idParam) || notificacoesMock[0];
    setNotificacao(encontrada);
  }, [idParam]);

  const marcarComoLida = () => {
    if (notificacao && !notificacao.lida) {
      setNotificacao({ ...notificacao, lida: true });
      alert("✅ Notificação marcada como lida!");
    }
  };

  const getIcone = (tipo: Notificacao["tipo"]) => {
    switch (tipo) {
      case "sucesso":
        return <FaCheckCircle className="text-green-500 text-2xl" />;
      case "alerta":
        return <FaExclamationCircle className="text-red-500 text-2xl" />;
      default:
        return <FaBell className="text-yellow-500 text-2xl" />;
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

  if (!notificacao) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
          Notificação não encontrada.
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.push("/notificacoes")}
              className="border border-gray-300 bg-[--var(greenLight)] text-gray-700 hover:bg-[--var(golden)] flex items-center gap-2 rounded-xl px-4 py-2 transition-all"
            >
              <FaArrowLeft /> Voltar
            </Button>

            <Badge
              className={`${getBadgeColor(
                notificacao.tipo
              )} px-4 py-1.5 rounded-full text-sm font-medium`}
            >
              {notificacao.tipo === "sucesso"
                ? "Sucesso"
                : notificacao.tipo === "alerta"
                ? "Alerta"
                : "Informação"}
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-8 bg-white rounded-2xl shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                {getIcone(notificacao.tipo)}
                <h1 className="text-2xl font-bold text-gray-800">
                  {notificacao.titulo}
                </h1>
              </div>

              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {notificacao.mensagem}
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm text-gray-600 border-t pt-4">
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-500" />
                  <span>
                    {new Date(notificacao.data).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-500" />
                  <span>{notificacao.remetente}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-end gap-4"
          >
            {!notificacao.lida && (
              <Button
                onClick={marcarComoLida}
                className="bg-[var(--greenLight)] text-white px-6 py-2 rounded-xl hover:bg-[var(--golden)] transition-all duration-300"
              >
                Marcar como lida
              </Button>
            )}
            <Button
              onClick={() => router.push("/notificacoes")}
              className="bg-[--var(golden)] text-gray-800 px-6 py-2 rounded-xl hover:bg-[--var(greenLight)] transition-all duration-300"
            >
              Ver todas
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
