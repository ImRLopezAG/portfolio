import { Resend } from 'resend'

import { ContactFormEmail } from '@components/contact/contact'
import { RESEND_API_KEY } from 'astro:env/server'
const resend = new Resend(RESEND_API_KEY)

const CONTACT_EMAIL = 'contact@imrlopez.dev'
export async function sendEmail({ email, subject, message, name }: Email) {
	const { data, error } = await resend.emails.send({
		from: `Angel Lopez <${CONTACT_EMAIL}>`,
		to: [email],
		cc: [CONTACT_EMAIL],
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
