// pages/api/register.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: { method: string; body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; user?: { id: any; email: any; }; }): any; new(): any; }; }; }) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método não permitido' });

  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'Usuário já existe' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return res.status(201).json({ message: 'Usuário criado com sucesso', user: { id: user.id, email: user.email } });
}
