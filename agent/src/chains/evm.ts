import { ethers } from 'ethers';

export interface EvmTx {
  to: string;
  data?: string;
  value?: string;
  chainId: number;
  gas?: string;
}

export function buildTx(opts: EvmTx): Uint8Array {
  const tx = {
    to: opts.to,
    data: opts.data ?? '0x',
    value: opts.value ?? 0,
    chainId: opts.chainId,
    gasLimit: opts.gas ?? 21000,
  };
  return ethers.Transaction.from(tx).unsignedSerialized;
}
