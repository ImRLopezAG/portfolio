import { ContactFormEmail } from '@components/email/contact'
import { createTRPCRouter, publicProcedure } from '@server/api/trpc'
import { env } from '@shared/env'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(env.RESEND_API_KEY)
const emailSchema = z.object({
	name: z.string(),
	subject: z.string(),
	email: z.string().email(),
	message: z.string(),
})

const CONTACT_EMAIL = 'contact@imrlopez.dev'
export const emailRouter = createTRPCRouter({
	sendEmail: publicProcedure.input(emailSchema).mutation(async ({ input }) => {
		const { email, subject, message, name } = input
		const { data, error } = await resend.emails.send({
			from: `Angel Lopez <${CONTACT_EMAIL}>`,
			to: [email],
			subject,
			react: ContactFormEmail({
				name,
				subject,
				email,
				message,
			}),
			replyTo: [CONTACT_EMAIL],
			headers: {
				'x-contact-name': name,
				'x-developer-email': email,
			},
		})

		if (error) {
			return {
				success: false,
				data: error.message,
			}
		}
		return {
			success: true,
			data,
		}
	}),
})
