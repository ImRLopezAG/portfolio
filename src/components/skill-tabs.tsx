import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brands } from '@components/ui/brands'
import { cn } from '@lib/utils'
import { Badge } from '@ui/badge'
import { Card, CardContent } from '@ui/card'

interface SkillTabsProps {
	categories: string[]
	skills: Record<string, Skill[]>
}
export function SkillTabs({ categories, skills }: SkillTabsProps) {
	return (
		<Card className='my-4'>
			<CardContent className='p-4'>
				<Tabs defaultValue='Frontend'>
					<TabsList className='mb-12 grid h-full w-full grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6'>
						{Array.from(categories).map((category) => (
							<TabsTrigger
								key={category}
								value={category}
								className='text-sm lg:text-base'
							>
								{category}
							</TabsTrigger>
						))}
					</TabsList>
					<div className='p-2'>
						{Array.from(categories).map((category) => (
							<TabsContent key={category} value={category}>
								<div className='flex flex-wrap gap-3'>
									{skills[category].map((skill) => (
										<Badge
											key={skill.name}
											className={cn(
												'bg-primary/20 py-1.5 text-foreground text-sm hover:bg-foreground/30',
												{
													'bg-green-200/10 text-green-500 hover:bg-green-500/30':
														skill.level === 'Advanced',
													'bg-blue-200/10 text-blue-500 hover:bg-blue-500/30':
														skill.level === 'Mid',
													'bg-amber-200/10 text-amber-500 hover:bg-amber-500/30':
														skill.level === 'Beginner',
												},
											)}
											variant='outline'
										>
											{skill.name}
											<Brands name={skill.name} className='size-8' />
										</Badge>
									))}
								</div>
							</TabsContent>
						))}
					</div>
				</Tabs>
			</CardContent>
		</Card>
	)
}
