import { Card, CardContent, CardHeader, CardTitle } from '@ui/card'
import { formatDate } from 'date-fns'

interface Props {
	title: string
	company: string
	startDate: string
	endDate?: string
	description?: {
		text: string
		id: string
	}[]
	responsibilities: {
		text: string
		id: string
	}[]
	isEducation?: boolean
	type?: string
	value?: string
}
export function ExperienceCard({
	title,
	company,
	startDate,
	endDate,
	description,
	responsibilities,
	isEducation = false,
	type,
	value,
}: Props) {
	return (
		<Card className=''>
			<CardHeader className='pb-2'>
				<div className='flex items-start justify-between'>
					<CardTitle>{title}</CardTitle>
					<span className='text-muted-foreground text-sm'>
						{formatDate(startDate, 'MMM yyyy')} -{' '}
						{endDate ? formatDate(endDate, 'MMM yyyy') : 'Present'}
					</span>
				</div>
				<p className='font-medium text-primary'>{company}</p>
			</CardHeader>
			<CardContent>
				{!isEducation && description && (
					<p className='mb-4 text-foreground'>
						{description.map((d) => d.text).join(' ')}
					</p>
				)}
				{isEducation && (
					<div className='mb-4 flex justify-between'>
						<span className='font-medium text-sm'>{type}</span>
						<span className='text-muted-foreground text-sm'>{value}</span>
					</div>
				)}
				<ul className='list-inside list-disc space-y-1 text-muted-foreground text-sm'>
					{responsibilities.map((item) => (
						<li key={item.id}>{item.text}</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
