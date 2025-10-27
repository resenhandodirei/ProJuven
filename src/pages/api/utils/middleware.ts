import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const isApiPrivado = req.nextUrl.pathname.startsWith('/api/fichas');
  if (isApiPrivado) return NextResponse.next();

  const hasCookie = req.cookies.get('token');
  const hasAuthHeader = req.headers.get('authorization')?.startsWith('Bearer ');
  if (!hasCookie && !hasAuthHeader) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

}

export const config = {
  matcher: ['/api/fichas/:path*'],
}

interface RequestHeaders {
  authorization?: string;
}

interface Request {
  headers: RequestHeaders;
}

export function verifyToken(req: Request): string | jwt.JwtPayload | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}
