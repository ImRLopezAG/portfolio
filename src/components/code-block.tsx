'use client'
import type React from 'react'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'
import { CodeIcon } from './annotations/icons'

type CodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
  filename?: string
  'data-language'?: string
  'data-meta'?: string
	lineCount?: number
}

export function CodeBlock({
  children,
  className,
  filename,
  'data-meta': dataMeta,
  lineCount,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const copyToClipboard = async () => {
    if (preRef.current) {
      try {
        await navigator.clipboard.writeText(preRef.current.textContent || '')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    }
  }

  // Extract filename from data-meta or use default
  const extractedFilename = filename || dataMeta?.match(/filename=([^\s,]+)/)?.[1] || 'plain.txt'

  return (
    <div className='not-prose my-6 overflow-hidden rounded-lg border bg-zinc-900 text-white'>
      <div className='flex items-center justify-between border-stone-700 border-b bg-stone-900 px-4 py-2'>
        <div className='flex items-center gap-6 text-muted-foreground text-sm'>
          <CodeIcon title={extractedFilename} />
          <span>{extractedFilename !== 'plain.txt' && extractedFilename}</span>
        </div>
        <button
          type='button'
          onClick={copyToClipboard}
          className='rounded-md bg-stone-900 p-1.5 text-muted-foreground hover:bg-stone-800'
          aria-label='Copy code'
        >
          {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
          <span className='sr-only'>Copy code</span>
        </button>
      </div>

      <div className='flex'>
        <div className='select-none bg-zinc-900 px-4 py-4 text-right text-muted-foreground text-sm'>
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className='leading-relaxed'>{i + 1}</div>
          ))}
        </div>

        <pre
          ref={preRef}
          className={cn('overflow-x-auto p-4 text-sm leading-relaxed', className)}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  )
}
