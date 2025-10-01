"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react";

import MenuDropdownUse from "./MenuDropdownUse";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode; // 👈 custom renderer
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  onAction?: (row: T) => void;
  pageSize?: number;
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  onAction,
  pageSize = 5,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // 🔹 Ordenação simples
  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA! < valB!) return sortOrder === "asc" ? -1 : 1;
    if (valA! > valB!) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // 🔹 Paginação
  const startIndex = (page - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        {/* Cabeçalho */}
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => handleSort(col.key)}
                className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer select-none"
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
            ))}
            {onAction && <th className="px-4 py-2">Ações</th>}
          </tr>
        </thead>

        {/* Corpo */}
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (onAction ? 1 : 0)}
                className="px-4 py-6 text-center text-gray-500"
              >
                Nenhum dado disponível
              </td>
            </tr>
          ) : (
            paginatedData.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2">
                    {col.render ? col.render(row) : String(row[col.key])}
                  </td>
                ))}
                {onAction && (
                  <td className="px-4 py-2 text-right">
                    <button
                      className="p-2 rounded-full hover:bg-gray-200 transition"
                      onClick={(e) => {
                        e.stopPropagation(); // 👈 evita disparar onRowClick
                        onAction(row);
                      }}
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600">
          <span>
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
