"use client";
import { useState } from "react";
import "@/styles/globals.css";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards";
import { Button } from "@/components/Button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, FileText, UserPlus, ClipboardList } from "lucide-react";
import ListaProntuariosRecentes from "@/components/ListaProntuariosRecentes";

export default function HomePage() {
  const prontuariosMock = [
    {
      id: 1,
      nomeAtendido: "João Pedro",
      tipo: "Jurídico",
      dataAtualizacao: "2025-10-10",
      status: "Ativo",
      autor: "Dr. Rubens Lima",
    },
    {
      id: 2,
      nomeAtendido: "Maria Eduarda",
      tipo: "Psicossocial",
      dataAtualizacao: "2025-10-09",
      status: "Em acompanhamento",
      autor: "Larissa Corrêa",
    },
    {
      id: 3,
      nomeAtendido: "Lucas Andrade",
      tipo: "Jurídico",
      dataAtualizacao: "2025-10-08",
      status: "Arquivado",
      autor: "Dr. Rubens Lima",
    },
    {
      id: 4,
      nomeAtendido: "Beatriz Gomes",
      tipo: "Psicossocial",
      dataAtualizacao: "2025-10-05",
      status: "Ativo",
      autor: "Larissa Corrêa",
    },
    {
      id: 5,
      nomeAtendido: "Caio Mendes",
      tipo: "Jurídico",
      dataAtualizacao: "2025-10-03",
      status: "Ativo",
      autor: "Dr. Rubens Lima",
    },
    {
      id: 6,
      nomeAtendido: "Ana Clara",
      tipo: "Psicossocial",
      dataAtualizacao: "2025-09-30",
      status: "Ativo",
      autor: "Larissa Corrêa",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="text-gray-600">
            Bem-vinda ao ProJuven! Aqui você encontra um resumo das atividades.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Acesso rápido</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button className="flex items-center gap-2">
                  <UserPlus size={18} /> Novo Atendimento
                </Button>
                <Button className="flex items-center gap-2" variant="outline">
                  <FileText size={18} /> Prontuários
                </Button>
                <Button className="flex items-center gap-2" variant="outline">
                  <ClipboardList size={18} /> Histórico
                </Button>
                <Button className="flex items-center gap-2" variant="outline">
                  <Calendar size={18} /> Agenda
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700">
                  📂 <strong>24</strong> Prontuários ativos
                </p>
                <p className="text-gray-700">
                  🗓️ <strong>5</strong> Atendimentos esta semana
                </p>
                <p className="text-gray-700">
                  👩‍⚕️ <strong>3</strong> Profissionais ativos
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <Card>
            <CardHeader>
              <CardTitle>Prontuários Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ListaProntuariosRecentes
                prontuarios={prontuariosMock}
                onVisualizar={(id) => alert(`Abrir prontuário ID ${id}`)}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
