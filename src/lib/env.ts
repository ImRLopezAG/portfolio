import { z } from 'zod'

export const env = z
	.object({
		NODE_ENV: z.enum(['development', 'production']),
		RESEND_API_KEY: z.string(),
	})
	.parse(process.env)
