import {
	cachedPublicProcedure,
	createTRPCRouter,
	publicProcedure,
} from '@server/api/trpc'
import { getPost, getPosts } from '@server/services/post'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const postRouter = createTRPCRouter({
	getPosts: cachedPublicProcedure().query(async () => {
		const posts = await getPosts()
		return posts
	}),
	getPost: cachedPublicProcedure()
		.input(z.object({ slug: z.string() }))
		.query(async ({ input }) => {
			const post = await getPost({ slug: input.slug })
			const not_exist = post === null || post === undefined
			if (not_exist) {
				new TRPCError({
					code: 'NOT_FOUND',
					message: 'Post not found',
				})
			}
			return post as NonNullable<typeof post>
		}),
	getSlugs: cachedPublicProcedure().query(async () => {
		const posts = await getPosts()
		return posts.map((post) => ({
			slug: post.slug,
		}))
	}),
})
