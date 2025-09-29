"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "Pesquisar...",
  onSearch,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center w-full max-w-md rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 ${className}`}
    >
      <Search className="h-5 w-5 text-gray-500 mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full border-none outline-none text-sm text-gray-700"
      />
      <button
        type="submit"
        className="ml-2 rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 transition"
      >
        Buscar
      </button>
    </form>
  );
}
