import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 🔹 Troque por sua lógica de autenticação (ex.: pegar userId do token)
    const userId = 1;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { nome: true, perfil: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Erro no backend /api/user:", error);
    return NextResponse.json(
      { error: "Erro interno", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
