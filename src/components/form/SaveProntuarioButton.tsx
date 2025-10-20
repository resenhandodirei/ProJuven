"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import Toast from "@/components/Toast";
import LoadingSpinner from "@/components/LoadingSpinner";

interface SaveProntuarioButtonProps {
  form: any;
}

export default function SaveProntuarioButton({ form }: SaveProntuarioButtonProps) {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({
    message: "",
    type: null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!form.nomeJovem?.trim()) {
        setToast({
          message: "Por favor, preencha o nome do jovem atendido antes de salvar.",
          type: "error",
        });
        return;
      }

      setLoading(true);
      console.log("📤 Enviando prontuário simulado...", form);

      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setToast({ message: "✅ Prontuário salvo com sucesso!", type: "success" });
    } catch {
      setToast({ message: "❌ Erro ao salvar prontuário. Tente novamente.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ message: "", type: null }), 4000);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <Button
        disabled={loading}
        onClick={handleSubmit}
        className={`bg-[var(--greenLight)] text-white w-80 py-3 rounded-xl font-semibold 
          transition-all duration-300 shadow-md flex items-center justify-center gap-2
          ${loading ? "opacity-80 cursor-not-allowed" : "hover:bg-[var(--golden)] hover:scale-105"}`}
      >
        {loading ? <LoadingSpinner size="sm" /> : "Salvar Prontuário"}
      </Button>

      {toast.type && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast type={toast.type} message={toast.message} />
        </div>
      )}
    </div>
  );
}
