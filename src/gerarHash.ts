// gerarHash.ts
import bcrypt from 'bcryptjs';

async function gerarHash() {
  const senha = '123456'; // Altere conforme necessário
  const hash = await bcrypt.hash(senha, 10);
  console.log(`Senha original: ${senha}`);
  console.log(`Hash gerada: ${hash}`);
}

gerarHash();
