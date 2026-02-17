import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Concept Studio — AI Business Concept Generator',
  description: 'Generate complete business concepts with AI. Brainstorms, blueprints, business plans, mockups & more.',
  openGraph: {
    title: 'Concept Studio',
    description: 'Generate complete business concepts with AI.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-cs-bg text-cs-text antialiased`}>
        {children}
      </body>
    </html>
  )
}