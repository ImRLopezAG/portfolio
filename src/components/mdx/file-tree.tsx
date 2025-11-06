'use client'

import { cn } from '@lib/utils'
import {
	ChevronDown,
	ChevronRight,
	File,
	Folder,
	type LucideIcon,
} from 'lucide-react'
import React from 'react'

interface FileTreeDirectory {
	[key: string]: FileTreeItem
}

type FileTreeItem = string | FileTreeDirectory

interface FileTreeProps {
	files: Record<string, FileTreeItem>
	fileIcon?: LucideIcon
	folderIcon?: LucideIcon
	className?: string
}

export function FileTree({
	files,
	fileIcon: FileIcon = File,
	folderIcon: FolderIcon = Folder,
	className,
}: FileTreeProps) {
	return (
		<div className={cn('font-mono text-sm', className)}>
			<TreeNode
				files={files}
				fileIcon={FileIcon}
				folderIcon={FolderIcon}
				level={0}
			/>
		</div>
	)
}

interface TreeNodeProps {
	files: Record<string, FileTreeItem>
	fileIcon: LucideIcon
	folderIcon: LucideIcon
	level: number
}

function TreeNode({
	files,
	fileIcon: FileIcon,
	folderIcon: FolderIcon,
	level,
}: TreeNodeProps) {
	const entries = Object.entries(files)
	const folders = entries
		.filter(([_, value]) => typeof value === 'object')
		.sort(([keyA], [keyB]) => keyA.localeCompare(keyB))

	const fileEntries = entries
		.filter(([_, value]) => typeof value !== 'object')
		.sort(([keyA], [keyB]) => keyA.localeCompare(keyB))

	return (
		<ul className='space-y-1 not-prose'>
			{folders.map(([key, value]) => (
				<li key={key} className='relative'>
					<FolderNode
						name={key}
						content={value as Record<string, FileTreeItem>}
						fileIcon={FileIcon}
						folderIcon={FolderIcon}
						level={level}
					/>
				</li>
			))}

			{fileEntries.map(([key, value]) => (
				<li key={key} className='relative'>
					<FileNode
						name={key}
						extension={value as string}
						fileIcon={FileIcon}
						level={level + 0.8}
					/>
				</li>
			))}
		</ul>
	)
}

interface FileNodeProps {
	name: string
	extension: string
	fileIcon: LucideIcon
	level: number
}

function FileNode({
	name,
	extension,
	fileIcon: FileIcon,
	level,
}: FileNodeProps) {
	// Check if the filename already ends with the extension
	const shouldShowExtension =
		extension && !name.toLowerCase().endsWith(`.${extension.toLowerCase()}`)

	return (
		<div className='flex items-center py-1'>
			<div
				style={{ marginLeft: `${level * 1.5}rem` }}
				className='flex items-center'
			>
				<FileIcon className='mr-2 h-4 w-4 flex-shrink-0 text-muted-foreground' />
				<span>{name}</span>
				{shouldShowExtension && (
					<span className='text-muted-foreground'>.{extension}</span>
				)}
			</div>
		</div>
	)
}

interface FolderNodeProps {
	name: string
	content: Record<string, FileTreeItem>
	fileIcon: LucideIcon
	folderIcon: LucideIcon
	level: number
}

function FolderNode({
	name,
	content,
	fileIcon,
	folderIcon: FolderIcon,
	level,
}: FolderNodeProps) {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<>
			<button
				type='button'
				className='flex cursor-pointer items-center py-1'
				onClick={() => setIsOpen(!isOpen)}
			>
				<div
					style={{ marginLeft: `${level * 1.5}rem` }}
					className='flex items-center'
				>
					{isOpen ? (
						<ChevronDown className='mr-1 h-4 w-4 flex-shrink-0 text-muted-foreground' />
					) : (
						<ChevronRight className='mr-1 h-4 w-4 flex-shrink-0 text-muted-foreground' />
					)}
					<FolderIcon className='mr-2 h-4 w-4 flex-shrink-0 text-muted-foreground' />
					<span>{name}</span>
				</div>
			</button>
			{isOpen && (
				<div className='ml-4'>
					<TreeNode
						files={content}
						fileIcon={fileIcon}
						folderIcon={FolderIcon}
						level={level + 1}
					/>
				</div>
			)}
		</>
	)
}
