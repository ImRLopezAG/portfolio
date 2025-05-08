import { Text } from 'lucide-react'
import {
	type TOCItemType,
	TocPopover,
	TocPopoverContent,
	TocPopoverTrigger,
} from './toc/popover'
import { AnchorProvider } from './toc/primitive'
import { TOCScrollArea, Toc } from './toc/toc'
import ClerkTOCItems from './toc/toc-clerk'
import type {
	 HTMLAttributes,
} from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
	toc: TOCItemType[]
	header?: React.ReactNode
}

export function TOC({ toc, header, ...props }: Props) {
	return (
		<AnchorProvider toc={toc}>
			<Toc {...props}>
				{header || (
					<h3 className='inline-flex items-center gap-1.5 text-muted-foreground text-sm'>
						<Text className='size-4' />
						On this page
					</h3>
				)}
				<TOCScrollArea>
					<ClerkTOCItems items={toc} />
				</TOCScrollArea>
			</Toc>
		</AnchorProvider>
	)
}

interface TOCPopoverProps extends Props {
	path: string
}

export function TOCPopover({ toc, path, ...props }: TOCPopoverProps) {
	return (
		<AnchorProvider toc={toc}>
			<TocPopover className='w-full'>
				<TocPopoverTrigger items={toc} path={path} className='w-full' />
				<TocPopoverContent>
					<TOCScrollArea isMenu>
						<Toc {...props}>
							<ClerkTOCItems items={toc} />
						</Toc>
					</TOCScrollArea>
				</TocPopoverContent>
			</TocPopover>
		</AnchorProvider>
	)
}
