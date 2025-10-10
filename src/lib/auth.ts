import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

// --- Opcional NextAuth imports (descomente se usar NextAuth) ---
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // ajuste o path

type UserPayload = { id: number; email?: string; nome?: string } | null;

const JWT_SECRET = process.env.JWT_SECRET;

export async function getUserFromAuth(): Promise<UserPayload> {
  // 1) Tente NextAuth (se estiver usando) - opcional
  // try {
  //   const session = await getServerSession(authOptions);
  //   if (session?.user?.id) {
  //     return { id: Number(session.user.id), email: session.user.email ?? undefined, nome: session.user.name ?? undefined };
  //   }
  // } catch (err) {
  //   // ignore and fallback to JWT
  // }

  // 2) Tente cookie "token"
  try {
    const tokenFromCookie = (await cookies()).get('token')?.value;
    const headersList = await headers();
    const authHeader = headersList.get('authorization') ?? undefined;
    const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined;

    const token = tokenFromCookie || tokenFromHeader;
    if (!token) return null;
    if (!JWT_SECRET) {
      console.warn('JWT_SECRET not set; cannot verify token');
      return null;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    // garanta que decoded.id esteja presente
    if (!decoded || !decoded.id) return null;
    return { id: Number(decoded.id), email: decoded.email, nome: decoded.nome };
  } catch (err) {
    // token inválido ou outro erro -> null
    return null;
  }
}
