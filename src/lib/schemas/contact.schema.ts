import { z } from 'zod'
export const emailSchema = z.object({
	name: z.string().min(4, 'Name is required and must be at least 4 characters'),
	subject: z
		.string()
		.min(10, 'Subject is required and must be at least 10 characters'),
	email: z.string().email('Invalid email address format'),
	message: z
		.string()
		.min(20, 'Message is required and must be at least 20 characters')
		.max(5000, 'Message must be at most 5000 characters'),
})
