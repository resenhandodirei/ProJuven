"use client";

import React, { useState } from "react";
import SidebarMenu from "@/components/SidebarMenu";
import { Button } from "@/components/Button";
import "@/styles/globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";


// 🧩 Imports do Chart.js
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend as ChartLegend,
  BarElement,
  Title,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Chart, Doughnut, Radar } from "react-chartjs-2";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  Legend as ReLegend,
} from "recharts";

ChartJS.register(
  ArcElement,
  Tooltip,
  ChartLegend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

const ALERT_COLOR = {
  red: "bg-red-500 border-red-700",
  yellow: "bg-yellow-500 border-yellow-700",
  green: "bg-green-500 border-green-700",
};

export default function JudicialDashboard() {
  const [activeMenu, setActiveMenu] = useState("judicial");
  const [expanded, setExpanded] = useState(false);


  const renderKPICard = (title: string, value: string, alert: "red" | "yellow" | "green", trend: string) => (
    <div className="relative p-5 bg-white shadow-xl rounded-xl border-l-8 border-blue-600 transition duration-300 hover:shadow-2xl">
      <div className={`absolute top-3 right-3 w-4 h-4 rounded-full ${ALERT_COLOR[alert]}`}></div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className="flex items-end justify-between mt-1">
        <p className="text-4xl font-extrabold text-gray-900">{value}</p>
        <span className={`text-sm font-bold ${trend.includes("▲") ? "text-red-500" : "text-green-500"}`}>
          {trend}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-2">Comparado ao último trimestre</p>
    </div>
  );

  // 📈 Dados base
  const reincidenciaData = [
    { mes: "Jan", valor: 20 },
    { mes: "Fev", valor: 25 },
    { mes: "Mar", valor: 35 },
    { mes: "Abr", valor: 30 },
    { mes: "Mai", valor: 38 },
    { mes: "Jun", valor: 40 },
  ];

  const violenciaData = [
    { agente: "Polícia Militar", incidencias: 12 },
    { agente: "Socioeducadores", incidencias: 7 },
    { agente: "Outros", incidencias: 4 },
  ];

  const donutData = {
    labels: ["Internação", "Semiliberdade", "Liberdade Assistida", "Advertência"],
    datasets: [
      {
        label: "Forma de Responder ao Processo",
        data: [25, 15, 40, 20],
        backgroundColor: ["#22c55e", "#f59e0b", "#3b82f6", "#a855f7"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const reincidenciaGenero = [
    { mes: "Jan", masculino: 18, feminino: 8 },
    { mes: "Fev", masculino: 22, feminino: 9 },
    { mes: "Mar", masculino: 27, feminino: 10 },
    { mes: "Abr", masculino: 25, feminino: 11 },
    { mes: "Mai", masculino: 30, feminino: 13 },
    { mes: "Jun", masculino: 33, feminino: 14 },
  ];

  const radarData = {
    labels: ["Roubo", "Furto", "Tráfico", "Homicídio", "Dano ao Patrimônio"],
    datasets: [
      {
        label: "Ensino Fundamental Incompleto",
        data: [85, 65, 78, 40, 55],
        backgroundColor: "rgba(34,197,94,0.2)",
        borderColor: "#22c55e",
        borderWidth: 2,
      },
      {
        label: "Ensino Médio Completo",
        data: [45, 40, 50, 20, 25],
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "#3b82f6",
        borderWidth: 2,
      },
    ],
  };

  const medidasData = [
    { mes: "Jan", internacao: 10, semiliberdade: 5, liberdade: 8 },
    { mes: "Fev", internacao: 14, semiliberdade: 7, liberdade: 10 },
    { mes: "Mar", internacao: 18, semiliberdade: 9, liberdade: 12 },
    { mes: "Abr", internacao: 20, semiliberdade: 10, liberdade: 14 },
    { mes: "Mai", internacao: 17, semiliberdade: 8, liberdade: 16 },
    { mes: "Jun", internacao: 15, semiliberdade: 9, liberdade: 18 },
  ];

  const COLORS = ["#ef4444", "#facc15", "#3b82f6"];

  return (
    <>
      <Navbar />
      <div className="flex">
        <SidebarMenu activeItem={activeMenu} onItemClick={setActiveMenu} />

        <div className="ml-64 flex-grow p-8 bg-gray-100 min-h-screen">
          <header className="mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Jurídico e de Segurança</h1>
            <p className="text-gray-500">Monitoramento de Processos, Reincidência e Riscos Preditivos.</p>
          </header>

          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Indicadores Chave (KPIs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {renderKPICard("Reincidência (Último Tri.)", "35%", "red", "▲ 15%")}
            {renderKPICard("Média de Duração MP (Dias)", "52", "yellow", "▲ 4%")}
            {renderKPICard("Violência Institucional (Incid.)", "12", "red", "▲ 25%")}
            {renderKPICard("Jovens com Ameaça (PPCAM/PPRO)", "28", "yellow", "▼ 8%")}
          </div>

          <div className="p-5 bg-yellow-100 border-l-4 border-yellow-600 shadow-md rounded-lg mb-8">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">Insights e Recomendações</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>⚠️ <strong>Alerta Crítico:</strong> Jovens de 14–16 anos têm risco <span className="text-red-600">2x maior</span> de reincidência.</li>
              <li>🚨 <strong>Urgente:</strong> Violência Institucional aumentou <span className="text-red-600">25%</span>.</li>
              <li>💡 <strong>Estratégia:</strong> Evasão escolar ligada ao GDE — reforçar programas educacionais.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Análises e Visualizações</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-lg rounded-xl p-5 h-96">
              <h3 className="text-lg font-semibold mb-3">Evolução da Reincidência (%)</h3>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={reincidenciaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <ReTooltip />
                  <Line type="monotone" dataKey="valor" stroke="#22c55e" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-5 h-96">
              <h3 className="text-lg font-semibold mb-3">Distribuição por Forma de Responder</h3>
              <div className="flex justify-center h-[85%]">
                <Doughnut data={donutData} />
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-5 h-96">
              <h3 className="text-lg font-semibold mb-3">Agentes de Violência Institucional</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={violenciaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="agente" />
                  <YAxis />
                  <ReTooltip />
                  <Bar dataKey="incidencias" fill="#f87171">
                    {violenciaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-5 h-96">
              <h3 className="text-lg font-semibold mb-3">Reincidência por Gênero (%)</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={reincidenciaGenero}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <ReTooltip />
                  <ReLegend />
                  <Bar dataKey="masculino" fill="#3b82f6" name="Masculino" />
                  <Bar dataKey="feminino" fill="#a855f7" name="Feminino" />
                </BarChart>
              </ResponsiveContainer>
            </div>

           <div className="bg-white shadow-lg rounded-xl p-5 h-96 w-[635px] mx-auto text-center">
                <h3 className="text-lg font-semibold mb-3">
                    Correlação Escolaridade x Ato Infracional
                </h3>

                <div className="flex justify-center items-center h-[80%]">
                    <Radar data={radarData} />
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-5 h-96 md:col-span-2 w-[960px] ">
              <h3 className="text-lg font-semibold mb-3">Medidas Aplicadas por Mês</h3>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={medidasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <ReTooltip />
                  <Area type="monotone" dataKey="internacao" stackId="1" stroke="#ef4444" fill="#fecaca" />
                  <Area type="monotone" dataKey="semiliberdade" stackId="1" stroke="#facc15" fill="#fef08a" />
                  <Area type="monotone" dataKey="liberdade" stackId="1" stroke="#22c55e" fill="#bbf7d0" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-10 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Você sabia?</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                    <li>🧠 Jovens acompanhados por mais de 6 meses têm 30% menos chance de reincidência.</li>
                    <li>🏫 78% dos casos de evasão escolar estão ligados a medidas em meio aberto.</li>
                    <li>👩‍⚕️ A presença de acompanhamento psicológico reduz em 40% as reincidências em até 1 ano.</li>
                </ul>
            </div>

            <Button onClick={() => setExpanded(!expanded)} className="bg-[var(--greenLight)] font-semibold px-6 py-2 rounded-xl hover:bg-[var(--golden)]  transition mt-6">
                
                {expanded ? "Fechar gráficos avançados ↑" : "Explorar Gráficos Avançados →"}

            </Button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-6 bg-white shadow-md border border-gray-200 rounded-xl p-6 text-left mx-auto"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            📊 Gráficos Avançados
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Explore análises preditivas e correlações mais complexas entre
                            variáveis socioeconômicas e reincidência. Esses dados são
                            gerados por algoritmos de aprendizado de máquina do ProJuven.
                        </p>

                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>📈 Correlação entre evasão escolar e reincidência por bairro.</li>
                            <li>🧠 Mapa de calor de vulnerabilidade social.</li>
                            <li>⚖️ Impacto das medidas alternativas no tempo de ressocialização.</li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>

      </div>
      <Footer />
    </>
  );
}
