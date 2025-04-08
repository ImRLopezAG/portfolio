'use client'
import { useMDXComponents } from '@components/mdx-component'
import { rehypeExtractFilename } from '@lib/rehype-extract-filename'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { type Options, rehypePrettyCode } from 'rehype-pretty-code'

interface MdxRenderProps {
  source: string
}
export const MdxRender =({ source }: MdxRenderProps) => {
  const { theme } = useTheme()
  const [mdxContent, setMdxContent] = useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>> | null>(null)
  useEffect(() => {
    const serialization = async () => {
      const serialized = await serialize(source, {
        mdxOptions: {
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: theme === 'dark' ? 'one-dark-pro' : 'one-light',
                keepBackground: false
              } as Options,
            ],
            rehypeExtractFilename,
          ],
          remarkPlugins: [],
          format: 'mdx',
          
        },
      })
      setMdxContent(serialized)
    }
    serialization()
  }, [theme, source])
  if (!mdxContent) {
    return null
  }
  return (
    <MDXRemote {...mdxContent} components={useMDXComponents()} />
  )
}
