import { z } from 'zod'

export const metadataSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	date: z.string(),
	category: z.string().optional(),
	tags: z.array(z.string()).optional(),
})
