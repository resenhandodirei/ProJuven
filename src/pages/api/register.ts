import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, TipoDePerfilEnum } from '@prisma/client';
import bcrypt from 'bcrypt';
import { normalizePerfilInput } from '@/lib/perfil';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  console.log("📩 register body:", req.body);


  try {
    const { email, senha, nome, tipo_de_perfil, tipoDePerfil } = req.body as {
      email?: string;
      senha?: string;
      nome?: string;
      tipoDePerfil?: string;
      tipo_de_perfil?: string;
    }

    // Normaliza perfil vindo com qualquer nome

    const perfilNormalizado = normalizePerfilInput(tipo_de_perfil ?? tipoDePerfil);

    if (!email || !senha || !nome || !perfilNormalizado) {
      return res.status(400).json({ 
        message: 
        "Campos obrigatórios não foram preenchidos."
      });
      }

    // Garante que o perfil é valido contra o enum do Prisma

      if (!Object.values(TipoDePerfilEnum).includes(perfilNormalizado as TipoDePerfilEnum)) {
        return res.status(400).json({ message: 'Tipo de perfil inválido.' });
      } 
      
      // Verifica se o usuário já existe
      const exists = await prisma.login.findUnique({ where: { email } });
      if (exists) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      const hashed = await bcrypt.hash(senha, 10);

      const user = await prisma.login.create({
        data: { 
          email, 
          senha: hashed, 
          nome, 
          tipoDePerfil: perfilNormalizado as TipoDePerfilEnum },
      });

      
      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: { 
          id: user.id, 
          email: user.email, 
          TipoDePerfil: user.tipoDePerfil 
        },
      });

  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
