"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  ChartNoAxesCombined,
} from "lucide-react";
import { motion } from "framer-motion";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  subMenu?: SubMenuItem[];
  onClick?: () => void;
}

const menuItems: MenuItem[] = [
  { label: "Início", icon: <Home size={20} />, href: "/" },
  { label: "Documentos", icon: <FileText size={20} />, href: "/documentos" },
  {
    label: "Dashboard",
    icon: <ChartNoAxesCombined size={20} />,
    subMenu: [
      { label: "Geral", href: "/dashboard/geral" },
      { label: "Atendimento primário", href: "/dashboard/perfil" },
      { label: "Atendimento nos centros de internamento", href: "/dashboard/centro-internamento" },
      { label: "Atendimento presencial", href: "/dashboard/presencial" },
      { label: "Atendimento remoto", href: "/dashboard/remoto" },
      { label: "Produtividade", href: "/dashboard/produtividade" },
    ],
  },
  { label: "Sair", icon: <LogOut size={20} />, onClick: () => alert("Saindo...") },
];

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSubMenu = (label: string) => {
    setExpanded(expanded === label ? null : label);
  };

  return (
    <div className="flex">
      {/* Botão Mobile */}
      <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ width: 0 }}
        animate={{ width: isOpen ? 240 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[var(--greenDark)] text-white h-screen hidden md:flex flex-col shadow-lg overflow-hidden"
      >
    

        <nav className="flex flex-col flex-grow p-2 h-full">
          {menuItems.map((item, i) => {
            const isActive = pathname === item.href;
            const isExpanded = expanded === item.label;

            if (item.subMenu) {
              return (
                <div key={i} className="flex flex-col">
                  <button
                    onClick={() => toggleSubMenu(item.label)}
                    className={`flex items-center justify-between p-3 rounded-lg transition ${
                      isExpanded ? "bg-[var(--greenLight)]" : "hover:bg-[var(--golden)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>

                  {/* Submenu animado */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 flex flex-col gap-1"
                    >
                      {item.subMenu.map((sub, j) => (
                        <Link
                          key={j}
                          href={sub.href}
                          className={`p-2 rounded-lg text-sm transition ${
                            pathname === sub.href
                              ? "bg-[var(--greenLight)] font-semibold"
                              : "hover:bg-[var(--golden)"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            }

            if (item.href) {
              return (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive ? "bg-[var(--greenLight)] font-semibold" : "hover:bg-[var(--golden)]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={i}
                onClick={item.onClick}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--golden)] transition text-left"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </motion.aside>
    </div>
  );
}
