import type { NextApiRequest, NextApiResponse } from 'next';
import { agentAccountId } from '@neardefi/shade-agent-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  try {
    const account = await agentAccountId();
    res.status(200).json(account);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
