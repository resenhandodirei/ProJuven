"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: number;
  title: string;
  time: string;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const notifications: Notification[] = [
    { id: 1, title: "Novo prontuário registrado", time: "há 5 min" },
    { id: 2, title: "Ficha atualizada com sucesso", time: "há 40 min" },
    { id: 3, title: "Lembrete: reunião às 14h", time: "há 2h" },
  ];

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Ícone do sino */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-semibold px-1.5 rounded-full shadow">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">
                Notificações
              </h3>
            </div>

            <ul className="max-h-60 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <li
                    key={n.id}
                    className="px-4 py-3 hover:bg-gray-50 transition flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="text-sm text-gray-800 font-medium">
                      {n.title}
                    </span>
                    <span className="text-xs text-gray-500">{n.time}</span>
                  </li>
                ))
              ) : (
                <li className="p-4 text-sm text-gray-500 text-center">
                  Nenhuma notificação no momento.
                </li>
              )}
            </ul>

            <div className="border-t border-gray-100 px-4 py-2 text-center">
              <button className="text-sm text-blue-600 hover:underline font-medium">
                Ver todas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
