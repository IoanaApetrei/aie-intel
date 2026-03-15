'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

interface Props {
  source: MDXRemoteSerializeResult
}

export default function ReportViewer({ source }: Props) {
  return (
    <article className="prose prose-invert max-w-none">
      <MDXRemote {...source} />
    </article>
  )
}
