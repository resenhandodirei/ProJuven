import { NextApiRequest, NextApiResponse } from "next";

// Simulação de banco em memória
let fichas: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nome, cpf, responsavel, dataNascimento } = req.body;

    // Validação básica no backend
    if (!nome || !cpf) {
      return res.status(400).json({ message: "Nome e CPF são obrigatórios." });
    }

    // Cria a ficha
    const novaFicha = {
      id: fichas.length + 1,
      nome,
      cpf,
      responsavel: responsavel || "",
      dataNascimento: dataNascimento || "",
      id_usuario_criador: 1, // Mock
      id_tipo_de_usuario: 1, // Mock
      createdAt: new Date(),
    };

    fichas.push(novaFicha);

    return res.status(201).json(novaFicha);
  }

  if (req.method === "GET") {
    return res.status(200).json(fichas);
  }

  return res.status(405).json({ message: "Método não permitido" });
}
