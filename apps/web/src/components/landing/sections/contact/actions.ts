'use server'

import { ContactFormEmail } from '@landing/sections/contact/email'
import { env } from '@lib/env'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

const CONTACT_EMAIL = 'contact@imrlopez.dev'
export async function sendEmail({ email, subject, message, name }: EmailForm) {
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
}
