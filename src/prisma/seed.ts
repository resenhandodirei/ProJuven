import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

  const senha = '123456';
  const hash = await bcrypt.hash(senha, 10);
  bcrypt.hash(senha, 10).then(console.log);

  await prisma.login.create({
    data: {
      nome: 'Usuária Teste',
      email: 'teste@exemplo.com',
      senha: hash,
      genero: 'Feminino',
      ["tipo_de_perfil"]: 'adm' 
    }
  });

  console.log('Usuária inserida com sucesso!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
