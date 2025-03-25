import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface ContactFormEmailProps {
	name: string
	email: string
	subject: string
	message: string
}

export const ContactFormEmail = ({
	name,
	email,
	subject,
	message,
}: ContactFormEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>
				Thanks for reaching out, {name}! I've received your message.
			</Preview>
			<Tailwind>
				<Body className='bg-white font-sans'>
					<Container className='mx-auto my-10 max-w-[600px]'>
						{/* Header with accent color */}
						<Section className='rounded-t-lg bg-blue-600 px-8 py-6'>
							<Heading className='m-0 text-center font-bold text-3xl text-white'>
								Thank You for Reaching Out!
							</Heading>
							<Text className='m-0 mt-2 text-center text-white'>
								I'm excited to connect with you
							</Text>
						</Section>

						{/* Main content */}
						<Section className='rounded-b-lg border border-gray-200 border-t-0 bg-white px-8 py-10 shadow-sm'>
							{/* Personalized greeting */}
							<Text className='text-gray-800 text-lg'>
								Hi <strong>{name}</strong>,
							</Text>

							<Text className='text-gray-800'>
								Thank you for contacting me through my portfolio. I appreciate
								your interest in my work and I'm looking forward to the
								possibility of collaborating with you.
							</Text>

							<Text className='text-gray-800'>
								I've received your message and will review it promptly. You can
								expect to hear back from me within 1-2 business days.
							</Text>

							{/* Message details card */}
							<Section className='my-8 rounded-lg border border-gray-200 bg-gray-50 p-6'>
								<Heading
									as='h3'
									className='m-0 mb-4 font-semibold text-gray-800 text-lg'
								>
									Your Message Details:
								</Heading>

								<Row className='mb-4'>
									<Column className='w-[30%]'>
										<Text className='m-0 font-medium text-gray-700'>From:</Text>
									</Column>
									<Column>
										<Text className='m-0 text-gray-800'>
											{name} (
											<Link href={`mailto:${email}`} className='text-blue-600'>
												{email}
											</Link>
											)
										</Text>
									</Column>
								</Row>

								<Row className='mb-4'>
									<Column className='w-[30%]'>
										<Text className='m-0 font-medium text-gray-700'>
											Subject:
										</Text>
									</Column>
									<Column>
										<Text className='m-0 text-gray-800'>{subject}</Text>
									</Column>
								</Row>

								<Hr className='my-4 border-gray-200' />

								<Text className='m-0 font-medium text-gray-700'>Message:</Text>
								<Section className='mt-2 rounded-md border border-gray-200 bg-white p-4'>
									<Text className='m-0 whitespace-pre-wrap text-gray-800'>
										{message}
									</Text>
								</Section>
							</Section>

							<Text className='text-gray-800'>
								In the meantime, feel free to check out more of my work on my
								portfolio or connect with me on social media.
							</Text>

							<Text className='mb-6 text-gray-800'>
								I look forward to our conversation!
							</Text>

							<Text className='font-medium text-gray-800'>Best regards,</Text>
							<Text className='font-bold text-gray-900'>
								Angel Gabriel Lopez
							</Text>
							<Text className='text-blue-600 text-sm'>
								Full Stack Developer
							</Text>
						</Section>

						{/* Footer */}
						<Section className='mt-4 text-center'>
							<Text className='text-gray-600 text-sm'>
								© {new Date().getFullYear()} Angel Gabriel Lopez. All rights
								reserved.
							</Text>
							<Text className='text-gray-600 text-xs'>
								This is an automated response to your contact form submission.
							</Text>
							<Row className='mt-4'>
								<Column align='center'>
									<Link
										href='https://github.com/ImRLopezAG'
										className='text-blue-600 text-sm'
									>
										GitHub
									</Link>
								</Column>
								<Column align='center'>
									<Link
										href='https://www.linkedin.com/in/angel-gabriel-lopez/'
										className='text-blue-600 text-sm'
									>
										LinkedIn
									</Link>
								</Column>
								<Column align='center'>
									<Link
										href='mailto:contact@imrlopez.dev'
										className='text-blue-600 text-sm'
									>
										contact@imrlopez.dev
									</Link>
								</Column>
							</Row>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default ContactFormEmail
