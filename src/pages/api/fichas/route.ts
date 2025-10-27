import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserFromAuth } from '../../../lib/auth';
import { prisma } from '../../../lib/db';
import { get } from 'http';
import { fichaSchema as fichaInputSchema } from '../../../lib/schemas';

const fichaSchema = z.object({
  nomeAtendido: z.string().nonempty(),
    cpf: z.string().nonempty(),
    numeroProcesso: z.string().nonempty(),
    nomeResponsavel: z.string().nonempty(),
    dataNascimento: z.string().nonempty(), // ISO string (yyyy-mm-dd)
});

export async function POST(req: Request) {
  const user = await getUserFromAuth();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const json = await req.json();
  const parsed = fichaSchema.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const ficha = await prisma.ficha.create({
        data: {
            ...parsed.data,
            idUsuarioCriador: user.id, // <- DEFINIDO AQUI, SEM CONFIAR NO CLIENTE
        },

        include: { criador: { select: { id: true, email: true, nome: true}}}
    });

    return NextResponse.json(ficha, { status: 201 });
}


export async function GET() {
  const user = await getUserFromAuth();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  // Para listar somente as fichas criadas pelo usuário logado
  // (ou seja, o dono das fichas)
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
