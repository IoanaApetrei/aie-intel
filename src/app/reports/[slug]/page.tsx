import { getReportBySlug, getAllReportSlugs } from '@/lib/reports'
import ReportViewer from '@/components/ReportViewer'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllReportSlugs().map(slug => ({ slug }))
}

export default async function ReportPage({ params }: { params: { slug: string } }) {
  const report = getReportBySlug(params.slug)
  if (!report) notFound()

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="h-14 shrink-0 bg-[#0D1117] border-b border-gray-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            AI
          </div>
          <span className="font-semibold text-gray-100 text-sm">Weekly Intelligence</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
            </svg>
            {format(parseISO(report.meta.date), 'EEEE, MMMM d, yyyy')}
          </div>
          <Link href="/" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
            ← Latest
          </Link>
        </div>
      </header>
      <ReportViewer source={report.content} date={report.meta.date} />
    </div>
  )
}
