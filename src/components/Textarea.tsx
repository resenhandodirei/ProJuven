import React, { useState } from "react";
import Textarea from "@/components/Textarea";

export default function ExampleTextareaPage() {
  const [descricao, setDescricao] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Descrição do Caso</h1>

      <Textarea
        label="Descreva o caso"
        name="descricao"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Digite os detalhes aqui..."
        required
      />

      <p className="mt-4">Texto digitado: {descricao}</p>
    </div>
  );
}
