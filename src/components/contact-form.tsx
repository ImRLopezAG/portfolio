'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { sendEmail } from '@actions/email'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '@server/schemas'
import { Button } from '@ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@ui/form'
import { Input } from '@ui/input'
import { Textarea } from '@ui/textarea'
import { Send } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
export const ContactForm = () => {
	const [isSubmitting, startTransition] = useTransition()
	const form = useForm<Email>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			name: '',
			subject: '',
			email: '',
			message: '',
		},
	})

	const onSubmit = (email: Email) => startTransition(async () => {
		const { success, data } = await sendEmail(email)
		if (!success) {
			toast.error('Error sending email')
			return
		}
		if (data) {
			toast.success('Email sent successfully')
			form.reset()
		}
	})

	return (
		<Card className='w-full max-w-3xl'>
			<CardHeader>
				<CardTitle>Send Me a Message</CardTitle>
				<CardDescription>
					I&apos;ll get back to you as soon as possible
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<div className='grid gap-4 md:grid-cols-2'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input id='name' placeholder='Your name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												id='email'
												type='email'
												placeholder='Your email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name='subject'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subject</FormLabel>
									<FormControl>
										<Input
											id='subject'
											placeholder='Subject of your message'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem className='space-y-2'>
									<FormLabel>Message</FormLabel>
									<FormControl>
										<Textarea
											id='message'
											placeholder='Your message...'
											rows={5}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full' disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<svg
										className='-ml-1 mr-2 h-4 w-4 animate-spin text-white'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										aria-hidden='true'
										role='img'
										aria-label='Loading spinner'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										/>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										/>
									</svg>
									Sending...
								</>
							) : (
								<>
									<Send className='mr-2 h-4 w-4' />
									Send Message
								</>
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
