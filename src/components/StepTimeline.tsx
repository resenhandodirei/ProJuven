import React from "react";
import { motion } from "framer-motion";

interface StepTimelineProps {
  steps: string[];
  currentStep: number; // índice baseado em 0
}

const StepTimeline: React.FC<StepTimelineProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex flex-col items-center py-6">
      {/* Linha de fundo */}
      <div className="relative w-full max-w-4xl">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -translate-y-1/2" />

        {/* Linha de progresso animada */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-[var(--greenLight)] rounded-full -translate-y-1/2"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4 }}
        />

        {/* Círculos de etapas */}
        <div className="flex justify-between items-center relative z-10">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={index} className="flex flex-col items-center w-24 text-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                    ${
                      isActive
                        ? "bg-[var(--greenLight)] border-[var(--golden)] text-white"
                        : isCompleted
                        ? "bg-blue-100 border-[var(--golden)] text-[var(--golden)]"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    isActive
                      ? "text-[var(--greenLight)] font-semibold"
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
    </div>
  );
};

export default StepTimeline;
