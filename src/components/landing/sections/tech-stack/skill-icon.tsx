import {
	AudioLines,
	Bot,
	Brain,
	ClipboardCheck,
	Database,
	type LucideIcon,
	MessageSquare,
	Network,
	Search,
	Workflow,
} from 'lucide-react'
import { Tech } from './tech'

const skillIcons: Record<string, LucideIcon> = {
	AudioLines,
	Bot,
	Brain,
	ClipboardCheck,
	Database,
	MessageSquare,
	Network,
	Search,
	Workflow,
}

type SkillIconProps = {
	skill: { name: string; logo?: string; invert?: boolean; icon?: string }
	className?: string
	priority?: boolean
}

export function SkillIcon({
	skill,
	className = 'size-6 shrink-0',
	priority = false,
}: SkillIconProps) {
	const Icon = skill.icon ? skillIcons[skill.icon] : undefined
	return Icon ? (
		<Icon className={className} aria-hidden />
	) : (
		<Tech
			name={skill.logo || skill.name}
			invert={skill.invert}
			className={className}
			priority={priority}
		/>
	)
}
