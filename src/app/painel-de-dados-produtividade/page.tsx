"use client";

import React, { useState, useMemo } from "react";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Line,
  Radar,
  Doughnut,
  Bar,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "@/components/Cards";
import { motion } from "framer-motion";
import { Select } from "@/components/Select";
import { Sidebar } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function PainelProdutividadeInterativo() {
  const [periodo, setPeriodo] = useState("mensal");

  // === CONFIGURAÇÃO DE PERÍODOS ===
  const periodos = [
    { label: "Último dia", value: "diario" },
    { label: "Semanal", value: "semanal" },
    { label: "Quinzenal", value: "quinzenal" },
    { label: "Mensal", value: "mensal" },
    { label: "Trimestral", value: "trimestral" },
    { label: "Semestral", value: "semestral" },
    { label: "Anual", value: "anual" },
  ];

  // === MOCK DE DADOS VARIÁVEIS ===
  const dados = useMemo(() => {
    const base = {
      fichasMensais: [10, 15, 22, 18, 25, 30, 28],
      defensores: ["Rubens", "Luciana", "Andreia"],
      produtividade: [85, 100, 78],
      formasAtendimento: {
        remoto: 25,
        presencial: 32,
        socioeducativo: 12,
      },
      atendimentoPrimario: { sim: 60, nao: 15 },
      taxaAtualizacao: 68,
    };

    switch (periodo) {
      case "diario":
        return {
          ...base,
          fichasMensais: [3, 2, 4, 1, 3],
          taxaAtualizacao: 45,
        };
      case "semanal":
        return {
          ...base,
          fichasMensais: [5, 8, 12, 10, 9, 14, 11],
          taxaAtualizacao: 58,
        };
      case "quinzenal":
        return {
          ...base,
          fichasMensais: [10, 12, 18, 14, 15],
          taxaAtualizacao: 63,
        };
      case "trimestral":
        return {
          ...base,
          fichasMensais: [18, 22, 28],
          taxaAtualizacao: 75,
        };
      case "semestral":
        return {
          ...base,
          fichasMensais: [15, 20, 22, 28, 30, 32],
          taxaAtualizacao: 80,
        };
      case "anual":
        return {
          ...base,
          fichasMensais: [10, 15, 22, 18, 25, 30, 28, 40, 35, 45, 48, 50],
          taxaAtualizacao: 88,
        };
      default:
        return base;
    }
  }, [periodo]);

  // === DADOS DOS GRÁFICOS ===
  const areaChartData = {
    labels:
      periodo === "anual"
        ? ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        : Array.from({ length: dados.fichasMensais.length }, (_, i) => `P${i + 1}`),
    datasets: [
      {
        label: "Fichas abertas/atualizadas",
        data: dados.fichasMensais,
        fill: true,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.3)",
        tension: 0.4,
      },
    ],
  };

  const radarData = {
    labels: dados.defensores,
    datasets: [
      {
        label: "Produtividade (%)",
        data: dados.produtividade,
        backgroundColor: "rgba(16,185,129,0.3)",
        borderColor: "#10b981",
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: ["Sim", "Não"],
    datasets: [
      {
        data: [dados.atendimentoPrimario.sim, dados.atendimentoPrimario.nao],
        backgroundColor: ["#16a34a", "#dc2626"],
      },
    ],
  };

  const barData = {
    labels: ["Remoto", "Presencial", "Socioeducativo"],
    datasets: [
      {
        label: "Atendimentos",
        data: Object.values(dados.formasAtendimento),
        backgroundColor: ["#3b82f6", "#f59e0b", "#10b981"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <>
    <Navbar />

    <div className="p-8 bg-gray-50 rounded-2xl">

        {/*<Sidebar />*/}
      {/* === CABEÇALHO E FILTRO === */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Painel de Produtividade</h1>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <label htmlFor="periodo" className="text-gray-600 text-sm">
            Filtro temporal:
          </label>
          <select
            id="periodo"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            {periodos.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* === CONTEÚDO === */}
      <motion.div
        key={periodo}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Tendência */}
        <Card className="p-6 col-span-1 lg:col-span-2 bg-white shadow rounded-2xl">
          <h2 className="font-semibold text-gray-800 mb-2">
            Evolução de Fichas e Prontuários
          </h2>
          <Line data={areaChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </Card>

        {/* Radar */}
        <Card className="p-6 bg-white shadow rounded-2xl flex flex-col items-center">
          <h2 className="font-semibold text-gray-800 mb-3">Comparativo de Defensores</h2>
          <div className="w-64">
            <Radar data={radarData} options={{ scales: { r: { suggestedMin: 0, suggestedMax: 100 } } }} />
          </div>
        </Card>

        {/* Doughnut */}
        <Card className="p-6 bg-white shadow rounded-2xl flex flex-col items-center">
          <h2 className="font-semibold text-gray-800 mb-3">Atendimento Primário</h2>
          <div className="w-48">
            <Doughnut data={doughnutData} options={{ cutout: "70%" }} />
          </div>
        </Card>

        {/* Barra */}
        <Card className="p-6 col-span-1 lg:col-span-2 bg-white shadow rounded-2xl">
          <h2 className="font-semibold text-gray-800 mb-3">Formas de Atendimento</h2>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </Card>

        {/* Gauge */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex flex-col items-center justify-center shadow">
          <h2 className="font-semibold text-gray-800 mb-4">Taxa de Atualização</h2>
          <div className="relative w-40 h-20">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path
                d="M10 50 A40 40 0 0 1 90 50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <path
                d="M10 50 A40 40 0 0 1 90 50"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeDasharray={`${dados.taxaAtualizacao * 1.26}, 252`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-blue-700">
              {dados.taxaAtualizacao}%
            </span>
          </div>
        </Card>
      </motion.div>

    </div>
    <Footer />
    </>
  );
}
