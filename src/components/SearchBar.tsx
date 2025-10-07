"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import clsx from "clsx";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  showButton?: boolean;
  className?: string;
}

export default function SearchBar({
  placeholder = "Pesquisar...",
  onSearch,
  onClear,
  showButton = true,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "flex items-center w-full max-w-md rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm",
        "focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-150 ease-in-out",
        className
      )}
      role="search"
      aria-label="Campo de pesquisa"
    >
      <Search className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full border-none outline-none text-sm text-gray-700 placeholder-gray-400"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="ml-1 text-gray-400 hover:text-gray-600 transition"
          aria-label="Limpar pesquisa"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {showButton && (
        <button
          type="submit"
          className="ml-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 active:scale-[0.98] transition"
        >
          Buscar
        </button>
      )}
    </form>
  );
}
