import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; 

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    if (!decoded?.id) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // Busca o usuário no banco
    const user = await prisma.login.findUnique({
      where: { id: decoded.id },
      select: { id: true, nome: true, email: true, tipoDePerfil: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      perfil: user.tipoDePerfil,
    });
  } catch (err) {
    console.error("Erro em /api/me:", err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
