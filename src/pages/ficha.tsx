import { useState } from "react";
import React from "react";
import TailwindJS from "@/components/tailwindjs";

export default function Ficha() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Por enquanto, só mostra no console. Depois integraremos com a API.
    console.log({
      nome,
      cpf,
      responsavel,
      dataNascimento,
    });

    // Reset após salvar
    setTimeout(() => {
      setLoading(false);
      setNome("");
      setCpf("");
      setResponsavel("");
      setDataNascimento("");
      alert("Ficha cadastrada (simulação)!");
    }, 1000);
  };

  return (
    <>
      <TailwindJS />
      <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Ficha</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do atendido"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Nome do Responsável"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </>
  );
}
