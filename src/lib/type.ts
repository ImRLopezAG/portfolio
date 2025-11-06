import type * as schema from "@lib/schemas";
import type { projects, skills } from "@shared/cv";
import type { ComponentPropsWithoutRef } from "react";
import type { z } from "zod";
import type { ReactNode } from "react";
declare global {
	interface Props {
		children?: React.ReactNode;
		className?: string;
	}
	interface ParamsProps {
		searchParams: Promise<Record<string, string>>;
		params: Promise<Record<string, string>>;
	}

	type BlogMetadata = z.infer<typeof schema.metadataSchema>;
	type Email = z.infer<typeof schema.emailSchema>;
	type Projects = (typeof projects)[number];

	type Skill = (typeof skills)[number];

	type HeadingProps = ComponentPropsWithoutRef<"h1">;
	type ParagraphProps = ComponentPropsWithoutRef<"p">;
	type ListProps = ComponentPropsWithoutRef<"ul">;
	type ListItemProps = ComponentPropsWithoutRef<"li">;
	type AnchorProps = ComponentPropsWithoutRef<"a">;
	type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
	type CodeProps = ComponentPropsWithoutRef<"code">;
	type PreProps = ComponentPropsWithoutRef<"pre"> & {
		"data-filename"?: string;
		"data-theme"?: string;
		"data-line-count"?: number;
	};

	export interface TOCItemType {
		title: ReactNode;
		url: string;
		depth: number;
	}
	
	export type TableOfContents = TOCItemType[];

	/*!
 * reading-time
 * Copyright (c) Nicolas Gryman <ngryman@gmail.com>
 * MIT Licensed
 */

export type Options = {
  wordBound?: (char: string) => boolean;
  wordsPerMinute?: number;
}

export type ReadingTimeStats = {
  time: number;
  minutes: number;
}

export type WordCountStats = {
  total: number;
}

export type ReadingTimeResult = ReadingTimeStats & {
  words: WordCountStats;
}
}
