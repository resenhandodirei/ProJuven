"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

interface CardFeedbackProps {
  type?: "success" | "error" | "info" | "warning";
  message: string;
  onClose?: () => void;
}

export function CardFeedback({ type = "info", message, onClose }: CardFeedbackProps) {
  const typeStyles = {
    success: {
      icon: <CheckCircle className="text-green-600 w-6 h-6" />,
      bg: "bg-green-50",
      border: "border-green-400",
      text: "text-green-800",
    },
    error: {
      icon: <XCircle className="text-red-600 w-6 h-6" />,
      bg: "bg-red-50",
      border: "border-red-400",
      text: "text-red-800",
    },
    info: {
      icon: <Info className="text-blue-600 w-6 h-6" />,
      bg: "bg-blue-50",
      border: "border-blue-400",
      text: "text-blue-800",
    },
    warning: {
      icon: <AlertTriangle className="text-yellow-600 w-6 h-6" />,
      bg: "bg-yellow-50",
      border: "border-yellow-400",
      text: "text-yellow-800",
    },
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className={`flex items-center gap-3 border-l-4 ${typeStyles.bg} ${typeStyles.border} ${typeStyles.text} p-4 rounded-xl shadow-sm`}
    >
      {typeStyles.icon}
      <div className="flex-1 text-sm font-medium">{message}</div>

      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 text-gray-500 hover:text-gray-700 transition"
          aria-label="Fechar"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}
