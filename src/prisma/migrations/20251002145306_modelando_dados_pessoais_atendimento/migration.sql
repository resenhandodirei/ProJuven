-- CreateEnum
CREATE TYPE "PessoaQueAtendeu" AS ENUM ('DEFENSOR_RUBENS', 'DEFENSORA_LUCIANA', 'DEFENSORA_ANDREIA', 'ASSESSOR_PEDRO', 'ESTAGIARIO_ALEX', 'ESTAGIARIO_ALAN', 'ESTAGIARIA_GABRIELLE', 'ESTAGIARIO_GUSTAVO', 'ESTAGIARIA_LARISSA', 'ESTAGIARIO_MARCOS', 'ESTAGIARIA_RAYANE', 'ESTAGIARIA_THAYNA');

-- CreateEnum
CREATE TYPE "DefensorResponsavel" AS ENUM ('DEFENSOR_RUBENS', 'DEFENSORA_LUCIANA', 'DEFENSORA_ANDREIA');

-- CreateEnum
CREATE TYPE "TipoCrime" AS ENUM ('PATRIMONIO', 'VIDA', 'HONRA', 'DROGAS', 'ARMAS', 'SEXUAL', 'OUTROS');

-- CreateEnum
CREATE TYPE "Parentesco" AS ENUM ('MAE', 'PAI', 'IRMA', 'IRMAO', 'TIOS', 'AVOS', 'NORA', 'CUNHADO', 'OUTROS');

-- CreateTable
CREATE TABLE "Jovem" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jovem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Familiar" (
    "id" SERIAL NOT NULL,
    "jovemId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "parentesco" "Parentesco" NOT NULL,
    "responsavelPrincipal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Familiar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContatoFamiliar" (
    "id" SERIAL NOT NULL,
    "familiarId" INTEGER NOT NULL,
    "telefone" TEXT NOT NULL,
    "parentesco" "Parentesco",

    CONSTRAINT "ContatoFamiliar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Processo" (
    "id" SERIAL NOT NULL,
    "jovemId" INTEGER NOT NULL,
    "numero" TEXT NOT NULL,
    "tipoCrime" "TipoCrime" NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Processo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" SERIAL NOT NULL,
    "processoId" INTEGER NOT NULL,
    "pessoaQueAtendeu" "PessoaQueAtendeu" NOT NULL,
    "defensorResponsavel" "DefensorResponsavel" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Familiar" ADD CONSTRAINT "Familiar_jovemId_fkey" FOREIGN KEY ("jovemId") REFERENCES "Jovem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContatoFamiliar" ADD CONSTRAINT "ContatoFamiliar_familiarId_fkey" FOREIGN KEY ("familiarId") REFERENCES "Familiar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processo" ADD CONSTRAINT "Processo_jovemId_fkey" FOREIGN KEY ("jovemId") REFERENCES "Jovem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
