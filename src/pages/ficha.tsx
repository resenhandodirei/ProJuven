import { useState } from "react";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Ficha() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ nome?: string; cpf?: string }>({});

  // Função para validar CPF segundo as regras da Receita Federal
  const validarCPF = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cleaned.length !== 11) return false;

    // Rejeita CPFs com todos os dígitos iguais
    if (/^(\d)\1{10}$/.test(cleaned)) return false;

    const digits = cleaned.split("").map(Number);

    // Validação do primeiro dígito verificador (J)
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i);
    let firstCheck = (sum * 10) % 11;
    if (firstCheck === 10) firstCheck = 0;

    if (firstCheck !== digits[9]) return false;

    // Validação do segundo dígito verificador (K)
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i);
    }
    let secondCheck = (sum * 10) % 11;
    if (secondCheck === 10) secondCheck = 0;

    return secondCheck === digits[10];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { nome?: string; cpf?: string } = {};
    setLoading(true);

    // Valida CPF
    if (!nome.trim()) newErrors.nome = "O nome é obrigatório.";
    if (!cpf.trim()) newErrors.cpf = "O CPF é obrigatório.";
    else if (!validarCPF(cpf)) newErrors.cpf = "CPF inválido.";

    setErrors(newErrors);

    // Se houver erros, não prossegue
    if (Object.keys(newErrors).length > 0) return;

    try {
    const response = await fetch("/api/ficha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        cpf,
        responsavel,
        dataNascimento,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Erro: ${error.message}`);
      setLoading(false);
      return;
    }

    alert("Ficha cadastrada com sucesso!");
    setNome("");
    setCpf("");
    setResponsavel("");
    setDataNascimento("");
  } catch (error) {
    alert("Erro ao conectar com o servidor");
  } finally {
    setLoading(false);
  }
};

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
    }, 2000);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newErrors: { nome?: string; cpf?: string } = {};

    if (!nome.trim()) newErrors.nome = "O nome é obrigatório.";
    if (!cpf.trim()) newErrors.cpf = "O CPF é obrigatório.";
    else if (!validarCPF(cpf)) newErrors.cpf = "CPF inválido.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    // Simula envio e reset
    setTimeout(() => {
      setLoading(false);
      setNome("");
      setCpf("");
      setResponsavel("");
      setDataNascimento("");
      alert("Ficha cadastrada (simulação)!");
    }, 2000);
  }

  return (
    <>
    

      <Navbar />
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
      <Footer />
    </>
  );
}
