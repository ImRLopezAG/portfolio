import { z } from 'zod'

export const env = z.object({
  RESEND_API_KEY: z.string().min(1),
}).parse(process.env)