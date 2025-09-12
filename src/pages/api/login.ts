import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, TipoDePerfilEnum } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { success } from 'zod';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método não permitido' });
    }

    const { email, senha } = req.body;

    console.log('📩 Dados recebidos:', { email, senha });

    const user = await prisma.login.findUnique({ where: { email } });
    if (!user) {
      console.log('Usuário não encontrado:');
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    console.log('✅ Usuário encontrado:', {
      id: user.id,
      email: user.email,
      TipoDePerfilEnum: user.tipoDePerfil,
      //senhaDoBanco: user.senha
    })

    const isTipoDePerfilValido = Object.values(TipoDePerfilEnum).includes(user.tipoDePerfil as TipoDePerfilEnum);
    if (!isTipoDePerfilValido) {
      console.log('❌ Tipo de perfil inválido:', user.tipoDePerfil);
      return res.status(500).json({ success: false, message: 'Tipo de perfil do usuário é inválido' });
    }
  
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    /**console.log('🔍 Teste direto do bcrypt.compare:', {
      testeManual: await bcrypt.compare('123456', user.senha),
      senhaDigitada: senha,
      senhaNoBanco: user.senha,
      resultado: isPasswordValid
    });*/

    if (!isPasswordValid) {
      console.log('❌ Senha incorreta');
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email 
      },
      process.env.JWT_SECRET || 'default_secret',
      { 
        expiresIn: '1h' 
      }
    );

    // 🔥 Resposta padronizada
    return res.status(200).json({
      success: true,
      message: 'Login bem-sucedido',
      token,
      user: { 
        id: user.id, 
        email: user.email, 
        nome: user.nome,
        tipoDePerfil: user.tipoDePerfil,
      }
    });

  } catch (error) {
    //console.error(error);
    return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
}
