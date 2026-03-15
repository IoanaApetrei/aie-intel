import { getLatestReport, getAllReportSlugs } from '@/lib/reports'
import ReportViewer from '@/components/ReportViewer'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export const revalidate = 0

export default async function Home() {
  const latest = getLatestReport()
  const allSlugs = getAllReportSlugs()

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-[#1E2A3A] bg-[#0B0F1A]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">AI</div>
            <span className="text-sm font-semibold text-slate-200">AI Enabler Strategic Intel</span>
            <span className="hidden sm:inline text-xs text-slate-600">·</span>
            <span className="hidden sm:inline text-xs text-slate-500">Cast AI · Weekly</span>
          </div>

          {/* Archive switcher */}
          {allSlugs.length > 1 && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 mr-1">Archive:</span>
              {allSlugs.slice(0, 6).map((slug, i) => (
                <Link
                  key={slug}
                  href={i === 0 ? '/' : `/reports/${slug}`}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    i === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#131929] text-slate-400 hover:bg-[#1E2A3A] hover:text-slate-200 border border-[#1E2A3A]'
                  }`}
                >
                  {slug}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {!latest ? (
          <div className="text-center py-24 text-slate-500">
            <p className="text-lg">No reports yet.</p>
            <p className="text-sm mt-2">First report drops Monday 08:00 UTC.</p>
          </div>
        ) : (
          <ReportViewer source={latest.content} date={latest.meta.date} />
        )}
      </main>
    </div>
  )
}
