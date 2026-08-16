'use client'

import { cn } from '@lib/utils'
import { Play, RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { ClaudeDiff } from '@/components/brainless/claude/claude-diff'
import { ClaudeMessage } from '@/components/brainless/claude/claude-message'
import { ClaudePrompt } from '@/components/brainless/claude/claude-prompt'
import { ClaudeThinking } from '@/components/brainless/claude/claude-thinking'
import { ClaudeTodoList } from '@/components/brainless/claude/claude-todo-list'
import { ClaudeToolCall } from '@/components/brainless/claude/claude-tool-call'

type Todo = { label: string; status: 'done' | 'active' | 'todo' }

interface Step {
	pass: number
	node: ReactNode
	todos: Todo[]
	failed?: boolean
}

interface LoopSessionProps {
	prompt: string
	cwd?: string
	labels?: { todos: string[]; running: string; done: string; idle: string }
	tick?: number
}

const EN = {
	todos: [
		'Grill the requirements',
		'Write the plan',
		'Implement U3',
		'Green the suites',
	],
	running: 'running',
	done: 'all suites green',
	idle: 'run',
}

/**
 * The loop as a real Claude Code session: a fixed-height terminal that scrolls
 * its own history, so it never grows the article. The turn replays step by
 * step, the suite fails twice, and only the third pass goes green.
 */
export function LoopSession({
	prompt,
	cwd = '~/dev/one-office',
	labels = EN,
	tick = 900,
}: LoopSessionProps) {
	const todosAt = (state: Todo['status'][]): Todo[] =>
		labels.todos.map((label, i) => ({ label, status: state[i] }))

	const steps: Step[] = [
		{
			pass: 1,
			todos: todosAt(['active', 'todo', 'todo', 'todo']),
			node: (
				<ClaudeMessage>
					Before I touch anything — which layer owns the effective range, and
					should an overlap reject or supersede?
				</ClaudeMessage>
			),
		},
		{
			pass: 1,
			todos: todosAt(['done', 'active', 'todo', 'todo']),
			node: (
				<ClaudeToolCall
					tool='Read'
					arg='convex/domain/catalog/commands.ts'
					result='Read 214 lines · catalog.sku.create'
				/>
			),
		},
		{
			pass: 1,
			todos: todosAt(['done', 'done', 'active', 'todo']),
			node: (
				<ClaudeDiff
					file='convex/domain/catalog/commands.ts'
					summary='Updated commands.ts with 24 additions'
					lines={[
						{ type: 'ctx', n: 61, text: '  operations: {' },
						{
							type: 'add',
							n: 62,
							text: "    'catalog.price-list-item.create':",
						},
						{ type: 'add', n: 63, text: '      catalogOperation(' },
						{ type: 'add', n: 64, text: '        createPriceListItemSchema,' },
						{ type: 'ctx', n: 65, text: '      ),' },
					]}
				/>
			),
		},
		{
			pass: 1,
			failed: true,
			todos: todosAt(['done', 'done', 'done', 'active']),
			node: (
				<ClaudeToolCall
					tool='Bash'
					arg='bun test convex/domain/catalog'
					status='error'
					result='140 pass · 2 fail'
					defaultOpen
				>
					{`✗ price list › rejects an overlapping effective range
  expected VALIDATION_FAILED, received undefined
✗ price list › money parsed at price scale
  expected 1250 (scale 2), received 12.5`}
				</ClaudeToolCall>
			),
		},
		{
			pass: 2,
			todos: todosAt(['done', 'done', 'active', 'todo']),
			node: (
				<ClaudeDiff
					file='convex/domain/catalog/rules.ts'
					summary='Updated rules.ts with 11 additions'
					lines={[
						{ type: 'add', n: 88, text: 'assertNoOverlap(existing, next, {' },
						{ type: 'add', n: 89, text: "  field: 'effectiveFrom'," },
						{ type: 'add', n: 90, text: '})' },
					]}
				/>
			),
		},
		{
			pass: 2,
			failed: true,
			todos: todosAt(['done', 'done', 'done', 'active']),
			node: (
				<ClaudeToolCall
					tool='Bash'
					arg='bun test convex/domain/catalog'
					status='error'
					result='141 pass · 1 fail'
					defaultOpen
				>
					{`✗ price list › rejects an overlapping effective range
  boundary is inclusive — same-day ranges still collide`}
				</ClaudeToolCall>
			),
		},
		{
			pass: 3,
			todos: todosAt(['done', 'done', 'active', 'todo']),
			node: (
				<ClaudeDiff
					file='convex/domain/catalog/rules.ts'
					summary='Updated rules.ts with 1 addition and 1 removal'
					lines={[
						{ type: 'del', n: 88, text: 'if (next.from < existing.to) {' },
						{ type: 'add', n: 88, text: 'if (next.from <= existing.to) {' },
					]}
				/>
			),
		},
		{
			pass: 3,
			todos: todosAt(['done', 'done', 'done', 'done']),
			node: (
				<ClaudeToolCall
					tool='Bash'
					arg='bun test convex/domain/catalog'
					result='142 pass · 0 fail in 3.2s'
				/>
			),
		},
	]

	const [shown, setShown] = useState(steps.length)
	const [running, setRunning] = useState(false)
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

	useEffect(() => {
		if (!running) return
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setShown(steps.length)
			setRunning(false)
			return
		}
		if (shown >= steps.length) {
			setRunning(false)
			return
		}
		timer.current = setTimeout(() => setShown((n) => n + 1), tick)
		return () => clearTimeout(timer.current)
	}, [running, shown, steps.length, tick])

	const visible = steps.slice(0, shown)
	const pass = visible.at(-1)?.pass ?? 1
	const done = shown >= steps.length
	const failures = visible.filter((s) => s.failed).length

	return (
		<figure className='not-prose my-8 overflow-hidden rounded-xl border border-white/10 bg-[#16161e] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)]'>
			<div className='flex items-center gap-x-3 border-white/8 border-b px-4 py-2.5'>
				<span className='flex shrink-0 items-center gap-1.5'>
					<span className='size-2.5 rounded-full bg-[#f7768e]/60' />
					<span className='size-2.5 rounded-full bg-[#e0af68]/60' />
					<span className='size-2.5 rounded-full bg-[#4ea96f]/60' />
				</span>
				<span className='truncate font-mono text-[11px] text-white/40'>
					{cwd}
				</span>
				<span
					className={cn(
						'ml-auto shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px]',
						done
							? 'bg-[#4ea96f]/15 text-[#4ea96f]'
							: 'bg-[#e0af68]/15 text-[#e0af68]',
					)}
				>
					{done ? labels.done : `pass ${pass}`}
				</span>
				<button
					type='button'
					onClick={() => {
						setShown(0)
						setRunning(true)
					}}
					disabled={running}
					className='inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/12 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/75 transition-colors hover:border-[#4ea96f]/40 hover:text-[#4ea96f] disabled:opacity-40'
				>
					{running ? (
						<>
							<span className='size-1.5 animate-pulse rounded-full bg-[#e0af68]' />
							{labels.running}
						</>
					) : done ? (
						<>
							<RotateCcw aria-hidden='true' className='size-3' />
							replay
						</>
					) : (
						<>
							<Play aria-hidden='true' className='size-3' />
							{labels.idle}
						</>
					)}
				</button>
			</div>

			{/* Fixed height with its own scroll — the transcript must never grow
			    the article. The column is reversed so the browser natively anchors
			    the view to the newest output: new entries rise from the bottom and
			    push history upward, like a real terminal. */}
			<div
				className='flex h-[26rem] overflow-y-auto overscroll-contain px-4 font-mono text-[#c0caf5] text-[12.5px] leading-[1.6] [&_pre]:text-[11px]'
				style={{ flexDirection: 'column-reverse' }}
			>
				<div className='flex flex-col gap-3 py-4'>
					{/* biome-ignore lint/a11y/useValidAriaRole: role is a ClaudeMessage prop, not an ARIA role */}
					<ClaudeMessage role='user'>{prompt}</ClaudeMessage>
					<ClaudeTodoList
						todos={
							visible.at(-1)?.todos ?? todosAt(['todo', 'todo', 'todo', 'todo'])
						}
					/>
					{visible.map((step, index) => (
						<motion.div
							// biome-ignore lint/suspicious/noArrayIndexKey: the transcript is append-only
							key={`${step.pass}-${index}`}
							initial={{ height: 0, opacity: 0, filter: 'blur(3px)' }}
							animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
							transition={{
								height: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
								opacity: { duration: 0.5, ease: 'easeOut' },
								filter: { duration: 0.5 },
							}}
							style={{ overflow: 'hidden' }}
						>
							{/* Reveal the content top-down inside the growing box, so a
							    block reads as streaming in rather than popping. */}
							<motion.div
								initial={{ y: -12 }}
								animate={{ y: 0 }}
								transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
							>
								{step.node}
							</motion.div>
						</motion.div>
					))}
					{running && (
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
						>
							<ClaudeThinking running />
						</motion.div>
					)}
				</div>
			</div>

			<div className='border-white/8 border-t px-4 pt-3 pb-2'>
				<ClaudePrompt />
			</div>

			<figcaption className='border-white/8 border-t px-4 py-2.5 text-white/35 text-xs'>
				{done
					? `${failures} failed passes before green — the loop is the part nobody shows you.`
					: 'Press run to watch a plan iterate until the suites pass.'}
			</figcaption>
		</figure>
	)
}
