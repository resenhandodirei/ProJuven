"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/Button";
import { Card } from "@/components/Cards";
import "@/styles/globals.css";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

type Feriado = {
  date: string;
  name: string;
  type: string;
};

type Evento = {
  id: string;
  title: string;
  description?: string;
  date: string; // yyyy-mm-dd
  type?: string;
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

export default function CalendarioPage() {
  const today = new Date();
  const [viewDate, setViewDate] = useState<Date>(startOfMonth(today));
  const [feriadosAno, setFeriadosAno] = useState<Record<string, Feriado[]>>({});
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState<Evento | null>(null);
  const [newEvent, setNewEvent] = useState<{ title: string; date: string; description: string }>({
    title: "",
    date: formatDate(today),
    description: "",
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // === carregar eventos do localStorage ===
  useEffect(() => {
    const saved = localStorage.getItem("projuven_eventos");
    if (saved) setEventos(JSON.parse(saved));
  }, []);

  // salvar eventos no localStorage
  useEffect(() => {
    localStorage.setItem("projuven_eventos", JSON.stringify(eventos));
  }, [eventos]);

  // === buscar feriados da BrasilAPI ===
  useEffect(() => {
    async function fetchFeriados() {
      if (feriadosAno[year]) return;
      try {
        const res = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);
        const data = await res.json();
        const list: Feriado[] = data.map((f: any) => ({
          date: f.date,
          name: f.name,
          type: f.type || "Nacional",
        }));
        setFeriadosAno((prev) => ({ ...prev, [year]: list }));
      } catch {
        console.error("Erro ao buscar feriados");
      }
    }
    fetchFeriados();
  }, [year]);

  const monthFeriados = useMemo(() => {
    const list = feriadosAno[year] || [];
    return list.filter((f) => new Date(f.date).getMonth() === month);
  }, [feriadosAno, year, month]);

  const monthEventos = useMemo(
    () => eventos.filter((e) => new Date(e.date).getMonth() === month && new Date(e.date).getFullYear() === year),
    [eventos, month, year]
  );

  // === montar grid do calendário ===
  const calendarGrid = useMemo(() => {
    const first = startOfMonth(viewDate);
    const last = endOfMonth(viewDate);
    const startWeekday = first.getDay();
    const daysInMonth = last.getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return weeks;
  }, [viewDate, year, month]);

  const gotoPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const gotoNextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const gotoToday = () => setViewDate(startOfMonth(today));

  const handleAddOrEditEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    if (editEvent) {
      // Atualizar evento existente
      setEventos((prev) =>
        prev.map((e) =>
          e.id === editEvent.id ? { ...e, title: newEvent.title, description: newEvent.description, date: newEvent.date } : e
        )
      );
    } else {
      // Adicionar novo
      setEventos((prev) => [
        ...prev,
        { id: String(Date.now()), title: newEvent.title, date: newEvent.date, description: newEvent.description, type: "Institucional" },
      ]);
    }

    setShowModal(false);
    setEditEvent(null);
    setNewEvent({ title: "", date: formatDate(today), description: "" });
  };

  const handleEditClick = (evento: Evento) => {
    setEditEvent(evento);
    setNewEvent({ title: evento.title, date: evento.date, description: evento.description || "" });
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      setEventos((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const isSameDay = (a?: Date | null, b?: Date | null) =>
    !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
        <div className="w-full max-w-7xl space-y-8"> {/* 🔹 ligeiramente maior */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-[var(--greenLight)] text-3xl" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Calendário Institucional</h1>
                <p className="text-sm text-gray-600">Eventos internos e feriados oficiais</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={gotoPrevMonth}> <FaChevronLeft /> </Button>
              <Button onClick={gotoToday}>Hoje</Button>
              <Button onClick={gotoNextMonth}> <FaChevronRight /> </Button>
              <Button onClick={() => setShowModal(true)} className="bg-[var(--greenLight)] text-white flex items-center gap-2 px-4">
                <FaPlus /> Novo Evento
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendário */}
            <Card className="p-6 bg-white rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 capitalize">
                {viewDate.toLocaleString("pt-BR", { month: "long", year: "numeric" })}
              </h2>

              <table className="w-full mt-2 table-fixed text-sm">
                <thead>
                  <tr className="text-xs text-gray-500">
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
                      <th key={d} className="py-2">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calendarGrid.map((week, wi) => (
                    <tr key={wi}>
                      {week.map((day, di) => {
                        if (!day)
                          return <td key={di} className="border h-16 bg-gray-50"></td>;

                        const feriado = monthFeriados.find((f) => isSameDay(new Date(f.date), day));
                        const evento = monthEventos.find((e) => isSameDay(new Date(e.date), day));

                        return (
                          <td key={di} className="border h-20 align-top p-1">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="text-gray-700">{day.getDate()}</span>
                              {feriado && <span className="text-red-600 font-bold">F</span>}
                              {evento && <span className="text-[var(--greenLight)] font-bold">E</span>}
                            </div>
                            {feriado && <div className="text-[10px] text-red-600 truncate">{feriado.name}</div>}
                            {evento && <div className="text-[10px] text-[var(--greenLight)] truncate">{evento.title}</div>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Lista de eventos */}
            <Card className="p-6 bg-white rounded-2xl shadow-sm md:col-span-2">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Eventos — {viewDate.toLocaleString("pt-BR", { month: "long" })}
              </h2>

              {monthEventos.length === 0 && monthFeriados.length === 0 ? (
                <p className="text-gray-600 text-sm">Nenhum evento ou feriado neste mês.</p>
              ) : (
                <ul className="space-y-3">
                  {monthFeriados.map((f, i) => (
                    <li key={`f-${i}`} className="p-3 border rounded-lg text-red-700 bg-red-50">
                      <strong>{f.name}</strong> — {new Date(f.date).toLocaleDateString("pt-BR")}
                    </li>
                  ))}
                  {monthEventos.map((e) => (
                    <li key={e.id} className="p-3 border rounded-lg bg-green-50 text-[var(--greenLight)] flex justify-between items-start">
                      <div>
                        <strong>{e.title}</strong> — {new Date(e.date).toLocaleDateString("pt-BR")}
                        {e.description && <p className="text-xs text-gray-600 mt-1">{e.description}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleEditClick(e)}><FaEdit /></Button>
                        <Button variant="outline" onClick={() => handleDeleteClick(e.id)}><FaTrash /></Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>

        {/* MODAL NOVO/EDITAR EVENTO */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editEvent ? "Editar Evento" : "Adicionar Novo Evento"}
              </h2>

              <label className="block text-sm text-gray-700 mb-1">Título</label>
              <input
                className="w-full border rounded-lg p-2 mb-3"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Título do evento"
              />

              <label className="block text-sm text-gray-700 mb-1">Data</label>
              <input
                type="date"
                className="w-full border rounded-lg p-2 mb-3"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />

              <label className="block text-sm text-gray-700 mb-1">Descrição</label>
              <textarea
                className="w-full border rounded-lg p-2 mb-4"
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <Button onClick={() => { setShowModal(false); setEditEvent(null); }} className="bg-red-500 px-4 py-2 rounded-lg">
                  Cancelar
                </Button>
                <Button onClick={handleAddOrEditEvent} className="bg-[var(--greenLight)] text-white px-4 py-2 rounded-lg">
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
