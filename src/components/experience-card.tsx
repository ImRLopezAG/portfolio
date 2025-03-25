import { Card, CardContent, CardHeader, CardTitle } from '@ui/card'
interface ExperienceCardProps {
	title: string
	company: string
	startDate: string
	endDate?: string
	description: string
	responsibilities: string[]
	isEducation?: boolean
	type?: string
	value?: string
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
	title,
	company,
	startDate,
	endDate,
	description,
	responsibilities,
	isEducation,
	type,
	value,
}) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
	}
	return (
		<Card>
			<CardHeader className='pb-2'>
				<div className='flex items-start justify-between'>
					<CardTitle>{title}</CardTitle>
					<span className='text-muted-foreground text-sm'>
						{formatDate(startDate)} -{' '}
						{endDate ? formatDate(endDate) : 'Present'}
					</span>
				</div>
				<p className='font-medium text-primary'>{company}</p>
			</CardHeader>
			<CardContent>
				{!isEducation && (
					<p className='mb-4 text-muted-foreground'>{description}</p>
				)}
				{isEducation && (
					<div className='mb-4 flex justify-between'>
						<span className='font-medium text-sm'>{type}</span>
						<span className='text-muted-foreground text-sm'>{value}</span>
					</div>
				)}
				<ul className='list-inside list-disc space-y-1 text-muted-foreground text-sm'>
					{responsibilities.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
