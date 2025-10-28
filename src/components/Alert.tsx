"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import React from "react";
import "@/styles/globals.css";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message?: string; 
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode; 
}

interface SubcomponentProps {
  children: React.ReactNode;
  className?: string;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-600" />,
  error: <XCircle className="w-5 h-5 text-red-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
  info: <Info className="w-5 h-5 text-blue-600" />,
};

const bgColors = {
  success: "bg-green-50 border-green-400",
  error: "bg-red-50 border-red-400",
  warning: "bg-yellow-50 border-yellow-400",
  info: "bg-blue-50 border-blue-400",
};

export const AlertTitle: React.FC<SubcomponentProps> = ({ children, className = "" }) => (
  <h4 className={`text-sm font-semibold text-gray-900 ${className}`}>{children}</h4>
);

export const AlertDescription: React.FC<SubcomponentProps> = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-700 mt-1 ${className}`}>{children}</p>
);

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  message,
  onClose,
  className = "",
  children,
}) => {
  return (
    <AnimatePresence>
      {(message || children) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className={`flex items-start gap-3 p-4 rounded-lg border ${bgColors[type]} shadow-sm ${className}`}
        >
          <div className="mt-0.5">{icons[type]}</div>

          <div className="flex-1">
            {/* Compatibilidade com uso anterior (message direto) */}
            {message && <p className="text-sm text-gray-800">{message}</p>}

            {/* Novo formato — conteúdo via children */}
            {children}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
