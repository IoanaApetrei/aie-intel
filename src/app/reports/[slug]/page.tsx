import { getReportBySlug, getAllReportSlugs } from '@/lib/reports'
import { serialize } from 'next-mdx-remote/serialize'
import ReportViewer from '@/components/ReportViewer'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = getAllReportSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ReportPage({ params }: { params: { slug: string } }) {
  const report = getReportBySlug(params.slug)
  if (!report) notFound()

  const mdxSource = await serialize(report.content)

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <header className="border-b border-gray-800 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg leading-none">AI Enabler Strategic Intel</h1>
              <p className="text-gray-500 text-xs mt-0.5">Cast AI · Weekly</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            ← Latest report
          </Link>
        </div>
      </header>

      <div className="mt-6 text-xs text-gray-500 font-mono">
        {format(parseISO(report.meta.date), 'MMMM d, yyyy')}
      </div>

      <div className="mt-6">
        <ReportViewer source={mdxSource} />
      </div>
    </main>
  )
}
