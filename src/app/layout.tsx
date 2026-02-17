import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Concept Studio – AI Business Concept Generator',
  description: 'Generate complete business concepts with AI. Brainstorms, blueprints, business plans, mockups, branding & more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cs-bg text-cs-text antialiased">
        <div className="relative min-h-screen">
          {/* Background gradient orbs */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
            <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
          </div>
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}