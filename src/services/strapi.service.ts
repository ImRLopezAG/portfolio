import fetchApi from '@lib/fetch'
import { blogPost, profile } from '@lib/schemas/strapi'
import { cacheLife } from 'next/cache'
import type { z } from 'zod'
export const strapi = {
	getPosts: async () => {
		'use cache'
		cacheLife('weeks')
		const data = await fetchApi<{ data: z.infer<typeof blogPost>[] }>({
			endpoint: 'posts',
			query: {
				populate: '*',
				sort: ['metadata.posting:desc'],
			},
		}).then((res) => blogPost.array().parse(res.data))
		return data
	},
	getPostBySlug: async (slug: string) => {
		'use cache'
		cacheLife('weeks')
		const data = await fetchApi<{ data: z.infer<typeof blogPost>[] }>({
			endpoint: 'posts',
			query: {
				filters: {
					metadata: {
						slug: {
							$eqi: slug,
						},
					},
				},
				populate: '*',
			},
		}).then((res) => {
			if (!res.data) return undefined
			const posts = blogPost.array().parse(res.data)
			if (posts.length === 0) return undefined
			return posts[0]
		})
		return data
	},
	profile: async () => {
		'use cache'
		cacheLife('weeks')
		const prof = await fetchApi<{ data: z.infer<typeof profile> }>({
			endpoint: 'profile',
			query: {
				populate: {
					projects: {
						populate: '*',
					},
					basics: {
						populate: '*',
					},
					languages: {
						populate: '*',
					},
					education: {
						populate: '*',
					},
					work: {
						populate: '*',
					},
				},
			},
		}).then((res) => res.data)
		const skills = await fetchApi<{ data: z.infer<typeof profile.shape.skills> }>({
			endpoint: 'skills',
			query: {
				populate: '*',
			},
		}).then((res) => res.data)
		const data = profile.parse({
			...prof,
			skills,
		})
		return data
	},
} as const
