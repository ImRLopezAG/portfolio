'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '@lib/schemas/email'
import { useCreateForm } from '@ui/form'
import { Textarea } from '@ui/textarea'
import { Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { sendEmail } from './actions'
export function ContactForm() {
	const t = useTranslations('contact')
	const [Form] = useCreateForm(
		() => ({
			resolver: zodResolver(emailSchema),
			defaultValues: {
				name: '',
				subject: '',
				email: '',
				message: '',
			},
			onSubmit: async (email, form) => {
				const { data, success } = await sendEmail(email)
				if (!success) {
					toast.error('Error sending email')
					return
				}
				if (data) {
					toast.success('Email sent successfully')
					form.reset()
				}
			},
		}),
		[],
	)

	return (
		<Card className='translucent w-full max-w-3xl'>
			<CardHeader>
				<CardTitle>{t('formTitle')}</CardTitle>
				<CardDescription>
					I&apos;ll get back to you as soon as possible
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form>
					{(form) => (
						<div className='space-y-4'>
							<div className='grid gap-4 md:grid-cols-2'>
								<Form.Field
									control={form.control}
									name='name'
									render={({ field }) => (
										<Form.Item>
											<Form.Label>{t('name')}</Form.Label>
											<Form.Control>
												<Form.Input
													placeholder={t('namePlaceholder')}
													{...field}
												/>
											</Form.Control>
											<Form.Message />
										</Form.Item>
									)}
								/>

								<Form.Field
									control={form.control}
									name='email'
									render={({ field }) => (
										<Form.Item>
											<Form.Label>{t('email')}</Form.Label>
											<Form.Control>
												<Form.Input
													type='email'
													placeholder={t('emailPlaceholder')}
													{...field}
												/>
											</Form.Control>
											<Form.Message />
										</Form.Item>
									)}
								/>
							</div>

							<Form.Field
								control={form.control}
								name='subject'
								render={({ field }) => (
									<Form.Item>
										<Form.Label>{t('subject')}</Form.Label>
										<Form.Control>
											<Form.Input
												placeholder={t('subjectPlaceholder')}
												{...field}
											/>
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>

							<Form.Field
								control={form.control}
								name='message'
								render={({ field }) => (
									<Form.Item className='space-y-2'>
										<Form.Label>{t('message')}</Form.Label>
										<Form.Control>
											<Textarea
												placeholder={t('messagePlaceholder')}
												rows={5}
												{...field}
											/>
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>
							<Form.Submit className='w-full'>
								<Send className='mr-2 h-4 w-4' />
								Send Message
							</Form.Submit>
						</div>
					)}
				</Form>
			</CardContent>
		</Card>
	)
}
