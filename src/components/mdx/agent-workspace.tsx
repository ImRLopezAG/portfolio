'use client'
import { cn } from '@lib/utils'
import {
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	ChartNoAxesColumn,
	ChevronDown,
	ChevronRight,
	FileDiff,
	FolderGit2,
	FolderOpen,
	GitBranch,
	Globe,
	Kanban,
	Lock,
	Minus,
	MoreHorizontal,
	Plus,
	RotateCw,
	Search,
	Settings,
	SquarePen,
	SquareTerminal,
	Terminal as TerminalIcon,
	X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { TsIcon } from './file-icons'
import { Panel } from './panel'

interface Thread {
	name: string
	state: 'running' | 'idle' | 'green'
	branch?: string
	model?: string
	time?: string
}

interface Project {
	name: string
	threads: Thread[]
}

interface RunContent {
	prompt: string
	lines: string[]
	result: string
	files: { summary: string; chips: string[] }
	placeholder: string
}

interface AgentWorkspaceProps {
	projects: Project[]
	panels: { browser?: string[]; diff?: string[]; terminal?: string[] }
	run?: RunContent
	caption?: string
}

const DOT = {
	running: 'bg-amber-400 shadow-[0_0_8px_1px] shadow-amber-400/50',
	green: 'bg-emerald-400 shadow-[0_0_8px_1px] shadow-emerald-400/40',
	idle: 'bg-white/20',
} as const

const TABS = [
	{ id: 'browser', label: 'preview', icon: Globe },
	{ id: 'diff', label: 'diff', icon: FileDiff },
	{ id: 'terminal', label: 'terminal', icon: TerminalIcon },
] as const

const TIMES = ['10m', '12m', '2h', '11h', '1d']

const RUN_EN: RunContent = {
	prompt: 'implement U3 from the plan',
	lines: [
		'Mirrored catalog.sku.create for the new operation.',
		'Overlap rule added in rules.ts with an inclusive boundary.',
		'Typecheck, lint and the domain suites all passed.',
	],
	result: '142 passed · 0 failed',
	files: {
		summary: '3 changed files +128 −14',
		chips: ['commands.ts', 'rules.ts', 'catalog.ts'],
	},
	placeholder:
		'Ask anything, @tag files/folders, $use skills, or / for commands',
}

/**
 * A working replica of the agentic IDE window: purple-tinted title bar,
 * project cards with branch, model and age in the sidebar, the active run's
 * summary with its changed-files card above a full composer (model, effort,
 * access, send), and a right pane framed as a browser that really switches
 * between the app preview, the diff and the terminal.
 */
export function AgentWorkspace({
	projects,
	panels,
	run = RUN_EN,
	caption,
}: AgentWorkspaceProps) {
	const [tab, setTab] = useState<(typeof TABS)[number]['id']>('browser')
	const first = projects[0]?.threads[0]
	const [thread, setThread] = useState<Thread | undefined>(first)
	const project =
		projects.find((p) => p.threads.some((t) => t.name === thread?.name))
			?.name ?? projects[0]?.name
	const model = thread?.model ?? 'claude-fable-5'

	return (
		<Panel>
			{/* Title bar */}
			<div className='flex items-center gap-2 border-white/8 border-b bg-gradient-to-r from-[#2b2250]/80 via-[#1c1836]/60 to-transparent px-3 py-2'>
				<span className='flex items-center gap-1.5'>
					<span className='flex size-3 items-center justify-center rounded-full bg-red-500/80'>
						<X aria-hidden='true' className='size-2 text-black/50' />
					</span>
					<span className='flex size-3 items-center justify-center rounded-full bg-amber-500/80'>
						<Minus aria-hidden='true' className='size-2 text-black/50' />
					</span>
					<span className='flex size-3 items-center justify-center rounded-full bg-emerald-500/80'>
						<Plus aria-hidden='true' className='size-2 text-black/50' />
					</span>
				</span>
				<Kanban aria-hidden='true' className='ml-2 size-3.5 text-white/50' />
				<span className='font-mono text-[11px] text-white/80'>
					T3 <span className='text-white/45'>Code</span>
				</span>
			</div>

			<div className='grid grid-cols-[minmax(0,11.5rem)_minmax(0,1fr)] md:grid-cols-[13rem_minmax(0,1fr)_minmax(0,15rem)]'>
				{/* ── Sidebar ─────────────────────────────────────────── */}
				<div className='row-span-2 flex flex-col border-white/8 border-r bg-white/[0.015] md:row-span-1'>
					<div className='flex flex-1 flex-col gap-2 p-2.5'>
						<div className='flex items-center gap-2 px-1'>
							<span className='flex flex-1 items-center gap-1.5 font-mono text-[11px] text-white/40'>
								<Search aria-hidden='true' className='size-3.5' />
								Search
							</span>
							<SquarePen
								aria-hidden='true'
								className='size-3.5 text-white/30'
							/>
						</div>

						<div className='flex items-center gap-2 px-1 pt-1'>
							<span className='flex flex-1 items-center gap-1.5 font-mono text-[11px] text-white/55'>
								<FolderOpen aria-hidden='true' className='size-3.5' />
								All projects
							</span>
							<ChevronDown
								aria-hidden='true'
								className='size-3 text-white/25'
							/>
							<FolderGit2
								aria-hidden='true'
								className='size-3.5 text-white/25'
							/>
						</div>

						{projects.flatMap((p, pi) =>
							p.threads.map((item, ti) => {
								const active = thread?.name === item.name
								const time = item.time ?? TIMES[(pi * 2 + ti) % TIMES.length]
								return (
									<button
										key={item.name}
										type='button'
										onClick={() => setThread(item)}
										className={cn(
											'w-full rounded-lg px-2.5 py-2 text-left transition-colors',
											active
												? 'border border-white/10 bg-white/[0.06]'
												: 'border border-transparent hover:bg-white/[0.03]',
										)}
									>
										<span className='flex items-center gap-1.5 font-mono text-[10px] text-white/45'>
											<span
												className={cn(
													'size-1.5 shrink-0 rounded-full',
													DOT[item.state],
												)}
											/>
											<span className='truncate'>{p.name}</span>
											<span className='ml-auto shrink-0 text-white/25'>
												{time}
											</span>
										</span>
										<span
											className={cn(
												'mt-1 block truncate font-mono text-[11.5px]',
												active ? 'text-white/90' : 'text-white/60',
											)}
										>
											{item.name}
										</span>
										{item.branch && (
											<span className='mt-1 flex items-center gap-1.5 font-mono text-[9.5px] text-white/30'>
												<span className='truncate'>{item.branch}</span>
												<SquareTerminal
													aria-hidden='true'
													className='ml-auto size-3 shrink-0 text-white/25'
												/>
												<span className='flex size-3.5 shrink-0 items-center justify-center rounded-full bg-primary/25 text-[6px] text-primary'>
													{(item.model ?? model).slice(0, 2).toUpperCase()}
												</span>
											</span>
										)}
									</button>
								)
							}),
						)}

						<div className='flex items-center gap-2 px-1 pt-1 font-mono text-[10px] text-white/25'>
							<span>Settled (100)</span>
							<span className='h-px flex-1 bg-white/8' />
							<ChevronDown aria-hidden='true' className='size-3' />
						</div>
					</div>

					<div className='flex items-center gap-4 border-white/8 border-t px-3 py-2 text-white/30'>
						<Settings aria-hidden='true' className='size-3.5' />
						<GitBranch aria-hidden='true' className='size-3.5' />
						<ChartNoAxesColumn aria-hidden='true' className='size-3.5' />
						<RotateCw aria-hidden='true' className='ml-auto size-3' />
					</div>
				</div>

				{/* ── Center: the active thread ───────────────────────── */}
				<div className='flex min-w-0 flex-col border-white/8 border-b md:border-b-0'>
					<div className='flex items-center gap-1.5 border-white/8 border-b px-3 py-2'>
						<span className='flex min-w-0 items-center gap-1.5 font-mono text-[11px]'>
							<span className='text-white/40'>{project}</span>
							<span className='text-white/20'>/</span>
							<span className='truncate text-white/85'>{thread?.name}</span>
						</span>
						<span className='ml-auto flex shrink-0 items-center gap-1'>
							<span className='flex size-4.5 items-center justify-center rounded-md border border-white/10 text-white/40'>
								<Plus aria-hidden='true' className='size-2.5' />
							</span>
							<span className='flex h-4.5 items-center gap-1 rounded-md border border-white/10 px-1.5 text-white/40'>
								<GitBranch aria-hidden='true' className='size-2.5' />
								<ChevronDown aria-hidden='true' className='size-2.5' />
							</span>
						</span>
					</div>

					<div className='flex-1 space-y-2.5 p-3 font-mono text-[11px]'>
						<p className='rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-2 text-white/85'>
							{run.prompt}
						</p>
						<ul className='space-y-1.5 px-0.5 text-white/50'>
							{run.lines.map((line) => (
								<li key={line} className='flex gap-2'>
									<span className='text-white/25'>•</span>
									<span>{line}</span>
								</li>
							))}
						</ul>
						<p className='flex items-center gap-1.5 px-0.5 text-emerald-400/90'>
							<span className='size-1.5 rounded-full bg-emerald-400' />
							{run.result}
						</p>

						{/* Changed-files card */}
						<div className='rounded-lg border border-white/8 bg-white/[0.02] px-2.5 py-2'>
							<div className='flex items-center gap-1.5'>
								<ChevronRight
									aria-hidden='true'
									className='size-3 shrink-0 text-white/30'
								/>
								<p className='min-w-0 truncate text-white/70'>
									{run.files.summary.split(/(\+\S+|−\S+)/).map((part, i) =>
										part.startsWith('+') ? (
											// biome-ignore lint/suspicious/noArrayIndexKey: static split
											<span key={i} className='text-emerald-400/90'>
												{part}
											</span>
										) : part.startsWith('−') ? (
											// biome-ignore lint/suspicious/noArrayIndexKey: static split
											<span key={i} className='text-[#f7768e]'>
												{part}
											</span>
										) : (
											// biome-ignore lint/suspicious/noArrayIndexKey: static split
											<span key={i}>{part}</span>
										),
									)}
								</p>
								<span className='shrink-0 text-[9.5px] text-white/30'>
									Show files
								</span>
								<span className='ml-auto inline-flex shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[9.5px] text-white/60'>
									<FileDiff aria-hidden='true' className='size-2.5' />
									Open diff
								</span>
							</div>
							<div className='mt-1.5 flex flex-wrap items-center gap-1 pl-4'>
								{run.files.chips.map((chip) => (
									<span
										key={chip}
										className='inline-flex items-center gap-1 rounded border border-white/8 bg-white/[0.04] px-1.5 py-0.5 text-[9.5px] text-white/50'
									>
										<TsIcon className='size-2.5 rounded-[2px]' />
										{chip}
									</span>
								))}
								<span className='px-1 text-[9.5px] text-white/30'>
									Show all files
								</span>
							</div>
						</div>
					</div>

					{/* Composer */}
					<div className='m-2.5 mt-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5'>
						<p className='truncate font-mono text-[10.5px] text-white/25'>
							{run.placeholder}
						</p>
						<div className='mt-3 flex items-center gap-2.5'>
							<span className='flex items-center gap-1.5 font-mono text-[9.5px] text-white/50'>
								<span className='flex size-3.5 items-center justify-center rounded-full bg-primary/25 text-[6px] text-primary'>
									{model.slice(0, 2).toUpperCase()}
								</span>
								{model}
								<ChevronDown aria-hidden='true' className='size-2.5' />
							</span>
							<span className='flex shrink-0 items-center gap-1 border-white/10 border-l pl-2.5 font-mono text-[9.5px] text-white/40'>
								Low
								<ChevronDown aria-hidden='true' className='size-2.5' />
							</span>
							<span className='flex shrink-0 items-center gap-1 border-white/10 border-l pl-2.5 font-mono text-[9.5px] text-white/40'>
								<Lock aria-hidden='true' className='size-2.5' />
								Full access
								<ChevronDown aria-hidden='true' className='size-2.5' />
							</span>
							<span className='ml-auto flex items-center gap-2'>
								<span className='size-3.5 rounded-full border-2 border-white/15 border-t-white/50' />
								<span className='flex size-5 items-center justify-center rounded-full bg-primary/85'>
									<ArrowUp aria-hidden='true' className='size-3 text-black' />
								</span>
							</span>
						</div>
					</div>
					<div className='mx-2.5 mb-2.5 flex items-center rounded-lg border border-white/8 bg-white/[0.02] px-3 py-1.5 font-mono text-[9.5px] text-white/35'>
						<span className='flex items-center gap-1.5'>
							<FolderGit2 aria-hidden='true' className='size-3' />
							Local checkout
						</span>
						<span className='ml-auto flex items-center gap-1'>
							<GitBranch aria-hidden='true' className='size-2.5' />
							{thread?.branch ?? 'main'}
							<ChevronDown aria-hidden='true' className='size-2.5' />
						</span>
					</div>
				</div>

				{/* ── Right: browser-framed panel ─────────────────────── */}
				<div className='col-span-2 flex min-w-0 flex-col border-white/8 border-t md:col-span-1 md:border-t-0 md:border-l'>
					<div className='flex items-center gap-1 border-white/8 border-b px-1.5 pt-1.5'>
						{TABS.map(({ id, label, icon: Icon }) => (
							<button
								key={id}
								type='button'
								onClick={() => setTab(id)}
								className={cn(
									'relative inline-flex items-center gap-1.5 rounded-t-md px-2.5 py-1.5 font-mono text-[10px] transition-colors',
									tab === id
										? 'bg-white/[0.05] text-white/85'
										: 'text-white/35 hover:text-white/60',
								)}
							>
								<Icon aria-hidden='true' className='size-3' />
								{label}
								{tab === id && (
									<motion.span
										layoutId='workspace-tab'
										className='absolute inset-x-0 top-0 h-px bg-primary'
									/>
								)}
							</button>
						))}
						<Plus aria-hidden='true' className='ml-1 size-3 text-white/25' />
					</div>

					<AnimatePresence mode='wait' initial={false}>
						<motion.div
							key={tab}
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -6 }}
							transition={{ duration: 0.15 }}
							className='flex flex-1 flex-col'
						>
							{tab === 'browser' ? (
								<>
									<div className='flex items-center gap-1.5 border-white/8 border-b px-2 py-1.5 text-white/30'>
										<ArrowLeft aria-hidden='true' className='size-3' />
										<ArrowRight aria-hidden='true' className='size-3' />
										<RotateCw aria-hidden='true' className='size-2.5' />
										<span className='min-w-0 flex-1 truncate rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[9px] text-white/45'>
											{panels.browser?.[0] ?? 'localhost:3000'}
										</span>
										<MoreHorizontal aria-hidden='true' className='size-3' />
									</div>
									<div className='flex-1 space-y-1.5 bg-white/[0.02] p-3 font-mono text-[10px]'>
										{(panels.browser ?? []).slice(1).map((line) => (
											<p
												key={line}
												className={cn(
													'flex items-center gap-1.5',
													line.startsWith('●')
														? 'text-emerald-400/80'
														: 'text-white/50',
												)}
											>
												{line}
											</p>
										))}
										<div className='!mt-3 rounded-md bg-[#2454ff]/80 py-1.5 text-center text-[9.5px] text-white/90'>
											+ New campaign
										</div>
										<div className='grid grid-cols-2 gap-1.5 pt-1'>
											{['Active 0', 'Scheduled 0', 'Reached 0', 'Spend —'].map(
												(stat) => (
													<div
														key={stat}
														className='rounded-md border border-white/8 px-2 py-1.5 text-[9px] text-white/45'
													>
														{stat}
													</div>
												),
											)}
										</div>
									</div>
								</>
							) : (
								<div className='flex-1 overflow-x-auto p-3 font-mono text-[10.5px] leading-[1.7]'>
									{(panels[tab] ?? []).map((line, i) => (
										<p key={line} className='flex gap-2 whitespace-nowrap'>
											<span className='w-4 shrink-0 text-right text-white/15'>
												{i + 1}
											</span>
											<span
												className={cn(
													line.startsWith('+')
														? 'text-emerald-400/80'
														: line.startsWith('M')
															? 'text-amber-400/80'
															: line.startsWith('$')
																? 'text-white/75'
																: 'text-white/45',
												)}
											>
												{line}
											</span>
										</p>
									))}
								</div>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			{caption && (
				<figcaption className='border-white/8 border-t px-4 py-2.5 text-white/35 text-xs'>
					{caption}
				</figcaption>
			)}
		</Panel>
	)
}
