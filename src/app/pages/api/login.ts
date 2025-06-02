// pages/api/login.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: { method: string; body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; user?: { id: any; email: any; }; }): any; new(): any; }; }; }) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método não permitido' });

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Senha incorreta' });

  return res.status(200).json({ message: 'Login bem-sucedido', user: { id: user.id, email: user.email } });
}
