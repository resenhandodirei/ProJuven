"use client";

import React, { useState } from "react";
import "@/styles/globals.css";

import StepTimeline from "@/components/StepTimeline";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Tabs from "@/components/Tabs";
import { Input } from "@/components/form/Input";
import InputText from "@/components/form/InputText";
import InputSelect from "@/components/form/InputSelect";
import CheckboxGroup from "@/components/form/CheckboxGroup";
import RadioGroup from "@/components/form/RadioGroup";
import FormWrapper from "@/components/form/FormWrapper";
import { Button } from "@/components/Button";
import Alert from "@/components/Alert";
import Textarea from "@/components/form/Textarea";
import { Radio } from "lucide-react";

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

const SIM_NAO = [
  { label: "Sim", value: "SIM" },
  { label: "Não", value: "NAO" },
];

const FREQUENCIA = [
  { label: "Nunca", value: "NUNCA" },
  { label: "Raramente", value: "RARAMENTE" },
  { label: "Às vezes", value: "AS_VEZES" },
  { label: "Frequentemente", value: "FREQUENTEMENTE" },
  { label: "Sempre", value: "SEMPRE" },
  { label: "Mais de 3 vezes por semana", value: "MAIS_3X_POR_SEMANA" },
]

const TABS = [
  { label: "Dados Pessoais", value: "dados-pessoais" },
  { label: "Dados do Ato Infracional", value: "dados-ato-infracional" },
  { label: "Dados Sociodemográficos", value: "dados-sociodemograficos" },
  { label: "Dados de Saúde mental", value: "dados-saude-mental" },
  { label: "Dados de Internamento", value: "dados-de-internamento" },
  { label: "Dados de Ameaça", value: "dados-de-ameaca" },
  { label: "Dados de Atendimento", value: "dados-de-atendimento" },

];

export default function JuridicoPage() {
  const [activeTab, setActiveTab] = useState("dados-pessoais");

  const [form, setForm] = useState({
    // Dados pessoais
    nomeJovem: "",
    familiar1: "",
    familiar2: "",
    telResp11: "",
    telResp12: "",
    telResp21: "",
    telResp22: "",
    qtdProcessos: 0,
    processos: [] as { numero: string; vara: string }[],

    // Ato infracional
    atos: [] as string[],
    consumado: "CONSUMADO",
    reincidencia: "NAO",
    bairroMoradia: "",
    bairroAto: "",
    localEspecifico: "",
    faccaoAtendido: "",
    faccaoBairroMoradia: "",
    faccaoBairroAto: "",

    // Sociodemográficos
    dataNascimento: "",
    idadeAto: "",
    idadeAtual: "",
    raca: "",
    genero: "",
    deficiencia: "",
    tiposDeficiencia: [] as string[],
    escolaridadeStatus: "",
    nivelEscolaridade: "",
    tempoInatividade: "",
    rendaFamiliar: "",
    origemRenda: [] as string[],
    possuiFilhos: "",
    formaRespostaProcesso: "",
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
        {/* Linha do tempo */}
        <StepTimeline
          steps={TABS.map((t) => t.label)}
          currentStep={TABS.findIndex((t) => t.value === activeTab)}
          onStepClick={(index) => setActiveTab(TABS[index].value)}
        />

        <div className="min-h-screen bg-gray-50 py-10 px-4 flex">
          {/* Tabs laterais */}
          <div className="w-64 border-r border-gray-200 pr-4">
            <Tabs
              orientation="vertical"
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={TABS}
            />
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 pl-8">
            {/* DADOS PESSOAIS */}
            {activeTab === "dados-pessoais" && (
              <FormWrapper title="Dados Pessoais">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputText id="nomeJovem" label="Nome do jovem atendido" value={form.nomeJovem} onChange={(e) => setField("nomeJovem", e.target.value)} />
                  <InputText id="familiar1" label="Familiar responsável 1" value={form.familiar1} onChange={(e) => setField("familiar1", e.target.value)} />
                  <InputText id="familiar2" label="Familiar responsável 2" value={form.familiar2} onChange={(e) => setField("familiar2", e.target.value)} />
                  <Input id="telResp11" label="Telefone 1.1" value={form.telResp11} onChange={(e) => setField("telResp11", e.target.value)} />
                  <Input id="telResp12" label="Telefone 1.2" value={form.telResp12} onChange={(e) => setField("telResp12", e.target.value)} />
                  <Input id="telResp21" label="Telefone 2.1" value={form.telResp21} onChange={(e) => setField("telResp21", e.target.value)} />
                  <Input id="telResp22" label="Telefone 2.2" value={form.telResp22} onChange={(e) => setField("telResp22", e.target.value)} />
                  <Input id="qtdProcessos" label="Quantidade de processos" type="number" value={form.qtdProcessos} onChange={(e) => handleQtdProcessosChange(Number(e.target.value))} />
                </div>

                {form.qtdProcessos > 0 && (
                  <div className="mt-6 space-y-4">
                    {form.processos.map((p, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <InputText id={`processo-${index}`} label={`Número do processo ${index + 1}`} value={p.numero} onChange={(e) => handleProcessoChange(index, "numero", e.target.value)} />
                        <InputSelect id={`vara-${index}`} label="Vara do processo" options={[{ label: "1ª Vara", value: "VARA_1" }, { label: "2ª Vara", value: "VARA_2" }, { label: "3ª Vara", value: "VARA_3" }, { label: "4ª Vara", value: "VARA_4" }]} value={p.vara} onChange={(v) => handleProcessoChange(index, "vara", v)} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Botões */}
                <div className="mt-6 flex justify-between">
              
                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handleNext}
                  >
                    Próximo
                  </Button>
                </div>
              </FormWrapper>
            )}

            {/* ATO INFRACIONAL */}
            {activeTab === "dados-ato-infracional" && (
              <FormWrapper title="Dados do Ato Infracional">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CheckboxGroup label="Ato(s) infracional(is)" name="atos" options={ATO_OPTIONS} values={form.atos} onChange={(v) => setField("atos", v)} />
                  <RadioGroup label="Consumado ou tentado" name="consumado" options={[{ label: "Consumado", value: "CONSUMADO" }, { label: "Tentado", value: "TENTADO" }]} value={form.consumado} onChange={(v) => setField("consumado", v)} />
                  <RadioGroup label="Reincidência" name="reincidencia" options={SIM_NAO} value={form.reincidencia} onChange={(v) => setField("reincidencia", v)} />
                  <InputSelect id="bairroMoradia" label="Bairro de moradia" options={[{ label: "Beira Mar", value: "BEIRA_MAR" }, { label: "Centro", value: "CENTRO" }]} value={form.bairroMoradia} onChange={(v) => setField("bairroMoradia", v)} />
                  <InputSelect id="bairroAto" label="Bairro do ato" options={[{ label: "Beira Mar", value: "BEIRA_MAR" }, { label: "Centro", value: "CENTRO" }]} value={form.bairroAto} onChange={(v) => setField("bairroAto", v)} />
                  <InputText id="localEspecifico" label="Local específico do ato" value={form.localEspecifico} onChange={(e) => setField("localEspecifico", e.target.value)} />
                  <InputSelect id="faccaoAtendido" label="Facção do atendido" options={FACCAO_OPTIONS} value={form.faccaoAtendido} onChange={(v) => setField("faccaoAtendido", v)} />
                  <InputSelect id="faccaoBairroMoradia" label="Facção do bairro de moradia" options={FACCAO_OPTIONS} value={form.faccaoBairroMoradia} onChange={(v) => setField("faccaoBairroMoradia", v)} />
                  <InputSelect id="faccaoBairroAto" label="Facção do bairro do ato" options={FACCAO_OPTIONS} value={form.faccaoBairroAto} onChange={(v) => setField("faccaoBairroAto", v)} />
                </div>

                {/* Botões */}
                <div className="mt-6 flex justify-between">
                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handlePrevious}
                  >
                    Anterior
                  </Button>

                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handleNext}
                  >
                    Próximo
                  </Button>
                </div>
              </FormWrapper>
            )}

            {/* SOCIODEMOGRÁFICOS */}
            {activeTab === "dados-sociodemograficos" && (
              <FormWrapper title="Dados Sociodemográficos">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input id="dataNascimento" label="Data de nascimento" type="date" value={form.dataNascimento} onChange={(e) => setField("dataNascimento", e.target.value)} />
                  <InputSelect id="raca" label="Raça" options={[{ label: "Pardo", value: "PARDO" }, { label: "Preto", value: "PRETO" }, { label: "Indígena", value: "INDIGENA" }, { label: "Branco", value: "BRANCO" }, { label: "Amarelo", value: "AMARELO" }]} value={form.raca} onChange={(v) => setField("raca", v)} />
                  <RadioGroup label="Gênero" name="genero" options={[{ label: "Masculino", value: "MASCULINO" }, { label: "Feminino", value: "FEMININO" }, { label: "Prefere não informar", value: "NAO_INFORMAR" }]} value={form.genero} onChange={(v) => setField("genero", v)} />
                  <RadioGroup label="Pessoa com deficiência" name="deficiencia" options={SIM_NAO} value={form.deficiencia} onChange={(v) => setField("deficiencia", v)} />
                  {form.deficiencia === "SIM" && (
                    <CheckboxGroup label="Tipo de deficiência" name="tiposDeficiencia" options={[{ label: "Visual", value: "VISUAL" }, { label: "Auditiva", value: "AUDITIVA" }, { label: "Motora (física)", value: "MOTORA" }, { label: "Intelectual", value: "INTELECTUAL" }, { label: "ADL", value: "ADL" }, { label: "Outras", value: "OUTRAS" }]} values={form.tiposDeficiencia} onChange={(v) => setField("tiposDeficiencia", v)} />
                  )}
                  <InputSelect id="escolaridadeStatus" label="Situação escolar" options={[{ label: "Ativo", value: "ATIVO" }, { label: "Inativo", value: "INATIVO" }]} value={form.escolaridadeStatus} onChange={(v) => setField("escolaridadeStatus", v)} />
                  <InputSelect id="nivelEscolaridade" label="Nível de escolaridade" options={[{ label: "Analfabeto", value: "ANALFABETO" }, { label: "Fundamental completo", value: "FUNDAMENTAL_COMPLETO" }, { label: "Fundamental incompleto", value: "FUNDAMENTAL_INCOMPLETO" }, { label: "Médio completo", value: "MEDIO_COMPLETO" }, { label: "Médio incompleto", value: "MEDIO_INCOMPLETO" }, { label: "Técnico", value: "TECNICO" }]} value={form.nivelEscolaridade} onChange={(v) => setField("nivelEscolaridade", v)} />
                  {form.escolaridadeStatus === "INATIVO" && <Input id="tempoInatividade" label="Tempo de inatividade (meses)" type="number" value={form.tempoInatividade} onChange={(e) => setField("tempoInatividade", e.target.value)} />}
                  <InputSelect id="rendaFamiliar" label="Renda familiar" options={[{ label: "Até R$600", value: "ATE_600" }, { label: "R$600–R$1.212", value: "600_1212" }, { label: "R$1.212–R$2.424", value: "1212_2424" }, { label: "R$2.424–R$3.636", value: "2424_3636" }, { label: "Mais de R$12.120", value: "ACIMA_12120" }]} value={form.rendaFamiliar} onChange={(v) => setField("rendaFamiliar", v)} />
                  <CheckboxGroup label="Origem da renda" name="origemRenda" options={[{ label: "Trabalho formal", value: "FORMAL" }, { label: "Trabalho informal", value: "INFORMAL" }, { label: "Aposentadoria/pensão", value: "APOSENTADORIA" }, { label: "Programas sociais", value: "SOCIAL" }, { label: "Economia do tráfico", value: "TRAFICO" }, { label: "Outras rendas", value: "OUTRAS" }]} values={form.origemRenda} onChange={(v) => setField("origemRenda", v)} />
                  <RadioGroup label="Possui filhos" name="possuiFilhos" options={SIM_NAO} value={form.possuiFilhos} onChange={(v) => setField("possuiFilhos", v)} />
                  <InputSelect id="formaRespostaProcesso" label="Forma de responder ao processo" options={[{ label: "Em liberdade", value: "LIBERDADE" }, { label: "Internação provisória", value: "INTERNACAO_PROVISORIA" }, { label: "Semiliberdade", value: "SEMILIBERDADE" }, { label: "Internação definitiva", value: "INTERNACAO_DEFINITIVA" }, { label: "Outra forma", value: "OUTRA" }]} value={form.formaRespostaProcesso} onChange={(v) => setField("formaRespostaProcesso", v)} />
                </div>
                
                {/* Botões */}
                <div className="mt-6 flex justify-between">
                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handlePrevious}
                  >
                    Anterior
                  </Button>

                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handleNext}
                  >
                    Próximo
                  </Button>
                </div>
              </FormWrapper>
            )}

            {activeTab === "dados-saude-mental" && (
              <FormWrapper title="Dados de Saúde Mental">
                {/* Bloco principal de informações */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <RadioGroup
                    label="Comprometimento da saúde mental"
                    name="comprometimentoSaudeMental"
                    options={SIM_NAO}
                    value={form.comprometimentoSaudeMental}
                    onChange={(v) => setField("comprometimentoSaudeMental", v)}
                  />
                  <RadioGroup
                    label="Momento do comprometimento da saúde mental"
                    name="momentoComprometimentoSaudeMental"
                    options={SIM_NAO}
                    value={form.momentoComprometimentoSaudeMental}
                    onChange={(v) => setField("momentoComprometimentoSaudeMental", v)}
                  />
                  <RadioGroup
                    label="Uso de drogas"
                    name="usoDrogas"
                    options={SIM_NAO}
                    value={form.usoDrogas}
                    onChange={(v) => setField("usoDrogas", v)}
                  />
                </div>

                {/* Frequência do uso */}
                <div className="mt-6">
                  <RadioGroup
                    label="Frequência do uso de drogas"
                    name="frequenciaUsoDrogas"
                    options={FREQUENCIA}
                    value={form.frequenciaUsoDrogas}
                    onChange={(v) => setField("frequenciaUsoDrogas", v)}
                  />
                </div>

                {/* Tipos de drogas */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tipos de drogas usadas
                  </h3>

                  <CheckboxGroup
                    name="tiposDrogasUsadas"
                    options={[
                      { label: "Álcool", value: "ALCOOL" },
                      { label: "Tabaco, cigarro, vaping", value: "TABACO" },
                      { label: "Crack (Mesclado, pitio, raspa)", value: "CRACK" },
                      { label: "Maconha (Shank, haxixe, k2)", value: "MACONHA" },
                      { label: "Cocaína (Merla, oxi...)", value: "COCAINA" },
                      { label: "Solventes (Cola, loló, lança perfume, anti-respingo de solda)", value: "SOLVENTES" },
                      { label: "Tranquilizantes (Diazepam, Rivotril, Ripinol...)", value: "TRANQUILIZANTES" },
                      { label: "Anestésicos (Boa noite Cinderela, Ketamina)", value: "ANESTESICOS" },
                      { label: "Alucinógenos sintéticos (LSD, Doce, DMT, Aranha)", value: "ALUCINOGENOS_SINTETICOS" },
                      { label: "Alucinógenos naturais (Cogumelo, Zabumba, Ayahuasca, Santo Daime, Ibogaína)", value: "ALUCINOGENOS_NATURAIS" },
                      { label: "Anfetaminas (Rebite, Speed, Ritalina)", value: "ANFETAMINAS" },
                      { label: "Opióides (Remédios para dor, Morfina, Metadona, Tramal)", value: "OPIOIDES" },
                      { label: "Ecstasy", value: "ECSTASY" },
                      { label: "Heroína", value: "HEROINA" },
                      { label: "Não sabe/Não respondeu", value: "NAO_SABE" }
                    ]}
                    values={form.tiposDrogasUsadas}
                    onChange={(v) => setField("tiposDrogasUsadas", v)}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  />
                </div>

                {/* Tentativas de suicídio */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tentativa de suicídio
                  </h3>

                  <CheckboxGroup
                    label="Momento da tentativa"
                    name="momentoTentativaSuicidio"
                    options={[
                      { label: "Anterior à medida socioeducativa", value: "ANTERIOR" },
                      { label: "Posterior à medida socioeducativa", value: "POSTERIOR" }
                    ]}
                    values={form.momentoTentativaSuicidio}
                    onChange={(v) => setField("momentoTentativaSuicidio", v)}
                    className="flex flex-wrap gap-4"
                  />

                  <div className="mt-6">
                    <CheckboxGroup
                      label="Formas de tentativa de suicídio"
                      name="formaTentativaSuicidio"
                      options={[
                        { label: "Mutilação", value: "MUTILACAO" },
                        { label: "Atropelamento", value: "ATROPELAMENTO" },
                        { label: "Enforcamento / sufocação", value: "ENFORCAMENTO" },
                        { label: "Intoxicação por pesticidas ou medicamentos", value: "INTOXICACAO" },
                        { label: "Armas de fogo", value: "ARMA_FOGO" },
                        { label: "Quedas de altura", value: "QUEDAS_ALTURA" },
                        { label: "Afogamento", value: "AFOGAMENTO" },
                        { label: "Outros (queimaduras, acidentes intencionais, etc.)", value: "OUTROS" }
                      ]}
                      values={form.formaTentativaSuicidio}
                      onChange={(v) => setField("formaTentativaSuicidio", v)}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                    />
                  </div>
                </div>

                {/* Tratamentos */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tratamentos relacionados à saúde mental
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CheckboxGroup
                      label="Tratamento psicológico"
                      name="tratamentoPsicologico"
                      options={[
                        { label: "Anterior à medida socioeducativa", value: "ANTERIOR" },
                        { label: "Posterior à medida socioeducativa", value: "POSTERIOR" }
                      ]}
                      values={form.tratamentoPsicologico}
                      onChange={(v) => setField("tratamentoPsicologico", v)}
                    />

                    <CheckboxGroup
                      label="Internação psiquiátrica"
                      name="internacaoPsiquiatrica"
                      options={[
                        { label: "Anterior à medida socioeducativa", value: "ANTERIOR" },
                        { label: "Posterior à medida socioeducativa", value: "POSTERIOR" }
                      ]}
                      values={form.internacaoPsiquiatrica}
                      onChange={(v) => setField("internacaoPsiquiatrica", v)}
                    />

                    <CheckboxGroup
                      label="Tratamento medicamentoso"
                      name="tratamentoMedicamentoso"
                      options={[
                        { label: "Anterior à medida socioeducativa", value: "ANTERIOR" },
                        { label: "Posterior à medida socioeducativa", value: "POSTERIOR" }
                      ]}
                      values={form.tratamentoMedicamentoso}
                      onChange={(v) => setField("tratamentoMedicamentoso", v)}
                    />
                  </div>
                </div>
                
                {/* Botões */}
                <div className="mt-6 flex justify-between">
                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handlePrevious}
                  >
                    Anterior
                  </Button>

                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handleNext}
                  >
                    Próximo
                  </Button>
                </div>
              </FormWrapper>
            )}


            {activeTab === "dados-de-internamento" && (
              <FormWrapper title="Dados da Internação">
                {/* Centro Socioeducativo */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Centro Socioeducativo
                  </h3>

                  <InputSelect
                    label="Centro socioeducativo"
                    name="centroSocioeducativo"
                    options={[
                      { label: "Centro Socioeducativo de Semiliberdade Mártir Francisca", value: "MARTIR_FRANCISCA" },
                      { label: "Centro Socioeducativo Aldaci Barbosa Mota", value: "ALDACI_MOTA" },
                      { label: "Centro Socioeducativo Antônio Bezerra", value: "ANTONIO_BEZERRA" },
                      { label: "Centro Socioeducativo Cardeal Aloísio Lorscheider", value: "CARDEAL_LORSCHEIDER" },
                      { label: "Centro Socioeducativo Dom Bosco", value: "DOM_BOSCO" },
                      { label: "Centro Socioeducativo Patativa do Assaré", value: "PATATIVA_ASSARE" },
                      { label: "Centro Socioeducativo São Francisco", value: "SAO_FRANCISCO" },
                      { label: "Centro Socioeducativo São Miguel", value: "SAO_MIGUEL" },
                      { label: "Centro Socioeducativo do Canindezinho", value: "CANINDEZINHO" },
                      { label: "Centro Socioeducativo Passaré", value: "PASSARE" },
                      { label: "Unidade de Atendimento Inicial", value: "UAI" },
                      { label: "Unidade Socioeducativa do Interior do Estado", value: "INTERIOR" },
                    ]}
                    value={form.centroSocioeducativo}
                    onChange={(v) => setField("centroSocioeducativo", v)}
                  />
                </div>

                {/* Tipo de medida socioeducativa */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tipo de medida socioeducativa
                  </h3>

                  <CheckboxGroup
                    name="tipoMedidaSocioeducativa"
                    options={[
                      { label: "Advertência", value: "ADVERTENCIA" },
                      { label: "Provisória", value: "PROVISORIA" },
                      { label: "Internação sanção", value: "INTERNACAO_SANCAO" },
                      { label: "Semiliberdade", value: "SEMILIBERDADE" },
                      { label: "Liberdade assistida", value: "LIBERDADE_ASSISTIDA" },
                      { label: "Prestação de serviços", value: "PRESTACAO_SERVICOS" },
                      { label: "Pós cumprimento de medida", value: "POS_CUMPRIMENTO" },
                    ]}
                    values={form.tipoMedidaSocioeducativa}
                    onChange={(v) => setField("tipoMedidaSocioeducativa", v)}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  />

                  <div className="mt-6">
                    <Input
                      type="date"
                      label="Data de apreensão"
                      name="dataApreensao"
                      value={form.dataApreensao}
                      onChange={(e) => setField("dataApreensao", e.target.value)}
                    />
                  </div>
                </div>

                {/* Violência institucional */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Violência institucional
                  </h3>

                  <RadioGroup
                    label="Houve violência institucional?"
                    name="violenciaInstitucional"
                    options={[
                      { label: "Sim", value: "SIM" },
                      { label: "Não", value: "NAO" },
                    ]}
                    value={form.violenciaInstitucional}
                    onChange={(v) => setField("violenciaInstitucional", v)}
                  />

                  {/* Campos condicionais - exibe apenas se SIM */}
                  {form.violenciaInstitucional === "SIM" && (
                    <div className="mt-6 space-y-6">
                      <CheckboxGroup
                        label="Agentes de violência institucional"
                        name="agentesViolencia"
                        options={[
                          { label: "Polícia Militar", value: "PM" },
                          { label: "Polícia Civil", value: "PC" },
                          { label: "Socioeducadores", value: "SOCIOEDUCADORES" },
                          { label: "Agente penitenciário", value: "AGENTE_PENITENCIARIO" },
                          { label: "Médicos", value: "MEDICOS" },
                          { label: "Outros agentes públicos", value: "OUTROS" },
                        ]}
                        values={form.agentesViolencia}
                        onChange={(v) => setField("agentesViolencia", v)}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                      />

                      <CheckboxGroup
                        label="Forma de violência institucional"
                        name="formaViolencia"
                        options={[
                          { label: "Recusa de assistência médica", value: "RECUSA_ASSISTENCIA" },
                          { label: "Violência física", value: "VIOLENCIA_FISICA" },
                          { label: "Violência psicológica", value: "VIOLENCIA_PSICOLOGICA" },
                          { label: "Maus tratos e tratamento indigno dentro da unidade", value: "MAUS_TRATOS" },
                        ]}
                        values={form.formaViolencia}
                        onChange={(v) => setField("formaViolencia", v)}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                      />

                      <Select
                        label="Local da violência"
                        name="localViolencia"
                        options={[
                          { label: "Centro Socioeducativo de Semiliberdade Mártir Francisca", value: "MARTIR_FRANCISCA" },
                          { label: "Centro Socioeducativo Aldaci Barbosa Mota", value: "ALDACI_MOTA" },
                          { label: "Centro Socioeducativo Antônio Bezerra", value: "ANTONIO_BEZERRA" },
                          { label: "Centro Socioeducativo Cardeal Aloísio Lorscheider", value: "CARDEAL_LORSCHEIDER" },
                          { label: "Centro Socioeducativo Dom Bosco", value: "DOM_BOSCO" },
                          { label: "Centro Socioeducativo Patativa do Assaré", value: "PATATIVA_ASSARE" },
                          { label: "Centro Socioeducativo São Francisco", value: "SAO_FRANCISCO" },
                          { label: "Centro Socioeducativo São Miguel", value: "SAO_MIGUEL" },
                          { label: "Centro Socioeducativo do Canindezinho", value: "CANINDEZINHO" },
                          { label: "Centro Socioeducativo Passaré", value: "PASSARE" },
                          { label: "Unidade de Atendimento Inicial", value: "UAI" },
                          { label: "Unidade Socioeducativa do Interior do Estado", value: "INTERIOR" },
                        ]}
                        value={form.localViolencia}
                        onChange={(v) => setField("localViolencia", v)}
                      />

                      <Textarea
                        label="Descrição do tipo e da forma de violência"
                        name="descricaoViolencia"
                        value={form.descricaoViolencia}
                        onChange={(e) => setField("descricaoViolencia", e.target.value)}
                        placeholder="Descreva o ocorrido, destacando tipo e forma de violência observada..."
                      />

                      <Input
                        type="number"
                        label="Quantidade de incidentes no centro de internamento"
                        name="quantidadeIncidentes"
                        value={form.quantidadeIncidentes}
                        onChange={(e) => setField("quantidadeIncidentes", e.target.value)}
                        min={0}
                      />

                      <Alert variant="info" className="mt-4">
                        <p className="text-sm text-gray-700">
                          <strong>Encaminhamentos automáticos:</strong> será gerado documento de ciência com tipo e forma de violência
                          direcionado ao <strong>Ministério Público Criminal</strong>.  
                          Em casos envolvendo <strong>socioeducadores</strong>, também será encaminhado ao <strong>SEAS</strong> e à
                          <strong>CGD</strong> (investigação administrativa).
                        </p>
                      </Alert>
                    </div>
                  )}
                </div>

                {/* Botões de navegação */}
                {/* Botões */}
                <div className="mt-6 flex justify-between">
                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handlePrevious}
                  >
                    Anterior
                  </Button>

                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handleNext}
                  >
                    Próximo
                  </Button>
                </div>
              </FormWrapper>
)}

            {activeTab === "dados-de-ameaca" && (
              <FormWrapper title="Dados de Ameaça">
                {/* Possui ameaça */}
                <div className="mt-6">
                  <RadioGroup
                    label="Possui ameaça?"
                    name="possuiAmeaca"
                    options={SIM_NAO}
                    value={form.possuiAmeaca}
                    onChange={(v) => setField("possuiAmeaca", v)}
                  />
                </div>

                {/* Origem da ameaça */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Origem da ameaça
                  </h3>

                  {/* Facção de origem */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Facção de origem
                    </h4>
                    <CheckboxGroup
                      name="faccoesOrigem"
                      options={[
                        { label: "CV", value: "CV" },
                        { label: "GDE", value: "GDE" },
                        { label: "Massa", value: "MASSA" },
                        { label: "PCC", value: "PCC" },
                        { label: "Outras", value: "OUTRAS" },
                      ]}
                      values={form.faccoesOrigem}
                      onChange={(v) => setField("faccoesOrigem", v)}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                    />
                  </div>

                  {/* Facção rival */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Facção rival
                    </h4>
                    <CheckboxGroup
                      name="faccoesRivais"
                      options={[
                        { label: "CV", value: "CV" },
                        { label: "GDE", value: "GDE" },
                        { label: "Massa", value: "MASSA" },
                        { label: "PCC", value: "PCC" },
                        { label: "Outras", value: "OUTRAS" },
                      ]}
                      values={form.faccoesRivais}
                      onChange={(v) => setField("faccoesRivais", v)}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                    />
                  </div>

                  {/* Autoridade pública */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Autoridade pública
                    </h4>
                    <CheckboxGroup
                      name="autoridadesPublicas"
                      options={[
                        { label: "Policial civil", value: "POLICIAL_CIVIL" },
                        { label: "Policial militar", value: "POLICIAL_MILITAR" },
                        { label: "Socioeducador", value: "SOCIOEDUCADOR" },
                        { label: "Agente penitenciário", value: "AGENTE_PENITENCIARIO" },
                        { label: "Agente das forças armadas", value: "FORCAS_ARMADAS" },
                        { label: "Outras", value: "OUTRAS" },
                      ]}
                      values={form.autoridadesPublicas}
                      onChange={(v) => setField("autoridadesPublicas", v)}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                    />
                  </div>

                  {/* Familiar / Outros */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <CheckboxGroup
                      name="ameacaFamiliar"
                      options={[{ label: "Familiar", value: "FAMILIAR" }]}
                      values={form.ameacaFamiliar}
                      onChange={(v) => setField("ameacaFamiliar", v)}
                    />
                    <CheckboxGroup
                      name="ameacaOutros"
                      options={[{ label: "Outros", value: "OUTROS" }]}
                      values={form.ameacaOutros}
                      onChange={(v) => setField("ameacaOutros", v)}
                    />
                  </div>
                </div>

                {/* Tipo de ameaça */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tipo de ameaça
                  </h3>
                  <CheckboxGroup
                    name="tipoAmeaca"
                    options={[
                      { label: "Morte", value: "MORTE" },
                      { label: "Expulsão de território", value: "EXPULSAO_TERRITORIO" },
                      { label: "Condicionada ao pagamento de valor", value: "COND_PAGAMENTO" },
                      { label: "Condicionada à prática de novo ato", value: "COND_NOVO_ATO" },
                      { label: "Condicionada à perda de um bem", value: "COND_PERDA_BEM" },
                    ]}
                    values={form.tipoAmeaca}
                    onChange={(v) => setField("tipoAmeaca", v)}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  />
                </div>

                {/* Descritivo e encaminhamentos */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                  <Textarea
                    label="Descritivo da ameaça"
                    name="descricaoAmeaca"
                    value={form.descricaoAmeaca}
                    onChange={(e) => setField("descricaoAmeaca", e.target.value)}
                    placeholder="Descreva brevemente o contexto, a origem e o conteúdo da ameaça..."
                  />
                  <Textarea
                    label="Encaminhamentos"
                    name="encaminhamentosAmeaca"
                    value={form.encaminhamentosAmeaca}
                    onChange={(e) => setField("encaminhamentosAmeaca", e.target.value)}
                    placeholder="Informe encaminhamentos realizados, órgãos comunicados, medidas de proteção, etc."
                  />
                </div>

                {/* Voluntariedade e programas */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                  <RadioGroup
                    label="Voluntariedade"
                    name="voluntariedade"
                    options={SIM_NAO}
                    value={form.voluntariedade}
                    onChange={(v) => setField("voluntariedade", v)}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <RadioGroup
                      label="PPCAM (Programa de Proteção a Crianças e Adolescentes Ameaçados de Morte)"
                      name="ppcam"
                      options={SIM_NAO}
                      value={form.ppcam}
                      onChange={(v) => setField("ppcam", v)}
                    />
                    <RadioGroup
                      label="PPRO (Programa de Proteção a Pessoas Ameaçadas)"
                      name="ppro"
                      options={SIM_NAO}
                      value={form.ppro}
                      onChange={(v) => setField("ppro", v)}
                    />
                  </div>

                  <RadioGroup
                    label="Possui meios próprios convencionais?"
                    name="meiosPropriosConvencionais"
                    options={SIM_NAO}
                    value={form.meiosPropriosConvencionais}
                    onChange={(v) => setField("meiosPropriosConvencionais", v)}
                  />

                  <RadioGroup
                    label="Possui meios próprios ilícitos (outros meios)?"
                    name="meiosPropriosIlicitos"
                    options={SIM_NAO}
                    value={form.meiosPropriosIlicitos}
                    onChange={(v) => setField("meiosPropriosIlicitos", v)}
                  />
                </div>

                {/* Botões */}
                <div className="mt-6 flex justify-between">
                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handlePrevious}
                  >
                    Anterior
                  </Button>

                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handleNext}
                  >
                    Próximo
                  </Button>
                </div>
              </FormWrapper>
            )}

            {activeTab === "dados-de-atendimento" && (
              <FormWrapper title="Dados de Atendimento">
                {/* Descritivo do atendimento */}
                <div className="mt-6 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Descritivo do atendimento
                  </h3>

                  <Textarea
                    name="descricaoAtendimento"
                    value={form.descricaoAtendimento}
                    onChange={(e) => setField("descricaoAtendimento", e.target.value)}
                    placeholder="Descreva detalhadamente o atendimento, incluindo observações, contexto, orientações prestadas e encaminhamentos realizados..."
                    rows={6}
                  />
                </div>

                {/* Documentos em anexo */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Documentos em anexo
                  </h3>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <input
                      type="file"
                      name="documentosAnexos"
                      multiple
                      onChange={(e) => setField("documentosAnexos", e.target.files)}
                      className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 bg-white shadow-sm"
                    />

                    {form.documentosAnexos && form.documentosAnexos.length > 0 && (
                      <ul className="text-sm text-gray-600 list-disc ml-5">
                        {Array.from(form.documentosAnexos).map((file, i) => (
                          <li key={i}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Botões */}
                <div className="mt-6 flex justify-between">
                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handlePrevious}
                  >
                    Anterior
                  </Button>

                  <Button
                    className="!bg-[var(--greenLight)] !text-white transition-colors duration-300 hover:!bg-[var(--golden)]"
                    onClick={handleNext}
                  >
                    Próximo
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
