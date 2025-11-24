import qs from 'qs'
import { env } from '@lib/env'
interface Props {
	endpoint: string
	query?: qs.ParsedQs | string
	wrappedByKey?: string
	wrappedByList?: boolean
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @param token - Optional API token for authenticated requests
 * @returns
 */
export default async function fetchApi<T>({
	endpoint,
	query,
	wrappedByKey,
	wrappedByList,
}: Props): Promise<T> {
	try {
		if (endpoint.startsWith('/')) {
			endpoint = endpoint.slice(1)
		}
		const url = new URL(`${env.STRAPI_URL}/api/${endpoint}`)

		if (query) {
			url.search = qs.stringify(query)
		}

		const headers: HeadersInit = {}
		headers.Authorization = `Bearer ${env.STRAPI_API_TOKEN}`
		const res = await fetch(url.toString(), { headers })

		if (!res.ok) {
			console.error('Strapi API error:', await res.text())
			throw new Error(`Strapi API error: ${res.status} ${res.statusText}`)
		}

		let data = await res.json()

		if (wrappedByKey) {
			data = data[wrappedByKey]
		}

		if (wrappedByList) {
			data = data[0]
		}

		return data as T
	} catch (error) {
		console.error('Error fetching data from Strapi:', error)
		return {} as T
	}
}
