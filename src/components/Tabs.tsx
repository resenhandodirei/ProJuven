"use client";

import React, { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function Tabs({
  tabs,
  orientation = "horizontal",
  className = "",
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isVertical = orientation === "vertical";

  return (
    <div
      className={`flex ${
        isVertical ? "flex-row space-x-6" : "flex-col space-y-4"
      } ${className}`}
    >
      {/* Botões das abas */}
      <div
        className={`flex ${
          isVertical ? "flex-col space-y-2" : "flex-row space-x-2"
        }`}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
              activeIndex === index
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo da aba ativa */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-4">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}
