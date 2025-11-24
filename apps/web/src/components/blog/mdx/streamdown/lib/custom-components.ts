const COMPONENT_TAG = 'streamdown-component'
const COMPONENT_REGEX = /<([A-Z][\w]*)\b([^>]*)\/>/gs

const escapeAttribute = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')

type ParsedAttributes = Record<string, unknown>

const encodeBase64 = (value: string) => {
	if (typeof Buffer !== 'undefined') {
		return Buffer.from(value, 'utf-8').toString('base64')
	}
	if (typeof btoa !== 'undefined') {
		return btoa(value)
	}
	throw new Error('Base64 encoding is not supported in this environment')
}

const decodeBase64 = (value: string) => {
	if (typeof Buffer !== 'undefined') {
		return Buffer.from(value, 'base64').toString('utf-8')
	}
	if (typeof atob !== 'undefined') {
		return atob(value)
	}
	throw new Error('Base64 decoding is not supported in this environment')
}

const encodeProps = (props: ParsedAttributes) =>
	encodeBase64(JSON.stringify(props))

export const decodeComponentProps = (encoded?: string): ParsedAttributes => {
	if (!encoded) return {}
	try {
		const json = decodeBase64(encoded)
		return JSON.parse(json) as ParsedAttributes
	} catch {
		return {}
	}
}

const readQuotedValue = (source: string, start: number) => {
	const quote = source[start]
	let i = start + 1
	let value = ''

	while (i < source.length) {
		const char = source[i]
		if (char === '\\') {
			value += char
			if (i + 1 < source.length) {
				value += source[i + 1]
				i += 2
				continue
			}
		}
		if (char === quote) {
			return { value: value, nextIndex: i + 1 }
		}
		value += char
		i += 1
	}

	throw new Error('Unterminated quoted string')
}

const readJsExpression = (source: string, start: number) => {
	let depth = 0
	let i = start
	let inSingle = false
	let inDouble = false
	let inTemplate = false
	let prev = ''

	while (i < source.length) {
		const char = source[i]

		if (!inDouble && !inTemplate && char === "'" && prev !== '\\') {
			inSingle = !inSingle
		} else if (!inSingle && !inTemplate && char === '"' && prev !== '\\') {
			inDouble = !inDouble
		} else if (!inSingle && !inDouble && char === '`' && prev !== '\\') {
			inTemplate = !inTemplate
		}

		if (!inSingle && !inDouble && !inTemplate) {
			if (char === '{') {
				depth += 1
			} else if (char === '}') {
				depth -= 1
				if (depth === 0) {
					const expression = source.slice(start + 1, i)
					return { expression, nextIndex: i + 1 }
				}
			}
		}

		prev = char
		i += 1
	}

	throw new Error('Unterminated JSX expression')
}

const evaluateExpression = (expression: string) => {
	const trimmed = expression.trim()
	if (!trimmed) return null
	try {
		// eslint-disable-next-line no-new-func
		return Function(`"use strict"; return (${trimmed});`)()
	} catch {
		return trimmed
	}
}

const parseAttributes = (input: string): ParsedAttributes => {
	const props: ParsedAttributes = {}
	let i = 0

	while (i < input.length) {
		while (i < input.length && /\s/.test(input[i])) i += 1
		if (i >= input.length) break

		const nameStart = i
		while (i < input.length && /[A-Za-z0-9:_-]/.test(input[i])) i += 1
		const name = input.slice(nameStart, i)
		if (!name) break

		while (i < input.length && /\s/.test(input[i])) i += 1
		if (i >= input.length || input[i] !== '=') {
			props[name] = true
			continue
		}

		i += 1 // skip '='
		while (i < input.length && /\s/.test(input[i])) i += 1
		if (i >= input.length) {
			props[name] = true
			break
		}

		const char = input[i]
		if (char === '"' || char === "'") {
			const { value, nextIndex } = readQuotedValue(input, i)
			props[name] = value
			i = nextIndex
			continue
		}

		if (char === '{') {
			const { expression, nextIndex } = readJsExpression(input, i)
			props[name] = evaluateExpression(expression)
			i = nextIndex
			continue
		}

		const valueStart = i
		while (i < input.length && !/\s/.test(input[i])) i += 1
		props[name] = input.slice(valueStart, i)
	}

	return props
}

export const transformCustomComponents = (markdown: string): string => {
	if (typeof markdown !== 'string' || !markdown.trim()) {
		return markdown
	}

	return markdown.replaceAll(
		COMPONENT_REGEX,
		(match, componentName, rawAttributes) => {
			try {
				const props = parseAttributes(rawAttributes ?? '')
				const encoded = encodeProps(props)
				return `<${COMPONENT_TAG} data-sd-component="${componentName}" data-sd-props="${escapeAttribute(encoded)}"></${COMPONENT_TAG}>`
			} catch {
				return match
			}
		},
	)
}
