import { getReportBySlug, getAllReportSlugs } from '@/lib/reports'
import ReportViewer from '@/components/ReportViewer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllReportSlugs().map(slug => ({ slug }))
}

export default async function ReportPage({ params }: { params: { slug: string } }) {
  const report = getReportBySlug(params.slug)
  if (!report) notFound()

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#1E2A3A] bg-[#0B0F1A]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">AI</div>
            <span className="text-sm font-semibold text-slate-200">AI Enabler Strategic Intel</span>
          </div>
          <Link href="/" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            ← Latest report
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <ReportViewer source={report.content} date={report.meta.date} />
      </main>
    </div>
  )
}
