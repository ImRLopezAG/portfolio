import type { Element, Root } from 'hast'
import { visit,  } from 'unist-util-visit'
import type { ShikiTransformer } from 'shiki'
export function rehypeExtractFileInfo() {
	return (tree: Root) => {
		visit(tree, "element", (node: Element) => {
			if (node.tagName !== "pre") return;

			const codeElement = node.children.find(
				(child): child is Element =>
					child.type === "element" && child.tagName === "code",
			);

			if (!codeElement) return;

			const lineCount = codeElement.children.reduce((count, child) => {
				if (child.type === "text") {
					return count + (child.value.match(/\n/g)?.length || 0);
				}
				return count;
			}, 1); // Start with 1 for the first line

			if (!node.properties) node.properties = {};
			node.properties["data-line-count"] = lineCount;
		
			const meta = codeElement.data?.meta as string | undefined;
			if (meta) {
				const filenameMatch = meta.match(/filename=([^\s,]+)/);
				if (filenameMatch) {
					if (!node.properties) node.properties = {};
					node.properties["data-filename"] = filenameMatch[1];
				}
			}
		});
	};
}

export const metaTransformer: ShikiTransformer = {
	name: 'meta-transformer',
	preprocess(code, opts) {
		// @ts-ignore
		this.metaStore = opts.meta?.__raw;
		// @ts-ignore
		this.cleanCode = code;
		return code;
	},
	pre(hast) {
		// @ts-ignore
		const meta = this.metaStore;
		// @ts-ignore
		const cleanCode = this.cleanCode;
		if (meta) {
			hast.properties = {
				...hast.properties,
				'data-meta': meta,
				'data-code': cleanCode,
			};
		}
		return hast;
	}
}