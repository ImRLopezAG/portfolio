import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@lib/utils";
import { Badge } from "@ui/badge";
import { Card, CardContent } from "@ui/card";

interface SkillTabsProps {
  categories: string[];
  skills: Record<string, Skill[]>;
}
export function SkillTabs({ categories, skills }: SkillTabsProps) {
	return (
		<Card className="my-4">
			<CardContent className="p-4">
				<Tabs defaultValue="Frontend">
					<TabsList className="mb-12 grid grid-cols-4 gap-2 md:grid-cols-6">
						{Array.from(categories).map((category) => (
							<TabsTrigger key={category} value={category}>
								{category}
							</TabsTrigger>
						))}
					</TabsList>
					<div className="p-2">
						{Array.from(categories).map((category) => (
							<TabsContent key={category} value={category}>
								<div className="flex flex-wrap gap-3">
									{skills[category].map((skill) => (
										<Badge
											key={skill.name}
											className={cn("py-1.5 text-sm", {
												"bg-primary/20 text-foreground hover:bg-foreground/30":
													skill.level === "Growing",
												"bg-green-500/20 text-green-500 hover:bg-green-500/30":
													skill.level === "Advanced",
												"bg-blue-500/20 text-blue-500 hover:bg-blue-500/30":
													skill.level === "Mid",
												"bg-amber-500/20 text-amber-500 hover:bg-amber-500/30":
													skill.level === "Beginner",
											})}
											variant="outline"
										>
											{skill.name}
											<span className="ml-2 text-xs opacity-70">{skill.level}</span>
										</Badge>
									))}
								</div>
							</TabsContent>
						))}
					</div>
				</Tabs>
			</CardContent>
		</Card>
	);
}
