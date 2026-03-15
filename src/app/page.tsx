import { getLatestReport, getAllReportSlugs } from '@/lib/reports'
import { serialize } from 'next-mdx-remote/serialize'
import ReportViewer from '@/components/ReportViewer'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export const revalidate = 0

export default async function Home() {
  const latest = getLatestReport()
  const allSlugs = getAllReportSlugs()

  if (!latest) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Header />
        <div className="mt-16 text-center text-gray-500">
          <p className="text-lg">No reports yet.</p>
          <p className="text-sm mt-2">First report drops Monday 08:00 UTC.</p>
        </div>
      </main>
    )
  }

  const mdxSource = await serialize(latest.content)

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Header />

      {/* Archive nav */}
      {allSlugs.length > 1 && (
        <nav className="mt-6 flex flex-wrap gap-2">
          {allSlugs.map((slug) => (
            <Link
              key={slug}
              href={slug === allSlugs[0] ? '/' : `/reports/${slug}`}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                slug === allSlugs[0]
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
              }`}
            >
              {slug}
            </Link>
          ))}
        </nav>
      )}

      <div className="mt-8 text-xs text-gray-500 font-mono">
        Latest — {format(parseISO(latest.meta.date), 'MMMM d, yyyy')}
      </div>

      <div className="mt-6">
        <ReportViewer source={mdxSource} />
      </div>
    </main>
  )
}

function Header() {
  return (
    <header className="border-b border-gray-800 pb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          AI
        </div>
        <div>
          <h1 className="text-white font-semibold text-lg leading-none">AI Enabler Strategic Intel</h1>
          <p className="text-gray-500 text-xs mt-0.5">Cast AI · Weekly · Every Monday 08:00 UTC</p>
        </div>
      </div>
    </header>
  )
}
