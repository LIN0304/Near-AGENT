import { z } from 'zod';

export const envSchema = z.object({
  NEXT_PUBLIC_contractId: z.string(),
  PHALA_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: NodeJS.ProcessEnv): Env {
  return envSchema.parse(env);
}
