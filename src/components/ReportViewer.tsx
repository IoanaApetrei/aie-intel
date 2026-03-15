import { MDXRemote } from 'next-mdx-remote/rsc'
import { parseReport } from '@/lib/parseReport'
import { format, parseISO } from 'date-fns'

interface Props {
  source: string
  date: string
}

export default function ReportViewer({ source, date }: Props) {
  const parsed = parseReport(source)

  return (
    <div className="flex gap-8 items-start">

      {/* ── Sidebar nav ── */}
      <aside className="hidden lg:block w-48 shrink-0 sticky top-8">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Sections</p>
        <nav className="space-y-1">
          <a href="#tldr" className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 py-1 transition-colors">
            <span>📌</span> TL;DR
          </a>
          {parsed.sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 py-1 transition-colors">
              <span>{s.emoji}</span> {s.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 space-y-4">

        {/* Date badge */}
        <p className="text-xs font-mono text-slate-500">
          {date ? format(parseISO(date), 'EEEE, MMMM d, yyyy') : ''}
        </p>

        {/* TL;DR hero */}
        <section id="tldr" className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-6">
          <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>📌</span> TL;DR
          </h2>
          <ul className="space-y-3">
            {parsed.tldr.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-200 leading-relaxed">
                <span className="text-blue-400 font-bold shrink-0 mt-0.5">→</span>
                <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
              </li>
            ))}
          </ul>
        </section>

        {/* Section cards */}
        {parsed.sections.map(section => (
          <section key={section.id} id={section.id} className="rounded-xl border border-[#1E2A3A] bg-[#131929] p-6">
            <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-5 flex items-center gap-2 pb-3 border-b border-[#1E2A3A]">
              <span>{section.emoji}</span> {section.title}
            </h2>
            <div className="prose prose-sm max-w-none">
              <MDXRemote source={section.content} />
            </div>
          </section>
        ))}

      </div>
    </div>
  )
}
