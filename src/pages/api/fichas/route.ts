import { NextResponse } from 'next/server';
import { getUserFromAuth } from '../../../lib/auth';
import { prisma } from '../../../lib/db';
import { fichaSchema } from '../../../lib/schemas';

export async function POST(req: Request) {
  const user = await getUserFromAuth();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'payload inválido' }, { status: 400 });

  const parsed = fichaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;

  // converte dataNascimento para Date (assumindo ISO input)
  const dataNascimentoDate = new Date(payload.dataNascimento);

  const created = await prisma.ficha.create({
    data: {
      nomeAtendido: payload.nomeAtendido,
      cpf: payload.cpf,
      numeroProcesso: payload.numeroProcesso,
      nomeResponsavel: payload.nomeResponsavel,
      dataNascimento: dataNascimentoDate,
      idUsuarioCriador: user.id, // <- FORÇANDO DO SERVIDOR
    },
    select: {
      id: true,
      nomeAtendido: true,
      createdAt: true,
    },
  });

  return NextResponse.json(created, { status: 201 });
}

export async function GET() {
  const user = await getUserFromAuth();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const fichas = await prisma.ficha.findMany({
    where: { idUsuarioCriador: user.id }, // <- filtra por dono
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      nomeAtendido: true,
      numeroProcesso: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ fichas });
}
