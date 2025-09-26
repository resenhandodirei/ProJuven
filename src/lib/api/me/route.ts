import { NextResponse } from "next/server";
import { getUserFromAuth } from "@/lib/auth"; // onde está sua função auth.ts
import prisma from "@/lib/prisma"; // ajuste se seu prisma está em outro path

// 🔹 Apenas GET é permitido nessa rota
export async function GET() {
  try {
    // Busca usuário autenticado a partir do token
    const user = await getUserFromAuth();

    if (!user) {
      return NextResponse.json(
        { message: "Não autorizado" },
        { status: 401 } // 🔑 Padrão correto p/ não autenticado
      );
    }

    // Busca dados completos do usuário no banco
    const dbUser = await prisma.login.findUnique({
      where: { id: user.id },
      select: { nome: true, email: true, tipoDePerfil: true },
    });

    if (!dbUser) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      nome: dbUser.nome,
      email: dbUser.email,
      perfil: dbUser.tipoDePerfil,
    });
  } catch (error) {
    console.error("Erro no /api/me:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// 🔹 Bloqueia outros métodos HTTP
export function POST() {
  return NextResponse.json(
    { message: "Método não permitido" },
    { status: 405 }
  );
}
export function PUT() {
  return NextResponse.json(
    { message: "Método não permitido" },
    { status: 405 }
  );
}
export function DELETE() {
  return NextResponse.json(
    { message: "Método não permitido" },
    { status: 405 }
  );
}
