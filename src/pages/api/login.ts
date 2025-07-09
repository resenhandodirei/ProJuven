import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, senha } = req.body;

  console.log('Dados recebidos:', { email, senha });

  const user = await prisma.login.findUnique({ where: { email } });
  if (!user) {
    console.log('Usuário não encontrado:');
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  console.log('Usuário encontrado:', {
    id: user.id,
    email: user.email,
    senhaDoBanco: user.senha
  })

  const isPasswordValid = await bcrypt.compare(senha, user.senha);

  console.log('🔍 Teste direto do bcrypt.compare:', {
  testeManual: await bcrypt.compare('123456', user.senha),
  senhaDigitada: senha,
  senhaNoBanco: user.senha,
  resultado: isPasswordValid
  });


  if (!isPasswordValid) {
    console.log('Senha incorreta');
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
