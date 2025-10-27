'use client';

import { useState } from 'react';

export default function NovaFichaPage() {
  const [form, setForm] = useState({ nome: '', descricao: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/fichas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(`Erro: ${err.error ? JSON.stringify(err.error) : res.statusText}`);
      return;
    }

    const fichaCriada = await res.json();
    // redirecione ou mostre sucesso
    alert('Ficha criada!');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        className="border rounded p-2 w-full"
        placeholder="Nome"
        value={form.nome}
        onChange={(e) => setForm((s) => ({ ...s, nome: e.target.value }))}
      />
      <textarea
        className="border rounded p-2 w-full"
        placeholder="Descrição (opcional)"
        value={form.descricao}
        onChange={(e) => setForm((s) => ({ ...s, descricao: e.target.value }))}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl px-4 py-2 border disabled:opacity-50"
      >
        {loading ? 'Criando…' : 'Criar ficha'}
      </button>
    </form>
  );
}
