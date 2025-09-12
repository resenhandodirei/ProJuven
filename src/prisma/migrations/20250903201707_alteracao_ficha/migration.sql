/*
  Warnings:

  - You are about to drop the column `descricao` on the `ficha` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ficha" DROP COLUMN "descricao",
ADD COLUMN     "documento_responsavel" TEXT,
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "nome_familiar" TEXT,
ADD COLUMN     "qtd_processo" INTEGER,
ADD COLUMN     "rg" TEXT,
ADD COLUMN     "telefones_contato" TEXT[],
ADD COLUMN     "vara_processo" TEXT,
ALTER COLUMN "cpf" DROP NOT NULL,
ALTER COLUMN "numero_processo" DROP NOT NULL,
ALTER COLUMN "nome_responsavel" DROP NOT NULL,
ALTER COLUMN "data_nascimento" DROP NOT NULL;
