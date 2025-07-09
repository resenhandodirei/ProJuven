import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../api/utils/withAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const user = req.user;
  return res.status(200).json({
    message: `Olá, usuário logado! Seu ID é ${user.id} e seu e-mail é ${user.email}.`,
  });
}

export default withAuth(handler);