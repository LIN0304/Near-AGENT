import type { NextApiRequest, NextApiResponse } from 'next';
import { buildTx } from '../../src/chains/evm';
import { signAndSend } from '../../src/core/signAndSend';
import { loadPolicy } from '../../src/guards/policy';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  // In a real implementation, guards would enforce policy limits
  const _policy = loadPolicy();
  const tx = buildTx(req.body);
  const hash = await signAndSend(tx);

  res.status(200).json({ hash });
}
