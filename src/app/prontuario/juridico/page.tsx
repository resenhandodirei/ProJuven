"use client";

import React, { useState } from "react";
import "@/styles/globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import StepTimeline from "@/components/StepTimeline";
import Tabs from "@/components/Tabs";

import { Input } from "@/components/form/Input";
import InputText from "@/components/form/InputText";
import InputSelect from "@/components/form/InputSelect";
import CheckboxGroup from "@/components/form/CheckboxGroup";
import RadioGroup from "@/components/form/RadioGroup";
import FormWrapper from "@/components/form/FormWrapper";
import { Button } from "@/components/Button";
import Alert from "@/components/Alert";

const ATO_OPTIONS = [
  { label: "Furto", value: "FURTO" },
  { label: "Feminicídio", value: "FEMINICIDIO" },
  { label: "Lesão corporal", value: "LESAO_CORPORAL" },
  { label: "Homicídio", value: "HOMICIDIO" },
  { label: "Latrocínio", value: "LATROCINIO" },
  { label: "Roubo", value: "ROUBO" },
  { label: "Receptação", value: "RECEPTACAO" },
  { label: "Porte ilegal de arma de fogo", value: "PORTE_ARMA" },
  { label: "Estupro", value: "ESTUPRO" },
  { label: "Ameaça", value: "AMEACA" },
  { label: "Dano", value: "DANO" },
  { label: "Outros", value: "OUTROS" },
];

const FACCAO_OPTIONS = [
  { label: "CV", value: "CV" },
  { label: "GDE", value: "GDE" },
  { label: "FDN (Massa)", value: "FDN" },
  { label: "PCC", value: "PCC" },
  { label: "Outros", value: "OUTROS" },
];

const BAIRROS = [
  { label: "Beira Mar", value: "BEIRA_MAR" },
  { label: "Aldeota", value: "ALDEOTA" },
  { label: "Centro", value: "CENTRO" },
  { label: "Meireles", value: "MEIRELES" },
  { label: "Parangaba", value: "PARANGABA" },
];

const SIM_NAO = [
  { label: "Sim", value: "SIM" },
  { label: "Não", value: "NAO" },
];

const TABS = [
  { label: "Dados Pessoais", value: "dados-pessoais" },
  { label: "Dados do Ato Infracional", value: "dados-ato-infracional" },
  { label: "Documentos", value: "documentos" },
  { label: "Atendimentos", value: "atendimentos" },
];

export default function JuridicoPage() {
  const [activeTab, setActiveTab] = useState("dados-pessoais");

  const [form, setForm] = useState({
    nomeJovem: "",
    familiar1: "",
    familiar2: "",
    telResp11: "",
    telResp12: "",
    telResp21: "",
    telResp22: "",
    qtdProcessos: 0,
    processos: [] as { numero: string; vara: string }[],
    atos: [] as string[],
    consumado: "CONSUMADO",
    reincidencia: "NAO",
    bairroMoradia: "",
    bairroAto: "",
    localEspecifico: "",
    faccaoAtendido: "",
    faccaoBairroMoradia: "",
    faccaoBairroAto: "",
  });

  const setField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleQtdProcessosChange = (value: number) => {
    const qtd = Math.max(0, value);
    const novosProcessos = Array.from({ length: qtd }, (_, i) => {
      return form.processos[i] || { numero: "", vara: "" };
    });
    setForm((prev) => ({ ...prev, qtdProcessos: qtd, processos: novosProcessos }));
  };

  const handleProcessoChange = (index: number, field: "numero" | "vara", value: string) => {
    const novosProcessos = [...form.processos];
    novosProcessos[index][field] = value;
    setField("processos", novosProcessos);
  };

  const handleNext = () => {
    const currentIndex = TABS.findIndex((t) => t.value === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].value);
    }
  };

  const handlePrevious = () => {
    const currentIndex = TABS.findIndex((t) => t.value === activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].value);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Linha do tempo interativa */}
        <StepTimeline
          steps={TABS.map((tab) => tab.label)}
          currentStep={TABS.findIndex((t) => t.value === activeTab)}
          onStepClick={(index) => setActiveTab(TABS[index].value)}
        />

        <div className="min-h-screen bg-gray-50 py-10 px-4 flex">
          {/* Tabs laterais verticais */}
          <div className="w-64 border-r border-gray-200 pr-4">
            <Tabs
              orientation="vertical"
              activeTab={activeTab}
              onChange={(value) => setActiveTab(value)}
              tabs={TABS}
            />
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 pl-8">
            {/* === DADOS PESSOAIS === */}
            {activeTab === "dados-pessoais" && (
              <FormWrapper title="Dados Pessoais">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputText
                    id="nomeJovem"
                    label="Nome do jovem atendido"
                    value={form.nomeJovem}
                    onChange={(e) => setField("nomeJovem", e.target.value)}
                  />
                  <InputText
                    id="familiar1"
                    label="Familiar responsável 1"
                    value={form.familiar1}
                    onChange={(e) => setField("familiar1", e.target.value)}
                  />
                  <InputText
                    id="familiar2"
                    label="Familiar responsável 2"
                    value={form.familiar2}
                    onChange={(e) => setField("familiar2", e.target.value)}
                  />
                  <Input id="telResp11" label="Telefone 1.1" value={form.telResp11} onChange={(e) => setField("telResp11", e.target.value)} />
                  <Input id="telResp12" label="Telefone 1.2" value={form.telResp12} onChange={(e) => setField("telResp12", e.target.value)} />
                  <Input id="telResp21" label="Telefone 2.1" value={form.telResp21} onChange={(e) => setField("telResp21", e.target.value)} />
                  <Input id="telResp22" label="Telefone 2.2" value={form.telResp22} onChange={(e) => setField("telResp22", e.target.value)} />
                  <Input
                    id="qtdProcessos"
                    label="Quantidade de processos"
                    type="number"
                    value={form.qtdProcessos}
                    onChange={(e) => handleQtdProcessosChange(Number(e.target.value))}
                  />
                </div>

                {form.qtdProcessos > 0 && (
                  <div className="mt-6 space-y-4">
                    {form.processos.map((p, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                      >
                        <InputText
                          id={`processo-${index}`}
                          label={`Número do processo ${index + 1}`}
                          value={p.numero}
                          onChange={(e) => handleProcessoChange(index, "numero", e.target.value)}
                        />
                        <InputSelect
                          id={`vara-${index}`}
                          label="Vara do processo"
                          options={[
                            { label: "1ª Vara", value: "VARA_1" },
                            { label: "2ª Vara", value: "VARA_2" },
                            { label: "3ª Vara", value: "VARA_3" },
                            { label: "4ª Vara", value: "VARA_4" },
                          ]}
                          value={p.vara}
                          onChange={(v) => handleProcessoChange(index, "vara", v)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <div />
                  <Button onClick={handleNext}>Próximo</Button>
                </div>
              </FormWrapper>
            )}

            {/* === DADOS DO ATO INFRACIONAL === */}
            {activeTab === "dados-ato-infracional" && (
              <FormWrapper title="Dados do Ato Infracional">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CheckboxGroup
                    label="Ato(s) infracional(is)"
                    name="atos"
                    options={ATO_OPTIONS}
                    values={form.atos}
                    onChange={(v) => setField("atos", v)}
                  />

                  <RadioGroup
                    label="Consumado ou tentado"
                    name="consumado"
                    options={[
                      { label: "Consumado", value: "CONSUMADO" },
                      { label: "Tentado", value: "TENTADO" },
                    ]}
                    value={form.consumado}
                    onChange={(v) => setField("consumado", v)}
                  />

                  <RadioGroup
                    label="Reincidência"
                    name="reincidencia"
                    options={SIM_NAO}
                    value={form.reincidencia}
                    onChange={(v) => setField("reincidencia", v)}
                  />

                  <InputSelect
                    id="bairroMoradia"
                    label="Bairro de moradia"
                    options={BAIRROS}
                    value={form.bairroMoradia}
                    onChange={(v) => setField("bairroMoradia", v)}
                  />

                  <InputSelect
                    id="bairroAto"
                    label="Bairro do ato"
                    options={BAIRROS}
                    value={form.bairroAto}
                    onChange={(v) => setField("bairroAto", v)}
                  />

                  <InputText
                    id="localEspecifico"
                    label="Local específico do ato"
                    value={form.localEspecifico}
                    onChange={(e) => setField("localEspecifico", e.target.value)}
                  />

                  <InputSelect
                    id="faccaoAtendido"
                    label="Facção do atendido"
                    options={FACCAO_OPTIONS}
                    value={form.faccaoAtendido}
                    onChange={(v) => setField("faccaoAtendido", v)}
                  />

                  <InputSelect
                    id="faccaoBairroMoradia"
                    label="Facção do bairro de moradia (sugestão)"
                    options={FACCAO_OPTIONS}
                    value={form.faccaoBairroMoradia}
                    onChange={(v) => setField("faccaoBairroMoradia", v)}
                  />

                  <InputSelect
                    id="faccaoBairroAto"
                    label="Facção do bairro do ato (sugestão)"
                    options={FACCAO_OPTIONS}
                    value={form.faccaoBairroAto}
                    onChange={(v) => setField("faccaoBairroAto", v)}
                  />
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="secondary" onClick={handlePrevious}>
                    Anterior
                  </Button>
                  <Button onClick={handleNext}>Próximo</Button>
                </div>
              </FormWrapper>
            )}

            {activeTab === "documentos" && (
              <FormWrapper title="Documentos">
                <Alert type="info" message="Envio de documentos será adicionado aqui." />
                <div className="mt-6 flex justify-between">
                  <Button variant="secondary" onClick={handlePrevious}>
                    Anterior
                  </Button>
                  <Button onClick={handleNext}>Próximo</Button>
                </div>
              </FormWrapper>
            )}

            {activeTab === "atendimentos" && (
              <FormWrapper title="Atendimentos">
                <Alert type="info" message="Sessão de atendimentos será configurada em breve." />
                <div className="mt-6 flex justify-start">
                  <Button variant="secondary" onClick={handlePrevious}>
                    Anterior
                  </Button>
                </div>
              </FormWrapper>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
