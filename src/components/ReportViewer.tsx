import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'

interface Props {
  source: string
}

export default function ReportViewer({ source }: Props) {
  return (
    <article className="prose prose-invert max-w-none">
      <MDXRemote source={source} />
    </article>
  )
}
