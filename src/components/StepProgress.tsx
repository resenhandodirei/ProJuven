import React from "react";

interface StepProgressProps {
  steps: string[];
  currentStep: number; // índice baseado em 0
}

const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col items-start space-y-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
        Progresso
      </h3>

      <div className="w-full flex flex-col space-y-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex items-center space-x-3">
              {/* Círculo de progresso */}
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold 
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {/* Nome da etapa */}
              <span
                className={`text-sm ${
                  isActive
                    ? "font-semibold text-blue-600"
                    : isCompleted
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
