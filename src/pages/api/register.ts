import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, senha, nome, tipo_de_perfil } = req.body;

  if (!email || !senha || !nome || !tipo_de_perfil) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const existingUser = await prisma.login.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await prisma.login.create({
      data: { email, senha: hashedPassword, nome, tipo_de_perfil },
    });

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: { id: user.id, email: user.email }
    });

  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
