import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Enabler Strategic Intel',
  description: 'Weekly strategic intelligence reports for Cast AI AI Enabler',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#0B0F1A] text-slate-300 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
