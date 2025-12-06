import { z } from 'zod'

export const env = z.object({
  STRAPI_URL: z.string().url().default('http://localhost:1337'),
  STRAPI_API_TOKEN: z.string().min(1),
  NEXT_PUBLIC_BASE_URL: z.string().url().default('http://localhost:3000'),
  RESEND_API_KEY: z.string().min(1),
}).parse(process.env)