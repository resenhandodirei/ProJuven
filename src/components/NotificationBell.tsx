"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Notificações de exemplo (pode vir da API depois)
  const notifications = [
    {
      id: 1,
      title: "Novo prontuário adicionado",
      time: "há 5 minutos",
    },
    {
      id: 2,
      title: "Ficha de atendimento atualizada",
      time: "há 30 minutos",
    },
    {
      id: 3,
      title: "Lembrete: reunião às 15h",
      time: "há 1 hora",
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do sino */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-full hover:bg-gray-800 transition"
      >
        <Bell className="w-5 h-5 text-gray-200" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full px-1.5">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown de notificações */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-100 animate-fade-in z-50">
          <div className="p-3 border-b border-gray-200 font-semibold text-sm text-gray-700">
            Notificações
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              Nenhuma notificação no momento.
            </div>
          ) : (
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                >
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.time}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="p-2 text-center border-t border-gray-200">
            <button className="text-blue-600 text-sm hover:underline">
              Ver todas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
