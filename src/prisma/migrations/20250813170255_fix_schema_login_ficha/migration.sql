-- AlterTable
ALTER TABLE "login" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ficha" (
    "id" TEXT NOT NULL,
    "nome_atendido" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "numero_processo" TEXT NOT NULL,
    "nome_responsavel" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "id_usuario_criador" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ficha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prontuario_juridico" (
    "id" TEXT NOT NULL,
    "id_usuario_criador" INTEGER NOT NULL,
    "fichaId" TEXT,
    "pessoa_que_atendeu" TEXT,
    "numero_processo" TEXT,
    "nome_jovem" TEXT,
    "cpf" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prontuario_juridico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prontuario_psicossocial" (
    "id" TEXT NOT NULL,
    "id_usuario_criador" INTEGER NOT NULL,
    "fichaId" TEXT,
    "avaliacao_inicial" TEXT,
    "historico_familiar" TEXT,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prontuario_psicossocial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ficha" ADD CONSTRAINT "ficha_id_usuario_criador_fkey" FOREIGN KEY ("id_usuario_criador") REFERENCES "login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario_juridico" ADD CONSTRAINT "prontuario_juridico_id_usuario_criador_fkey" FOREIGN KEY ("id_usuario_criador") REFERENCES "login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario_juridico" ADD CONSTRAINT "prontuario_juridico_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "ficha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario_psicossocial" ADD CONSTRAINT "prontuario_psicossocial_id_usuario_criador_fkey" FOREIGN KEY ("id_usuario_criador") REFERENCES "login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario_psicossocial" ADD CONSTRAINT "prontuario_psicossocial_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "ficha"("id") ON DELETE SET NULL ON UPDATE CASCADE;
