import { requestSignature } from '@neardefi/shade-agent-js';

export async function signAndSend(tx: Uint8Array): Promise<string> {
  // Request the agent to sign the transaction payload.
  const payload = Buffer.from(tx).toString('hex');
  await requestSignature({ path: 'm/0', payload });

  // TODO: use the returned signature to broadcast the transaction
  // and return the resulting transaction hash.
  return 'txHashPlaceholder';
}
