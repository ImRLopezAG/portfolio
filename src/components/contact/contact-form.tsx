'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { actions } from 'astro:actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '@lib/schemas'
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
import { Send, LoaderCircle } from 'lucide-react'
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

	const onSubmit = (email: Email) =>
		startTransition(async () => {
			const { error, data: action } = await actions.sendEmail(email)
			if (error || !action.success) {
				toast.error('Error sending email')
				return
			}
			if (action.data) {
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
						<Button type='submit' className='w-full text-foreground' disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
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
