import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Simulação de "banco de dados" (substitua por um real depois)
const mockUser = {
  id: 1,
  email: "teste@exemplo.com",
  senha: "123456",
  nome: "Larissa"
};

export async function POST(req: Request) {
    
  try {
    // 1) Lê o corpo da requisição
    const { email, senha } = await req.json();
    console.log("Tentando login com:", email);


    // 2) Valida se o usuário existe (aqui simulado)
    if (email !== mockUser.email || senha !== mockUser.senha) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    // 3) Cria o payload do JWT
    const payload = { id: mockUser.id, email: mockUser.email, nome: mockUser.nome };

    // 4) Gera o token com expiração de 1h
    if (!JWT_SECRET) {
      return NextResponse.json({ error: "JWT_SECRET não configurado" }, { status: 500 });
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // 5) Retorna o token no response
    // (opção 1: no body)
    // return NextResponse.json({ token });

    // (opção 2: setar cookie HTTP-only para segurança)
    const res = NextResponse.json({ message: "Login bem-sucedido" });
    res.cookies.set("token", token, {
      httpOnly: true, // protege contra JS no client
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1h
      path: "/"
    });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
