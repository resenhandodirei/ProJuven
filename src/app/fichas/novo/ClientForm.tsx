'use client';

import { useState } from 'react';
import { criarFicha } from '../../../lib/api/fichas';

export default function ClientForm() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      await criarFicha({
        nomeAtendido: String(form.get('nomeAtendido') || ''),
        cpf: String(form.get('cpf') || ''),
        numeroProcesso: String(form.get('numeroProcesso') || ''),
        nomeResponsavel: String(form.get('nomeResponsavel') || ''),
        dataNascimento: String(form.get('dataNascimento') || ''), // yyyy-mm-dd
      });
      // redirecionar ou limpar form
      e.currentTarget.reset();
      alert('Ficha criada!');
    } catch (err: any) {
      setErro(err?.message || 'Erro ao criar ficha');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input name="nomeAtendido" placeholder="Nome do atendido" required />
      <input name="cpf" placeholder="CPF" required />
      <input name="numeroProcesso" placeholder="Número do processo" required />
      <input name="nomeResponsavel" placeholder="Nome do responsável" required />
      <input name="dataNascimento" type="date" required />
      <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Criar ficha'}</button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
  );
}
