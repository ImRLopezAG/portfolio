import { Text } from 'lucide-react'
import {
	type TOCItemType,
	TocPopover,
	TocPopoverContent,
	TocPopoverTrigger,
} from './toc/index'
import { AnchorProvider } from './toc/primitive'
import { TOCScrollArea, Toc } from './toc/toc'
import ClerkTOCItems from './toc/toc-clerk'

interface Props {
	toc: TOCItemType[]
	header?: React.ReactNode
}

export function TOC({ toc, header }: Props) {
	return (
		<AnchorProvider toc={toc}>
			<Toc>
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

export function TOCPopover({ toc, path }: TOCPopoverProps) {
	return (
		<TocPopover className='h-12'>
			<TocPopoverTrigger className='w-full' items={toc} path={path} />
			<TocPopoverContent>
				<TOCScrollArea isMenu>
					<ClerkTOCItems items={toc} />
				</TOCScrollArea>
			</TocPopoverContent>
		</TocPopover>
	)
}
