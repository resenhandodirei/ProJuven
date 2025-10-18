"use client";

import { useState } from "react";
import { Popover } from "@headlessui/react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

interface InputDateProps {
  label: string;
  name: string;
  value?: string;
  onChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}

const InputDate: React.FC<InputDateProps> = ({
  label,
  name,
  value,
  onChange,
  minDate,
  maxDate,
}) => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(value || "");
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const daysInMonth = currentMonth.daysInMonth();
  const firstDayIndex = startOfMonth.day();
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    onChange(date);
  };

  const isDisabled = (date: string) => {
    if (minDate && dayjs(date).isBefore(dayjs(minDate))) return true;
    if (maxDate && dayjs(date).isAfter(dayjs(maxDate))) return true;
    return false;
  };

  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(currentMonth.date(i));
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Popover className="relative">
        <Popover.Button className="w-full flex justify-between items-center border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {selectedDate ? dayjs(selectedDate).format("DD/MM/YYYY") : "Selecione a data"}
          <CalendarIcon className="h-5 w-5 text-gray-400" />
        </Popover.Button>

        <AnimatePresence>
          <Popover.Panel
            static
            className="absolute z-10 mt-2 w-72 rounded-lg bg-white dark:bg-gray-900 shadow-lg p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Cabeçalho do calendário */}
              <div className="flex justify-between items-center mb-3">
                <button onClick={prevMonth}>
                  <ChevronLeftIcon className="h-5 w-5 text-gray-500 hover:text-blue-500" />
                </button>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {currentMonth.format("MMMM YYYY")}
                </h3>
                <button onClick={nextMonth}>
                  <ChevronRightIcon className="h-5 w-5 text-gray-500 hover:text-blue-500" />
                </button>
              </div>

              {/* Dias da semana */}
              <div className="grid grid-cols-7 text-xs font-semibold text-gray-500 mb-2">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
                  <div key={d} className="text-center">
                    {d}
                  </div>
                ))}
              </div>

              {/* Dias do mês */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {calendarDays.map((date, index) => {
                  if (!date) return <div key={index}></div>;

                  const dateStr = date.format("YYYY-MM-DD");
                  const isSelected = selectedDate === dateStr;
                  const disabled = isDisabled(dateStr);

                  return (
                    <button
                      key={dateStr}
                      disabled={disabled}
                      onClick={() => handleSelectDate(dateStr)}
                      className={`p-2 rounded-lg text-sm transition 
                        ${disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-blue-100"} 
                        ${isSelected ? "bg-blue-500 text-white" : ""}`}
                    >
                      {date.date()}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </Popover.Panel>
        </AnimatePresence>
      </Popover>
    </div>
  );
};

export default InputDate;
