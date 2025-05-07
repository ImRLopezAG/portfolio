interface Props {
	title: string
	desc?: string
}

export function SectionTitle({ title, desc }: Props) {
	return (
		<div className='space-y-4 text-center'>
			<h2 className='font-bold text-3xl tracking-tight sm:text-4xl'>{title}</h2>
			<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
			{desc && (
				<p className='mx-auto max-w-2xl text-muted-foreground'>
					{desc}
				</p>
			)}
		</div>
	)
}
