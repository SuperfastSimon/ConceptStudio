'use client'

import { useState } from 'react'
import { MODULES } from '@/lib/types'

interface ResultsViewerProps {
  results: Record<string, { status: string; content: string }>
  selectedModules: string[]
}

export default function ResultsViewer({ results, selectedModules }: ResultsViewerProps) {
  const [activeTab, setActiveTab] = useState(selectedModules[0] || '')
  const [copySuccess, setCopySuccess] = useState(false)

  const activeResult = results[activeTab]
  const activeMod = MODULES.find((m) => m.id === activeTab)

  const handleCopy = async () => {
    if (activeResult?.content) {
      await navigator.clipboard.writeText(activeResult.content)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const handleExportAll = () => {
    const allContent = selectedModules
      .map((id) => {
        const mod = MODULES.find((m) => m.id === id)
        const result = results[id]
        if (!mod || !result) return ''
        return `${result.content}\n\n---\n\n`
      })
      .join('')

    const blob = new Blob([allContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `concept-studio-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="rounded-xl border border-cs-border bg-cs-card overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-cs-border bg-cs-bg/50 p-2">
        {selectedModules.map((id) => {
          const mod = MODULES.find((m) => m.id === id)
          if (!mod) return null
          const isActive = activeTab === id

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-all ${
                isActive
                  ? 'bg-cs-accent/20 text-cs-accent font-medium'
                  : 'text-cs-text-muted hover:text-cs-text hover:bg-cs-card'
              }`}
            >
              <span>{mod.icon}</span>
              <span className="hidden sm:inline">{mod.label}</span>
            </button>
          )
        })}

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="rounded-lg px-3 py-1.5 text-xs text-cs-text-muted hover:text-cs-text hover:bg-cs-card transition-all"
          >
            {copySuccess ? '✓ Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleExportAll}
            className="rounded-lg bg-cs-accent/20 px-3 py-1.5 text-xs text-cs-accent hover:bg-cs-accent/30 transition-all"
          >
            Export All
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeResult ? (
          <div className="prose prose-invert prose-sm max-w-none">
            <div
              className="whitespace-pre-wrap text-sm text-cs-text leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(activeResult.content),
              }}
            />
          </div>
        ) : (
          <p className="text-sm text-cs-text-muted">Select a module tab to view results.</p>
        )}
      </div>
    </div>
  )
}

// Simple markdown renderer (basic)
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-cs-text mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold gradient-text mt-8 mb-3">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold gradient-text mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cs-text font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-cs-bg/80 px-1.5 py-0.5 rounded text-cs-accent text-xs">$1</code>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-cs-text-muted">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 text-cs-text-muted">$1</li>')
    .replace(/\n/g, '<br />')
}