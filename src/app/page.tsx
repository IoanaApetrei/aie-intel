import { getLatestReport, getAllReportSlugs } from '@/lib/reports'
import ReportViewer from '@/components/ReportViewer'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export const revalidate = 0

export default async function Home() {
  const latest = getLatestReport()
  const allSlugs = getAllReportSlugs()

  return (
    <div className="flex flex-col h-screen overflow-hidden">

      {/* ── Top bar ───────────────────────────────── */}
      <header className="h-14 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
            AI
          </div>
          <span className="font-semibold text-gray-900 text-sm">Weekly Intelligence</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Archive switcher */}
          {allSlugs.length > 1 && (
            <div className="flex items-center gap-1.5">
              {allSlugs.slice(0, 5).map((slug, i) => (
                <Link
                  key={slug}
                  href={i === 0 ? '/' : `/reports/${slug}`}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    i === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                >
                  {slug}
                </Link>
              ))}
            </div>
          )}

          {latest && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
              </svg>
              {format(parseISO(latest.meta.date), 'EEEE, MMMM d, yyyy')}
            </div>
          )}
        </div>
      </header>

      {/* ── Body ─────────────────────────────────── */}
      {!latest ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-lg font-medium">No reports yet</p>
            <p className="text-sm mt-1">First report drops Monday 08:00 UTC</p>
          </div>
        </div>
      ) : (
        <ReportViewer source={latest.content} date={latest.meta.date} />
      )}
    </div>
  )
}
