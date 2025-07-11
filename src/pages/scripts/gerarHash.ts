import bcrypt from 'bcryptjs';

async function main() {
  const senha = '123456';
  const hash = await bcrypt.hash(senha, 10);
  console.log('🔐 Hash gerada:', hash);
}

main();

main()
  .catch((error) => {
    console.error('Erro ao gerar hash:', error);
  })
  .finally(() => {
    console.log('Processo de geração de hash concluído.');
  });
  