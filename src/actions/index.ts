import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { sendEmail } from '@lib/resend'
import { emailSchema } from '@lib/schemas'
export const server = {
	addTodo: defineAction({
		input: z.object({
			title: z.string(),
			completed: z.boolean(),
		}),
		handler: async ({ completed, title }) => {
			console.log('Adding todo', { title, completed })
			return {
				id: Math.random().toString(36).substring(2, 15),
				title,
				completed,
			}
		},
	}),
	sendEmail: defineAction({
		input: emailSchema,
		handler: sendEmail
	}),
}
