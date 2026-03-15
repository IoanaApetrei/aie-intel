import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const REPORTS_DIR = path.join(process.cwd(), 'reports')

export interface ReportMeta {
  slug: string        // YYYY-MM-DD
  date: string
  title: string
}

export function getAllReportSlugs(): string[] {
  if (!fs.existsSync(REPORTS_DIR)) return []
  return fs
    .readdirSync(REPORTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
    .sort()
    .reverse()
}

export function getReportBySlug(slug: string): { meta: ReportMeta; content: string } | null {
  const filePath = path.join(REPORTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    meta: {
      slug,
      date: slug,
      title: data.title || `Weekly Intel — ${slug}`,
    },
    content,
  }
}

export function getLatestReport() {
  const slugs = getAllReportSlugs()
  if (slugs.length === 0) return null
  return getReportBySlug(slugs[0])
}
