'use client'

import { useState } from 'react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="glass sticky top-0 z-50 border-b border-cs-border/50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cs-accent/20">
            <span className="text-lg">💡</span>
          </div>
          <span className="text-lg font-bold gradient-text">Concept Studio</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#" className="text-sm text-cs-text-muted hover:text-cs-text transition-colors">Dashboard</a>
          <a href="#" className="text-sm text-cs-text-muted hover:text-cs-text transition-colors">History</a>
          <a href="#" className="text-sm text-cs-text-muted hover:text-cs-text transition-colors">Templates</a>
          <button className="rounded-lg bg-cs-accent px-4 py-2 text-sm font-medium text-white hover:bg-cs-accent-hover transition-colors">
            New Concept
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-cs-text-muted hover:text-cs-text md:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-cs-border/50 px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            <a href="#" className="text-sm text-cs-text-muted hover:text-cs-text">Dashboard</a>
            <a href="#" className="text-sm text-cs-text-muted hover:text-cs-text">History</a>
            <a href="#" className="text-sm text-cs-text-muted hover:text-cs-text">Templates</a>
            <button className="rounded-lg bg-cs-accent px-4 py-2 text-sm font-medium text-white">
              New Concept
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}