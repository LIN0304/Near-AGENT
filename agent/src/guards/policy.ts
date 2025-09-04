import fs from 'fs';
import path from 'path';

export interface Policy {
  chains: string[];
  contracts: string[];
  dailySpendLimit: number;
  txRateLimit: number;
}

export function loadPolicy(): Policy {
  const file = path.join(process.cwd(), 'agent', 'config', 'policy.json');
  const raw = fs.readFileSync(file, 'utf-8');
  return JSON.parse(raw) as Policy;
}
