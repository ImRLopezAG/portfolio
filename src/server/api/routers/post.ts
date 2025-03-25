import { createTRPCRouter, publicProcedure } from '@server/api/trpc'
import { getPosts } from '@server/services/post'
import { z } from 'zod'

export const postRouter = createTRPCRouter({
	getPosts: publicProcedure.query(async () => {
		const posts = await getPosts()
		return posts
	}),
	getPost: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ input }) => {
			const posts = await getPosts()
			const post = posts.find((post) => post.slug === input.slug)

			if (!post) {
				throw new Error('Post not found')
			}

			return post
		}),
	getPostMetadata: publicProcedure
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
	getSlugs: publicProcedure.query(async () => {
		const posts = await getPosts()
		return posts.map((post) => ({
			slug: post.slug,
		}))
	}),
})
