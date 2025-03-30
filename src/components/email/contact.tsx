import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
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
				<Body className='bg-gray-10 font-sans'>
					<Container className='mx-auto my-10 max-w-[600px]'>
						{/* Header with accent color */}
						<Section className='rounded-t-lg bg-blue-600 px-8 py-6'>
							<Row>
								<Column align='center'>
									<Img
										src='https://imrlopez.dev/favicon.svg'
										width='64'
										height='64'
										alt='Logo'
										className='rounded-full'
									/>
								</Column>
							</Row>
							<Heading className='m-0 mt-4 text-center font-bold text-3xl text-white'>
								Thank You for Reaching Out!
							</Heading>
							<Text className='m-0 mt-2 text-center text-blue-100 text-lg'>
								I'm excited to connect with you
							</Text>
						</Section>

						{/* Main content */}
						<Section className='rounded-b-lg border border-gray-200 border-t-0 bg-white px-8 py-10 shadow-lg'>
							{/* Personalized greeting */}
							<Text className='text-gray-800 text-xl'>
								Hi <strong className='text-blue-600'>{name}</strong>,
							</Text>

							<Text className='text-gray-800 text-lg leading-relaxed'>
								Thank you for contacting me through my portfolio. I appreciate
								your interest in my work and I'm looking forward to the
								possibility of collaborating with you.
							</Text>

							<Text className='text-gray-800 text-lg leading-relaxed'>
								I've received your message and will review it promptly. You can
								expect to hear back from me within 1-2 business days.
							</Text>

							{/* Message details card with enhanced styling */}
							<Section className='my-8 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm'>
								<Heading
									as='h3'
									className='m-0 mb-6 flex items-center font-semibold text-gray-800 text-xl'
								>
									<span className='mr-2'>📬</span>
									Your Message Details
								</Heading>

								<Text className='m-0 font-medium text-gray-700'>Message:</Text>
								<Section className='mt-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
									<Text className='m-0 whitespace-pre-wrap text-gray-800 leading-relaxed'>
										{message}
									</Text>
								</Section>
							</Section>

							<Text className='text-gray-800 text-lg leading-relaxed'>
								In the meantime, feel free to check out more of my work on my
								portfolio or connect with me on social media.
							</Text>

							<Text className='mb-8 text-gray-800 text-lg leading-relaxed'>
								I look forward to our conversation!
							</Text>

							<Text className='font-medium text-gray-800'>Best regards,</Text>
							<Text className='font-bold text-gray-900 text-xl'>
								Angel Gabriel Lopez
							</Text>
							<Text className='font-medium text-blue-600 text-lg'>
								Full Stack Developer
							</Text>
						</Section>

						{/* Enhanced Footer */}
						<Section className='mt-8 rounded-lg bg-gray-50 p-8 text-center'>
							<Text className='text-gray-600 text-sm'>
								© {new Date().getFullYear()} Angel Gabriel Lopez. All rights
								reserved.
							</Text>
							<Text className='mt-2 text-gray-500 text-xs'>
								This is an automated response to your contact form submission.
							</Text>
							<Row className='mt-6'>
								<Column align='center'>
									<Link
										href='https://github.com/ImRLopezAG'
										className='font-medium text-blue-600 text-sm hover:text-blue-800'
									>
										GitHub
									</Link>
								</Column>
								<Column align='center'>
									<Link
										href='https://www.linkedin.com/in/angel-gabriel-lopez/'
										className='font-medium text-blue-600 text-sm hover:text-blue-800'
									>
										LinkedIn
									</Link>
								</Column>
								<Column align='center'>
									<Link
										href='mailto:contact@imrlopez.dev'
										className='font-medium text-blue-600 text-sm hover:text-blue-800'
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
