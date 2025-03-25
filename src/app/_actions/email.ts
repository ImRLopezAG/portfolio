'use server'
import { api } from '@shared/trpc'

export async function sendEmail(data: Email) {
	const { success, data: res } = await api.email.sendEmail(data)
	if (!success) {
		return {
			success: false,
			data: res,
		}
	}
	return {
		success: true,
		data: res,
	}
}
