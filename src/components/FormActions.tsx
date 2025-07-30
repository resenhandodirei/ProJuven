import React from "react";
import TailwindJS from "./tailwindjs";

interface FormActionsProps {
  onSave?: () => void;
  onCancel?: () => void;
  onBack?: () => void;
  isLoading?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onSave,
  onCancel,
  onBack,
  isLoading = false,
}) => {
  return (
    <>
    <TailwindJS />
    <div className="flex justify-end gap-4 mt-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
        >
          Voltar
        </button>
      )}

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
        >
          Cancelar
        </button>
      )}

      {onSave && (
        <button
          type="button"
          onClick={onSave}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg font-medium text-white transition ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </button>
      )}
    </div>
    </>
  );
};

export default FormActions;
