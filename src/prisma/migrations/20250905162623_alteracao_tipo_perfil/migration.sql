/*
  Warnings:

  - The values [adm,defensor,servidor,psicossocial,estagiario] on the enum `TipoDePerfilEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoDePerfilEnum_new" AS ENUM ('ADMIN', 'DEFENSOR', 'PSICOSSOCIAL', 'SERVIDOR', 'ESTAGIARIO');
ALTER TABLE "login" ALTER COLUMN "tipo_de_perfil" TYPE "TipoDePerfilEnum_new" USING ("tipo_de_perfil"::text::"TipoDePerfilEnum_new");
ALTER TYPE "TipoDePerfilEnum" RENAME TO "TipoDePerfilEnum_old";
ALTER TYPE "TipoDePerfilEnum_new" RENAME TO "TipoDePerfilEnum";
DROP TYPE "TipoDePerfilEnum_old";
COMMIT;
