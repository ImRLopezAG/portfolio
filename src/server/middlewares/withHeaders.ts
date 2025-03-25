import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export const withHeaders: MiddlewareFactory = (next: NextMiddleware) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const res = await next(request, _next)
		if (res) {
			res.headers.set('x-developer', 'imrlopez.dev')
		}

		return res
	}
}
