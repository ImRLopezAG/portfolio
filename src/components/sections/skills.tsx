import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { skills } from '@shared/cv.json'
import { AnimatedSection } from './section'
export async function Skills() {
	const skillCategories = new Set<string>()
	for (const skill of skills) {
		for (const keyword of skill.keywords) {
			skillCategories.add(keyword)
		}
	}

	const skillCategoriesMap = skills.reduce(
		(acc, skill) => {
			for (const keyword of skill.keywords) {
				if (!acc[keyword]) {
					acc[keyword] = []
				}
				acc[keyword].push(skill)
			}
			return acc
		},
		{} as Record<string, typeof skills>,
	)

	const getSkillColor = (level: string) => {
		switch (level) {
			case 'Advanced':
				return 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
			case 'Mid':
				return 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30'
			case 'Beginner':
				return 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
			default:
				return 'bg-primary/20 text-primary hover:bg-primary/30'
		}
	}

	return (
		<AnimatedSection id='skills'>
			<div className='space-y-4 text-center'>
				<h2 className='font-bold text-3xl tracking-tight sm:text-4xl'>
					Skills & Expertise
				</h2>
				<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
				<p className='mx-auto max-w-2xl text-muted-foreground'>
					A collection of technologies and methodologies I've worked with
					throughout my career
				</p>
			</div>

			<Card>
				<CardContent className='p-4'>
					<Tabs defaultValue='Frontend'>
						<TabsList className='mb-12 grid grid-cols-4 gap-2 md:grid-cols-6'>
							{Array.from(skillCategories).map((category) => (
								<TabsTrigger key={category} value={category}>
									{category}
								</TabsTrigger>
							))}
						</TabsList>
						<div className='p-2'>
							{Array.from(skillCategories).map((category) => (
								<TabsContent key={category} value={category}>
									<div className='flex flex-wrap gap-3'>
										{skillCategoriesMap[category].map((skill) => (
											<Badge
												key={skill.name}
												className={`py-1.5 text-sm ${getSkillColor(skill.level)}`}
												variant='outline'
											>
												{skill.name}
												<span className='ml-2 text-xs opacity-70'>
													{skill.level}
												</span>
											</Badge>
										))}
									</div>
								</TabsContent>
							))}
						</div>
					</Tabs>
				</CardContent>
			</Card>

			<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
				<Card className='overflow-hidden'>
					<div className='h-2 bg-green-500' />
					<CardContent className='p-6'>
						<div className='mb-2 font-bold text-4xl text-green-500'>
							Advanced
						</div>
						<p className='text-muted-foreground'>
							Technologies and concepts I've mastered and use with confidence
						</p>
					</CardContent>
				</Card>

				<Card className='overflow-hidden'>
					<div className='h-2 bg-blue-500' />
					<CardContent className='p-6'>
						<div className='mb-2 font-bold text-4xl text-blue-500'>Mid</div>
						<p className='text-muted-foreground'>
							Skills I'm proficient in and use regularly in my projects
						</p>
					</CardContent>
				</Card>

				<Card className='overflow-hidden'>
					<div className='h-2 bg-amber-500' />
					<CardContent className='p-6'>
						<div className='mb-2 font-bold text-4xl text-amber-500'>
							Beginner
						</div>
						<p className='text-muted-foreground'>
							Technologies I'm currently learning and exploring in my projects
						</p>
					</CardContent>
				</Card>

				<Card className='overflow-hidden'>
					<div className='h-2 bg-primary' />
					<CardContent className='p-6'>
						<div className='mb-2 font-bold text-4xl text-primary'>Growing</div>
						<p className='text-muted-foreground'>
							I'm constantly learning new technologies and improving my skills
						</p>
					</CardContent>
				</Card>
			</div>
		</AnimatedSection>
	)
}
