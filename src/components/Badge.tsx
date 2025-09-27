"use client";

import React from "react";
import clsx from "clsx";

interface BadgeProps {
  label: string;
  type?: "success" | "error" | "warning" | "info" | "default";
  className?: string;
}

export default function Badge({ label, type = "default", className }: BadgeProps) {
  const baseStyle =
    "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full shadow-sm";

  const typeStyles: Record<typeof type, string> = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={clsx(baseStyle, typeStyles[type], className)}>
      {label}
    </span>
  );
}
