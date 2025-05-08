import { Text } from 'lucide-react'
import {
	type TOCItemType,
	TocPopover,
	TocPopoverContent,
	TocPopoverTrigger,
} from './toc/index'
import { AnchorProvider } from './toc/primitive'
import { TOCItems, TOCScrollArea, Toc } from './toc/toc'
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
		<AnchorProvider toc={toc}>
			<TocPopover>
				<TocPopoverTrigger items={toc} path={path} className='' />
				<TocPopoverContent>
					<TOCScrollArea isMenu>
						<Toc className=''>
							<ClerkTOCItems items={toc} />
						</Toc>
					</TOCScrollArea>
				</TocPopoverContent>
			</TocPopover>
		</AnchorProvider>
	)
}
