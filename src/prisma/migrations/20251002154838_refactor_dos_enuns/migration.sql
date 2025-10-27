/*
  Warnings:

  - The values [DEFENSOR_RUBENS,DEFENSORA_LUCIANA,DEFENSORA_ANDREIA] on the enum `DefensorResponsavel` will be removed. If these variants are still used in the database, this will fail.
  - The values [MAE,PAI,IRMA,IRMAO,TIOS,AVOS,NORA,CUNHADO,OUTROS] on the enum `Parentesco` will be removed. If these variants are still used in the database, this will fail.
  - The values [DEFENSOR_RUBENS,DEFENSORA_LUCIANA,DEFENSORA_ANDREIA,ASSESSOR_PEDRO,ESTAGIARIO_ALEX,ESTAGIARIO_ALAN,ESTAGIARIA_GABRIELLE,ESTAGIARIO_GUSTAVO,ESTAGIARIA_LARISSA,ESTAGIARIO_MARCOS,ESTAGIARIA_RAYANE,ESTAGIARIA_THAYNA] on the enum `PessoaQueAtendeu` will be removed. If these variants are still used in the database, this will fail.
  - The values [PATRIMONIO,VIDA,HONRA,DROGAS,ARMAS,SEXUAL,OUTROS] on the enum `TipoCrime` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DefensorResponsavel_new" AS ENUM ('Defensor Dr. Rubens', 'Defensora Dra. Luciana', 'Defensora Dra. Andreia');
ALTER TABLE "Atendimento" ALTER COLUMN "defensorResponsavel" TYPE "DefensorResponsavel_new" USING ("defensorResponsavel"::text::"DefensorResponsavel_new");
ALTER TYPE "DefensorResponsavel" RENAME TO "DefensorResponsavel_old";
ALTER TYPE "DefensorResponsavel_new" RENAME TO "DefensorResponsavel";
DROP TYPE "DefensorResponsavel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Parentesco_new" AS ENUM ('Mãe', 'Pai', 'Irmã', 'Irmão(ã)', 'Tios', 'Avos', 'Nora', 'Cunhado(a)', 'Outros');
ALTER TABLE "Familiar" ALTER COLUMN "parentesco" TYPE "Parentesco_new" USING ("parentesco"::text::"Parentesco_new");
ALTER TABLE "ContatoFamiliar" ALTER COLUMN "parentesco" TYPE "Parentesco_new" USING ("parentesco"::text::"Parentesco_new");
ALTER TYPE "Parentesco" RENAME TO "Parentesco_old";
ALTER TYPE "Parentesco_new" RENAME TO "Parentesco";
DROP TYPE "Parentesco_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PessoaQueAtendeu_new" AS ENUM ('Defensor Dr. Rubens', 'Defensora Dra. Luciana', 'Defensora Dra. Andreia', 'Assessor jurídico Dr. Pedro', 'Estagiário Alex', 'Estagiário Alan', 'Estagiária Gabrielle', 'Estagiário Gustavo Cícero', 'Estagiária Larissa Corrêa', 'Estagiário Marcos', 'Estagiária Rayane', 'Estagiária Thayná Evelyn');
ALTER TABLE "Atendimento" ALTER COLUMN "pessoaQueAtendeu" TYPE "PessoaQueAtendeu_new" USING ("pessoaQueAtendeu"::text::"PessoaQueAtendeu_new");
ALTER TYPE "PessoaQueAtendeu" RENAME TO "PessoaQueAtendeu_old";
ALTER TYPE "PessoaQueAtendeu_new" RENAME TO "PessoaQueAtendeu";
DROP TYPE "PessoaQueAtendeu_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TipoCrime_new" AS ENUM ('Patrimonio', 'Vida', 'Honra', 'Drogas', 'Armas', 'Sexual', 'Outros');
ALTER TABLE "Processo" ALTER COLUMN "tipoCrime" TYPE "TipoCrime_new" USING ("tipoCrime"::text::"TipoCrime_new");
ALTER TYPE "TipoCrime" RENAME TO "TipoCrime_old";
ALTER TYPE "TipoCrime_new" RENAME TO "TipoCrime";
DROP TYPE "TipoCrime_old";
COMMIT;
