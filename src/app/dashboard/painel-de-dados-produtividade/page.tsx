"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Bar,
  Line,
  Doughnut,
  Radar,
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
  Filler,
} from "chart.js";
import { motion } from "framer-motion";
import SidebarMenu from "@/components/SidebarMenu";
import { Card } from "@/components/Cards";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/globals.css";

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
  Legend,
  Filler
);

export default function PainelProdutividadeAvancado() {
  const [periodo, setPeriodo] = useState("mensal");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);

  const periodos = [
    { label: "1 dia", value: "diario" },
    { label: "Semanal", value: "semanal" },
    { label: "Quinzenal", value: "quinzenal" },
    { label: "Mensal", value: "mensal" },
    { label: "Trimestral", value: "trimestral" },
    { label: "Semestral", value: "semestral" },
    { label: "Anual", value: "anual" },
  ];

  const dados = useMemo(() => {
    return {
      fichas: [25, 30, 45, 50, 70, 90],
      prontuarios: [15, 20, 30, 40, 55, 70],
      taxaAbertura: [60, 68, 75, 83, 89, 92],
      prontuariosAtualizados: [80, 85, 88, 90, 93, 95],
      taxaAtualizacao: 82,
      estagiarios: ["Larissa", "Bruno", "Juliana", "Mateus", "Clara"],
      atendimentosEstagiarios: [35, 28, 48, 42, 31],
      defensores: ["Andreia", "Luciana", "Rubens"],
      produtividadeDefensores: [88, 95, 76],
      atendimentoPrimario: [25, 35, 40, 50, 45, 60],
    };
  }, [periodo, dataInicio, dataFim]);

  const gradient = (ctx: any, color1: string, color2: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const fichasVsProntuarios = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Fichas",
        data: dados.fichas,
        backgroundColor: (context: any) =>
          gradient(context.chart.ctx, "rgba(59,130,246,0.7)", "rgba(37,99,235,0.3)"),
        borderRadius: 8,
      },
      {
        label: "Prontuários",
        data: dados.prontuarios,
        backgroundColor: (context: any) =>
          gradient(context.chart.ctx, "rgba(16,185,129,0.7)", "rgba(5,150,105,0.3)"),
        borderRadius: 8,
      },
    ],
  };

  const taxaAberturaData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Taxa de Abertura (%)",
        data: dados.taxaAbertura,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const prontuariosAtualizadosData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Prontuários Atualizados (%)",
        data: dados.prontuariosAtualizados,
        borderColor: "#059669",
        backgroundColor: "rgba(5,150,105,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const comparativoAberturaAtualizacao = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Taxa de Abertura",
        data: dados.taxaAbertura,
        borderColor: "#2563eb",
        tension: 0.3,
        fill: false,
      },
      {
        label: "Taxa de Atualização",
        data: dados.prontuariosAtualizados,
        borderColor: "#10b981",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const atendimentoPrimarioData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Atendimentos Primários",
        data: dados.atendimentoPrimario,
        backgroundColor: (context: any) =>
          gradient(context.chart.ctx, "rgba(99,102,241,0.7)", "rgba(165,180,252,0.3)"),
        borderRadius: 8,
      },
    ],
  };

  const estagiariosBarData = {
    labels: dados.estagiarios,
    datasets: [
      {
        label: "Atendimentos Realizados",
        data: dados.atendimentosEstagiarios,
        backgroundColor: ["#60a5fa", "#34d399", "#facc15", "#f87171", "#a78bfa"],
        borderRadius: 6,
        borderWidth: 1,
      },
    ],
  };

  const radarDefensores = {
    labels: dados.defensores,
    datasets: [
      {
        label: "Produtividade (%)",
        data: dados.produtividadeDefensores,
        backgroundColor: "rgba(59,130,246,0.3)",
        borderColor: "#2563eb",
        pointBackgroundColor: "#1d4ed8",
        borderWidth: 2,
      },
    ],
  };

  const doughnutAtualizacao = {
    labels: ["Atualizado", "Não Atualizado"],
    datasets: [
      {
        data: [dados.taxaAtualizacao, 100 - dados.taxaAtualizacao],
        backgroundColor: ["#2563eb", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: "easeOutQuart" },
    plugins: {
      legend: { labels: { color: "#374151", font: { size: 12 } } },
      tooltip: { backgroundColor: "rgba(31,41,55,0.9)", titleColor: "#fff", bodyColor: "#f3f4f6" },
    },
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <SidebarMenu />
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4"
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Painel de Produtividade
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <label className="text-gray-600 text-sm font-medium">
                Filtro temporal:
              </label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                {periodos.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <DatePicker
                  selected={dataInicio}
                  onChange={(date) => setDataInicio(date)}
                  selectsStart
                  startDate={dataInicio}
                  endDate={dataFim}
                  placeholderText="Início"
                  dateFormat="dd/MM/yyyy"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 shadow-sm w-32"
                />
                <span>-</span>
                <DatePicker
                  selected={dataFim}
                  onChange={(date) => setDataFim(date)}
                  selectsEnd
                  startDate={dataInicio}
                  endDate={dataFim}
                  minDate={dataInicio}
                  placeholderText="Fim"
                  dateFormat="dd/MM/yyyy"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 shadow-sm w-32"
                />
              </div>
            </div>
          </motion.div>

          {/* Grade de gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Linha 1 */}
            <Card className="col-span-2 p-6 bg-white rounded-2xl shadow-md">
              <h2 className="font-semibold text-gray-800 mb-3">
                Fichas e Prontuários Abertos/Atualizados
              </h2>
              <div className="h-64">
                <Bar data={fichasVsProntuarios} options={chartOptions} />
              </div>
            </Card>

            <Card className="p-6 bg-white rounded-2xl shadow-md">
              <h2 className="font-semibold text-gray-800 mb-3">
                Taxa de Abertura
              </h2>
              <div className="h-64">
                <Line data={taxaAberturaData} options={chartOptions} />
              </div>
            </Card>

            {/* Linha 2 */}
            <Card className="p-6 bg-white rounded-2xl shadow-md">
              <h2 className="font-semibold text-gray-800 mb-3">
                Prontuários Atualizados
              </h2>
              <div className="h-56">
                <Line data={prontuariosAtualizadosData} options={chartOptions} />
              </div>
            </Card>

            <Card className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center">
              <h2 className="font-semibold text-gray-800 mb-3 text-center">
                Taxa de Atualização
              </h2>

              {/* Container fixo e proporcional */}
              <div className="w-28 h-28 flex justify-center items-center">
                <Doughnut
                  data={doughnutAtualizacao}
                  options={{
                    cutout: "70%", // deixa o anel mais fino e elegante
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: true },
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                  }}
                />
              </div>

              {/* Texto de destaque */}
              <p className="text-sm font-semibold text-blue-600 mt-3">
                {dados.taxaAtualizacao}% atualizadas
              </p>
            </Card>


            <Card className="p-6 bg-white rounded-2xl shadow-md">
              <h2 className="font-semibold text-gray-800 mb-3">
                Comparativo: Abertura × Atualização
              </h2>
              <div className="h-56">
                <Line data={comparativoAberturaAtualizacao} options={chartOptions} />
              </div>
            </Card>

            {/* Linha 3 */}
            <Card className="p-6 bg-white rounded-2xl shadow-md">
              <h2 className="font-semibold text-gray-800 mb-3">
                Atendimento Primário
              </h2>
              <div className="h-56">
                <Bar data={atendimentoPrimarioData} options={chartOptions} />
              </div>
            </Card>

            <Card className="p-6 bg-white rounded-2xl shadow-md">
              <h2 className="font-semibold text-gray-800 mb-3">
                Produtividade de Estagiários
              </h2>
              <div className="h-56">
                <Bar data={estagiariosBarData} options={{ ...chartOptions, indexAxis: "y" }} />
              </div>
            </Card>

            <Card className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center">
              <h2 className="font-semibold text-gray-800 mb-3">
                Produtividade de Defensores
              </h2>
              <div className="w-64 h-64">
                <Radar data={radarDefensores} options={chartOptions} />
              </div>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
