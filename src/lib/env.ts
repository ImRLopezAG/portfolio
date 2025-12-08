import { z } from 'zod'

export const env = z.object({
  RESEND_API_KEY: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_ENDPOINT: z.string().url(),
  R2_BUCKET: z.string().min(1),
  R2_PUBLIC_URL: z.string().url(),
}).parse(process.env)