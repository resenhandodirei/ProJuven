"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

interface Notification {
  id: number;
  message: string;
  time: string;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const notifications: Notification[] = [
    { id: 1, message: "Novo prontuário cadastrado.", time: "há 5 min" },
    { id: 2, message: "Ficha de atendimento atualizada.", time: "há 30 min" },
    { id: 3, message: "Lembrete: reunião às 14h.", time: "há 1h" },
  ];

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Botão do sino */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-[var(--golden)] transition focus:outline-none"
        aria-label="Abrir notificações"
      >
        <Bell className="w-5 h-5 text-white-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown de notificações */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">
              Notificações
            </h3>
          </div>

          <ul className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                >
                  <span>{n.message}</span>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                Nenhuma notificação.
              </li>
            )}
          </ul>

          <div className="p-2 border-t border-gray-100 text-center">
            <button className="text-sm text-blue-600 hover:underline font-medium">
              Ver todas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
