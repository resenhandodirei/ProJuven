"use client";

import React from "react";
import clsx from "clsx";
import { CheckCircle, XCircle, AlertTriangle, Info, Circle } from "lucide-react";

interface BadgeProps {
  label: string;
  type?: "success" | "error" | "warning" | "info" | "default";
  className?: string;
}

export default function Badge({ label, type = "default", className }: BadgeProps) {
  const baseStyle =
    "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full shadow-sm";

  const typeStyles: Record<string, string> = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  const icons: Record<string, JSX.Element> = {
    default: <Circle className="w-3 h-3" />,
    success: <CheckCircle className="w-3 h-3" />,
    error: <XCircle className="w-3 h-3" />,
    warning: <AlertTriangle className="w-3 h-3" />,
    info: <Info className="w-3 h-3" />,
  };

  return (
    <span className={clsx(baseStyle, typeStyles[type], className)}>
      {icons[type]}
      {label}
    </span>
  );
}
