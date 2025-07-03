// src/app/pages/api/protected.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../utils/withAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const user = req.user;
  res.status(200).json({ message: `Olá, usuário de ID ${user.id}!` });
}

export default withAuth(handler);
