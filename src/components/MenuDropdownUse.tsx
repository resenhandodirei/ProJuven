"use client";

import React, { useState } from "react";
import { MoreVertical, ChevronRight } from "lucide-react";

interface MenuItem {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
  children?: MenuItem[]; // ✅ Submenu
}

interface MenuDropdownUseProps {
  items: MenuItem[];
}

export default function MenuDropdownUse({ items }: MenuDropdownUseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuIndex, setSubmenuIndex] = useState<number | null>(null);

  return (
    <div className="relative inline-block text-left">
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded hover:bg-gray-100 transition"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
          <ul className="py-1">
            {items.map((item, index) => (
              <li
                key={index}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                  item.danger ? "text-red-600 font-medium" : "text-gray-700"
                }`}
                onClick={() => {
                  if (!item.children) {
                    item.onClick?.();
                    setIsOpen(false);
                  }
                }}
                onMouseEnter={() =>
                  item.children ? setSubmenuIndex(index) : setSubmenuIndex(null)
                }
                onMouseLeave={() =>
                  submenuIndex === index && setSubmenuIndex(null)
                }
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>

                {/* Atalho */}
                {item.shortcut && (
                  <span className="text-xs text-gray-400">{item.shortcut}</span>
                )}

                {/* Indicador de submenu */}
                {item.children && <ChevronRight className="w-4 h-4 text-gray-400" />}

                {/* Submenu */}
                {item.children && submenuIndex === index && (
                  <div className="absolute top-0 left-full ml-1 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <ul className="py-1">
                      {item.children.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            subItem.onClick?.();
                            setIsOpen(false);
                          }}
                        >
                          {subItem.icon && (
                            <span className="mr-2">{subItem.icon}</span>
                          )}
                          {subItem.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
