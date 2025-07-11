import jwt from 'jsonwebtoken';

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
