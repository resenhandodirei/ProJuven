-- CreateEnum
CREATE TYPE "TipoDePerfilEnum" AS ENUM ('adm', 'defensor', 'servidor', 'psicossocial', 'estagiario');

-- CreateTable
CREATE TABLE "login" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "genero" VARCHAR(20),
    "tipo_de_perfil" "TipoDePerfilEnum" NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "login_email_key" ON "login"("email");
