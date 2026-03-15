export interface ReportSection {
  id: string
  title: string
  emoji: string
  content: string
}

export interface ParsedReport {
  title: string
  date: string
  tldr: string[]
  sections: ReportSection[]
}

const SECTION_MAP: Record<string, { emoji: string; label: string }> = {
  'pass 1': { emoji: '🏢', label: 'Competitive Activity' },
  'pass 2': { emoji: '⚡', label: 'GPU & Market' },
  'pass 3': { emoji: '🛠️', label: 'Agentic Coding' },
  'pass 4': { emoji: '🔍', label: 'Deep Dives' },
  'pass 5': { emoji: '💡', label: 'So What for AI Enabler' },
  'sources': { emoji: '📎', label: 'Sources' },
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getSectionMeta(heading: string): { emoji: string; label: string } {
  const lower = heading.toLowerCase()
  for (const [key, val] of Object.entries(SECTION_MAP)) {
    if (lower.includes(key)) return val
  }
  return { emoji: '📄', label: heading }
}

export function parseReport(content: string): ParsedReport {
  const lines = content.split('\n')

  let title = ''
  let date = ''
  const tldr: string[] = []
  const sections: ReportSection[] = []

  let inTldr = false
  let currentSection: { id: string; title: string; emoji: string; lines: string[] } | null = null

  for (const line of lines) {
    // Title (h1)
    if (line.startsWith('# ') && !title) {
      title = line.replace(/^# /, '').replace(/📊\s*/, '').trim()
      const dateMatch = title.match(/(\d{4}-\d{2}-\d{2})/)
      if (dateMatch) date = dateMatch[1]
      continue
    }

    // TL;DR section
    if (line.match(/^## TL;DR/i)) {
      inTldr = true
      continue
    }

    if (inTldr) {
      if (line.startsWith('## ')) {
        inTldr = false
        // fall through to section handling
      } else {
        const bullet = line.replace(/^[-*]\s+\*\*/, '').replace(/^[-*]\s+/, '').trim()
        if (bullet) tldr.push(bullet)
        continue
      }
    }

    // H2 = new section
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections.push({
          id: currentSection.id,
          title: currentSection.title,
          emoji: currentSection.emoji,
          content: currentSection.lines.join('\n'),
        })
      }
      const heading = line.replace(/^## /, '').trim()
      const meta = getSectionMeta(heading)
      currentSection = {
        id: slugify(heading),
        title: meta.label,
        emoji: meta.emoji,
        lines: [],
      }
      continue
    }

    if (currentSection) {
      currentSection.lines.push(line)
    }
  }

  // flush last section
  if (currentSection) {
    sections.push({
      id: currentSection.id,
      title: currentSection.title,
      emoji: currentSection.emoji,
      content: currentSection.lines.join('\n'),
    })
  }

  return { title, date, tldr, sections }
}
