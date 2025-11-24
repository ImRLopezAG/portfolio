import type * as schema from '@lib/schemas'
import type { z } from 'zod'

declare global {
	type BlogPost = z.infer<typeof schema.blogPost>
	type Profile = z.infer<typeof schema.profile>
	type EmailForm = z.infer<typeof schema.emailSchema>
}
