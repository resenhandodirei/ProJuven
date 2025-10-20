"use client";

import React from "react";
import { FileSearch } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title = "Nada encontrado",
  description = "Não há registros disponíveis no momento.",
  actionLabel,
  onAction,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 rounded-lg border border-gray-200 bg-gray-50 shadow-sm ${className}`}
    >
      <div className="mb-3 text-gray-500">
        {icon || <FileSearch className="w-12 h-12" />}
      </div>
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-md bg-[var(--greenLight)] text-white text-sm font-medium hover:bg-[var(--golden)] transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
