import { icons } from 'lucide-react'
import { memo } from 'react'

export const Icon = memo(({
  name,
  color,
  size,
  className
}: {
  name: keyof typeof icons
  color?: string
  size?: number
  className?: string
}) => {
  const LucideIcon = icons[name as keyof typeof icons]
  
  return <LucideIcon color={color} size={size} className={className} />
})