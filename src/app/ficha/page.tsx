"use client";

import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Tabs from "@/components/Tabs";
import StepTimeline from "@/components/StepTimeline";
import { Input } from "@/components/form/Input";
import InputText from "@/components/form/InputText";
import { Button } from "@/components/Button";

export default function NovaFichaPage() {
  const [activeTab, setActiveTab] = useState("local");
  const [usuario, setUsuario] = useState<any>(null);

  const [form, setForm] = useState({
    localAtendimento: "",
    nomeAtendido: "",
    documento: "",
    qtdProcessos: 0,
    processos: [] as { numero: string; vara: string }[],
    qtdResponsaveis: 0,
    responsaveis: [] as { nome: string; telefone: string }[],
    criadoPor: "",
    criadoEm: "",
  });

  const tabs = [
    { label: "Local do Atendimento", value: "local" },
    { label: "Dados do Atendido", value: "dados" },
    { label: "Processos", value: "processos" },
    { label: "Responsáveis", value: "responsaveis" },
    { label: "Revisão e Salvamento", value: "revisao" },
  ];

  useEffect(() => {
    const data =
      localStorage.getItem("usuario_logado") ||
      sessionStorage.getItem("usuario_logado");
    if (data) setUsuario(JSON.parse(data));
  }, []);

  const handleQtdProcessosChange = (value: number) => {
    const qtd = Math.max(0, value);
    const novos = Array.from({ length: qtd }, (_, i) => {
      return form.processos[i] || { numero: "", vara: "" };
    });
    setForm((prev) => ({ ...prev, qtdProcessos: qtd, processos: novos }));
  };

  const handleProcessoChange = (index: number, field: string, value: string) => {
    const novos = [...form.processos];
    novos[index][field as "numero" | "vara"] = value;
    setForm((prev) => ({ ...prev, processos: novos }));
  };

  const handleQtdResponsaveisChange = (value: number) => {
    const qtd = Math.max(0, value);
    const novos = Array.from({ length: qtd }, (_, i) => {
      return form.responsaveis[i] || { nome: "", telefone: "" };
    });
    setForm((prev) => ({ ...prev, qtdResponsaveis: qtd, responsaveis: novos }));
  };

  const handleResponsavelChange = (index: number, field: string, value: string) => {
    const novos = [...form.responsaveis];
    novos[index][field as "nome" | "telefone"] = value;
    setForm((prev) => ({ ...prev, responsaveis: novos }));
  };

  const handleSave = () => {
    const ficha = {
      ...form,
      criadoPor: usuario?.nome || "Usuário desconhecido",
      cargo: usuario?.cargo || "Indefinido",
      defensorResponsavel:
        usuario?.cargo === "Estagiário" ? usuario.defensorResponsavel : null,
      criadoEm: new Date().toLocaleString("pt-BR"),
    };

    const existentes = JSON.parse(localStorage.getItem("projuven_fichas") || "[]");
    localStorage.setItem("projuven_fichas", JSON.stringify([...existentes, ficha]));
    alert("✅ Ficha salva com sucesso!");
    setActiveTab("local");
  };

  return (
    <>
      <Navbar />

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepTimeline
          steps={tabs.map((t) => t.label)}
          currentStep={tabs.findIndex((t) => t.value === activeTab)}
          onStepClick={(index) => setActiveTab(tabs[index].value)}
        />

        <div className="min-h-screen bg-gray-50 py-10 px-4 flex">
          <div className="w-72 border-r border-gray-200 pr-6">
            <Tabs
              orientation="vertical"
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={tabs}
            />
          </div>

          <div className="flex-1 pl-10 space-y-8">
            {activeTab === "local" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Local do Atendimento
                </h2>
                <select
                  value={form.localAtendimento}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      localAtendimento: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[var(--greenLight)]"
                >
                  <option value="">Selecione...</option>
                  <option value="CENTRO_SOCIOEDUCATIVO">Centro Socioeducativo</option>
                  <option value="NUAJA">Nuaja</option>
                  <option value="REMOTO">Remoto</option>
                </select>
              </div>
            )}

            {activeTab === "dados" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Dados do Atendido
                </h2>
                <InputText
                  id="nomeAtendido"
                  label="Nome do Atendido"
                  value={form.nomeAtendido}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, nomeAtendido: e.target.value }))
                  }
                />
                <InputText
                  id="documento"
                  label="Número do Documento"
                  value={form.documento}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, documento: e.target.value }))
                  }
                />
              </div>
            )}

            {activeTab === "processos" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Processos Vinculados
                </h2>

                <Input
                  id="qtdProcessos"
                  type="number"
                  label="Quantidade de processos"
                  value={form.qtdProcessos}
                  onChange={(e) => handleQtdProcessosChange(Number(e.target.value))}
                />

                {form.qtdProcessos > 0 && (
                  <div className="mt-6 space-y-4">
                    {form.processos.map((p, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                      >
                        <InputText
                          id={`processo-${i}`}
                          label={`Número do Processo ${i + 1}`}
                          value={p.numero}
                          onChange={(e) =>
                            handleProcessoChange(i, "numero", e.target.value)
                          }
                        />
                        <InputText
                          id={`vara-${i}`}
                          label="Vara do Processo"
                          value={p.vara}
                          onChange={(e) =>
                            handleProcessoChange(i, "vara", e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "responsaveis" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Responsáveis pelo Atendido
                </h2>

                <Input
                  id="qtdResponsaveis"
                  type="number"
                  label="Quantidade de Responsáveis"
                  value={form.qtdResponsaveis}
                  onChange={(e) => handleQtdResponsaveisChange(Number(e.target.value))}
                />

                {form.qtdResponsaveis > 0 && (
                  <div className="mt-6 space-y-4">
                    {form.responsaveis.map((r, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                      >
                        <InputText
                          id={`responsavel-${i}`}
                          label={`Nome do Responsável ${i + 1}`}
                          value={r.nome}
                          onChange={(e) =>
                            handleResponsavelChange(i, "nome", e.target.value)
                          }
                        />
                        <InputText
                          id={`telefone-${i}`}
                          label="Telefone"
                          value={r.telefone}
                          onChange={(e) =>
                            handleResponsavelChange(i, "telefone", e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "revisao" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Revisão da Ficha
                </h2>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-sm space-y-2">
                  <p><strong>Local:</strong> {form.localAtendimento}</p>
                  <p><strong>Nome:</strong> {form.nomeAtendido}</p>
                  <p><strong>Documento:</strong> {form.documento}</p>
                  <p><strong>Processos:</strong> {form.qtdProcessos}</p>
                  <p><strong>Responsáveis:</strong> {form.qtdResponsaveis}</p>
                  <p>
                    <strong>Usuário Logado:</strong> {usuario?.nome} ({usuario?.cargo})
                  </p>
                  {usuario?.cargo === "Estagiário" && (
                    <p>
                      <strong>Vinculado ao Defensor:</strong>{" "}
                      {usuario.defensorResponsavel || "Não informado"}
                    </p>
                  )}
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    className="bg-[var(--greenLight)] text-white px-6 py-2 rounded-xl hover:bg-[var(--golden)] transition"
                    onClick={handleSave}
                  >
                    Salvar Ficha
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
