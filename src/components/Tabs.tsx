"use client";

import React from "react";

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  orientation = "horizontal",
  className = "",
}: TabsProps) {
  return (
    <div
      className={`flex ${
        orientation === "vertical" ? "flex-col w-full" : "flex-row"
      } ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-150 rounded-lg
              ${
                isActive
                  ? "bg-[var(--greenLight)] text-white shadow-md"
                  : "text-gray-600 hover:bg-[var(--golden)]"
              }
              ${orientation === "vertical" ? "w-full text-left mb-2" : "mx-1"}
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
