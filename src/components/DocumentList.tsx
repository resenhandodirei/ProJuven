"use client";

import React from "react";
import { FileText, MoreVertical } from "lucide-react";

interface Document {
  id: string | number;
  title: string;
  date: string;
  status?: "ativo" | "inativo" | "rascunho";
}

interface DocumentListProps {
  documents: Document[];
  onSelect?: (doc: Document) => void;
  onAction?: (doc: Document) => void;
  emptyMessage?: string;
}

export default function DocumentList({
  documents,
  onSelect,
  onAction,
  emptyMessage = "Nenhum documento encontrado.",
}: DocumentListProps) {
  if (!documents || documents.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 border rounded-lg bg-white shadow-sm">
      {documents.map((doc) => (
        <li
          key={doc.id}
          className="flex items-center justify-between p-4 hover:bg-gray-50 transition cursor-pointer"
          onClick={() => onSelect?.(doc)}
        >
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">{doc.title}</p>
              <p className="text-sm text-gray-500">{doc.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {doc.status && (
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  doc.status === "ativo"
                    ? "bg-green-100 text-green-700"
                    : doc.status === "inativo"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {doc.status}
              </span>
            )}

            {onAction && (
              <button
                className="p-2 rounded-full hover:bg-gray-200 transition"
                onClick={(e) => {
                  e.stopPropagation(); 
                  onAction(doc);
                }}
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
