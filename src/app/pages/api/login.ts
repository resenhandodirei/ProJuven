import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, senha } = req.body;

  const user = await prisma.login.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  const isPasswordValid = await bcrypt.compare(senha, user.senha);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return res.status(200).json({
    message: 'Login bem-sucedido',
    token,
    user: { id: user.id, email: user.email }
  });
}
