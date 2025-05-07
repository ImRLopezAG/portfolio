import { z } from 'zod'

export const metadataSchema = z.object({
	slug: z.string(),
	title: z.string(),
	description: z.string().optional(),
	date: z.string(),
	category: z.string(),
	tags: z.array(z.string()).optional(),
})
