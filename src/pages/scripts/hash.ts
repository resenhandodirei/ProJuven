// scripts/hash.ts
import bcrypt from 'bcryptjs';

async function gerarHash() {
  const hash = await bcrypt.hash('123456', 10);
  console.log('Hash gerada:', hash);
}

gerarHash();
