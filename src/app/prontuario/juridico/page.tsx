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
  const [nomeCompleto, setNomeCompleto] = useState("");

  return (
    <>
      <Navbar />

      <div className="p-8">
      <Tabs
        orientation="vertical"
        tabs={[
          {
            label: "Dados Pessoais",
            content: (
              <div>
                <p>Campos de dados pessoais aqui...</p>
              </div>
            ),
          },
          {
            label: "Dados do Ato Infracional",
            content: (
              <div>
                <p>Campos de dados do ato infracional...</p>
              </div>
            ),
          },
          {
            label: "Dados sociodemográficos",
            content: (
              <div>
                <p>Campos de sociodemográficos aqui...</p>
              </div>
            ),
          },
          {
            label: "Dados de saúde mental",
            content: (
              <div>
                <p>Campos de atendimentos aqui...</p>
              </div>
            ),
          },
          {
            label: "Dados de internação",
            content: (
              <div>
                <p>Campos de atendimentos aqui...</p>
              </div>
            ),
          },
          {
            label: "Dados de ameaça",
            content: (
              <div>
                <p>Campos de atendimentos aqui...</p>
              </div>
            ),
          },
        ]}
      />
    </div>

      <Footer />
    </>
  );
}
