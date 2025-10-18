"use client";

import React, { useState } from "react";
import "../../../styles/globals.css";

import Navbar from "@/components/navbar";
import Badge from "@/components/Badge";
import { Button } from "@/components/Button";
import { Input } from "@/components/form/Input";
import InputText from "@/components/form/InputText";
import InputDate from "@/components/form/InputDate";
import InputSelect from "@/components/form/InputSelect";
import Textarea from "@/components/form/Textarea";
import RadioGroup from "@/components/form/RadioGroup";
import CheckboxGroup from "@/components/form/CheckboxGroup";
import InputFileUpload from "@/components/form/InputFileUpload";
import LoadingSpinner from "@/components/LoadingSpinner";
import Alert from "@/components/Alert";
import FormActions from "@/components/form/FormActions";
import FormWrapper from "@/components/form/FormWrapper";
import DataTable from "@/components/DataTable";
import DocumentList from "@/components/DocumentList";
import EmptyState from "@/components/EmptyState";
import Modal from "@/components/Modal";
import Tabs from "@/components/Tabs";
import Toast from "@/components/Toast";
import UserMenu from "@/components/UserMenu";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/footer";

import { FaSave } from 'react-icons/fa';

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { ChevronLeft } from "lucide-react";

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
    numeroProcesso: "",
    qtdProcessos: "",
    varaProcesso: "",
  });

  const setField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4 flex">
        {/* --- Tabs verticais --- */}
        <div className="w-64 border-r border-gray-200 pr-4">
          <Tabs
            orientation="vertical"
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { label: "Dados Pessoais", value: "dados-pessoais" },
              { label: "Dados Jurídicos", value: "dados-juridicos" },
              { label: "Documentos", value: "documentos" },
              { label: "Atendimentos", value: "atendimentos" },
            ]}
          />
        </div>

        {/* --- Conteúdo do tab selecionado --- */}
        <div className="flex-1 pl-8">
          {activeTab === "dados-pessoais" && (
            <FormWrapper title="Dados Pessoais">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputText
                  id="nomeJovem"
                  label="Nome do jovem atendido"
                  value={form.nomeJovem}
                  onChange={(e) => setField("nomeJovem", e.target.value)}
                  required
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

                <Input
                  id="telResp11"
                  label="Telefone responsável 1.1"
                  type="tel"
                  value={form.telResp11}
                  onChange={(e) => setField("telResp11", e.target.value)}
                />

                <Input
                  id="telResp12"
                  label="Telefone responsável 1.2"
                  type="tel"
                  value={form.telResp12}
                  onChange={(e) => setField("telResp12", e.target.value)}
                />

                <Input
                  id="telResp21"
                  label="Telefone responsável 2.1"
                  type="tel"
                  value={form.telResp21}
                  onChange={(e) => setField("telResp21", e.target.value)}
                />

                <Input
                  id="telResp22"
                  label="Telefone responsável 2.2"
                  type="tel"
                  value={form.telResp22}
                  onChange={(e) => setField("telResp22", e.target.value)}
                />

                <InputText
                  id="numeroProcesso"
                  label="Número do processo"
                  value={form.numeroProcesso}
                  onChange={(e) => setField("numeroProcesso", e.target.value)}
                  required
                />

                <Input
                  id="qtdProcessos"
                  label="Quantidade de processos"
                  type="number"
                  value={form.qtdProcessos}
                  onChange={(e) => setField("qtdProcessos", e.target.value)}
                />

                <InputSelect
                  id="varaProcesso"
                  label="Vara do processo"
                  options={[
                    { label: "1ª Vara", value: "VARA_1" },
                    { label: "2ª Vara", value: "VARA_2" },
                    { label: "3ª Vara", value: "VARA_3" },
                  ]}
                  value={form.varaProcesso}
                  onChange={(v) => setField("varaProcesso", v)}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button>Salvar Dados</Button>
              </div>
            </FormWrapper>
          )}

          {activeTab === "dados-juridicos" && (
            <Alert type="info" message="Formulário de Dados Jurídicos em desenvolvimento." />
          )}

          {activeTab === "documentos" && (
            <Alert type="info" message="Envio de documentos será adicionado aqui." />
          )}

          {activeTab === "atendimentos" && (
            <Alert type="info" message="Sessão de atendimentos será configurada em breve." />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
