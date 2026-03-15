import { MDXRemote } from 'next-mdx-remote/rsc'
import { parseReport } from '@/lib/parseReport'
import { format, parseISO } from 'date-fns'

interface Props {
  source: string
  date: string
}

function badgify(html: string): string {
  return html
    .replace(/\bHigh\b/g, '<span class="badge-high">High</span>')
    .replace(/\bMedium\b/g, '<span class="badge-medium">Medium</span>')
    .replace(/\bLow\b/g, '<span class="badge-low">Low</span>')
}

export default function ReportViewer({ source, date }: Props) {
  const parsed = parseReport(source)

  return (
    <div className="flex h-[calc(100vh-56px)]">

      {/* ── Fixed sidebar ───────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="px-4 pt-5 pb-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Sections</p>
        </div>
        <nav className="flex-1 px-2 pb-6 space-y-0.5">
          <a
            href="#tldr"
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <span className="text-base">📌</span>
            <span className="font-medium">TL;DR</span>
          </a>
          {parsed.sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <span className="text-base">{s.emoji}</span>
              <span>{s.title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* ── Scrollable main ─────────────────────────── */}
      <main className="flex-1 overflow-y-auto">

        {/* Date + intro */}
        <div className="px-10 pt-8 pb-2">
          <p className="text-xs font-mono text-gray-400">
            {date ? format(parseISO(date), 'EEEE, MMMM d, yyyy') : ''}
          </p>
        </div>

        {/* TL;DR hero */}
        <section id="tldr" className="mx-8 mb-2 rounded-xl border border-blue-100 bg-blue-50 px-8 py-6">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>📌</span> TL;DR
          </h2>
          <ul className="space-y-3">
            {parsed.tldr.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-800 leading-relaxed">
                <span className="text-blue-500 font-bold shrink-0 mt-0.5">→</span>
                <span dangerouslySetInnerHTML={{
                  __html: badgify(bullet.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'))
                }} />
              </li>
            ))}
          </ul>
        </section>

        {/* Sections */}
        {parsed.sections.map(section => (
          <section key={section.id} id={section.id} className="mx-8 mb-1 border-t border-gray-200 py-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-lg shrink-0">
                {section.emoji}
              </div>
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                {section.title}
              </h2>
            </div>
            <SectionContent content={section.content} />
          </section>
        ))}

        <div className="h-16" />
      </main>
    </div>
  )
}

// Server component wrapper so each section renders MDX independently
function SectionContent({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none">
      <MDXRemote source={content} />
    </div>
  )
}
