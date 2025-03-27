import { createTRPCRouter, publicProcedure, cachedPublicProcedure } from '@server/api/trpc'
import { getPosts } from '@server/services/post'
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
			const posts = await getPosts()
			const post = posts.find((post) => post.slug === input.slug)

			if (!post) {
				new TRPCError({
					code: 'NOT_FOUND',
					message: 'Post not found',
				})
			}

			return post as typeof posts[number]
		}),
	getPostMetadata: cachedPublicProcedure()
		.input(z.object({ slug: z.string() }))
		.query(async ({ input }) => {
			const posts = await getPosts()
			const post = posts.find((post) => post.slug === input.slug)

			if (!post) {
				throw new Error('Post not found')
			}

			return {
				...post.metadata,
				slug: post.slug,
				description: post.metadata.description || '',
			}
		}),
	getSlugs: cachedPublicProcedure().query(async () => {
		const posts = await getPosts()
		return posts.map((post) => ({
			slug: post.slug,
		}))
	}),
})
