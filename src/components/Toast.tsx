"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number; // em ms
  onClose: () => void;
}

export default function Toast({ message, type = "info", duration = 3000, onClose }: ToastProps) {
  // Fecha automaticamente após `duration`
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-600 text-white";
      case "error":
        return "bg-red-600 text-white";
      default:
        return "bg-blue-600 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${getStyle()} animate-fadeIn`}
    >
      {getIcon()}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
