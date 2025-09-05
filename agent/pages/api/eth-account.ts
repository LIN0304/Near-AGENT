import type { NextApiRequest, NextApiResponse } from 'next';
import { agent } from '@neardefi/shade-agent-js';
import { ethers } from 'ethers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  try {
    // TODO: confirm the correct agent method for fetching the EVM public key
    const { public_key } = await agent('evm_public_key');
    const address = ethers.computeAddress('0x' + public_key);
    res.status(200).json({ address });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
