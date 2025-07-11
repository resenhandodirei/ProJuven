// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();

    if (!email || !senha) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 });
    }

    const user = await prisma.login.findUnique({ where: { email } });

    if (!user || !user.senha) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 401 });
    }

    const isSenhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!isSenhaCorreta) {
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, tipo: user['tipo de perfil'] },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
