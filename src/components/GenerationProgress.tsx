'use client'

import { MODULES } from '@/lib/types'

interface GenerationProgressProps {
  selectedModules: string[]
  moduleStatuses: Record<string, 'pending' | 'generating' | 'completed' | 'error'>
}

export default function GenerationProgress({ selectedModules, moduleStatuses }: GenerationProgressProps) {
  const total = selectedModules.length
  const completed = selectedModules.filter((id) => moduleStatuses[id] === 'completed').length
  const progress = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className="space-y-4 rounded-xl border border-cs-border bg-cs-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-cs-text">Generating concept...</h3>
        <span className="text-xs text-cs-text-muted">{completed}/{total} modules</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-cs-border overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cs-accent to-indigo-400 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Module status list */}
      <div className="grid gap-2">
        {selectedModules.map((id) => {
          const mod = MODULES.find((m) => m.id === id)
          const status = moduleStatuses[id] || 'pending'
          if (!mod) return null

          return (
            <div key={id} className="flex items-center gap-3 text-sm">
              <StatusIcon status={status} />
              <span className="text-lg">{mod.icon}</span>
              <span className={status === 'completed' ? 'text-cs-text' : 'text-cs-text-muted'}>
                {mod.label}
              </span>
              <span className="ml-auto text-xs text-cs-text-muted">
                {status === 'pending' && 'Waiting...'}
                {status === 'generating' && 'Generating...'}
                {status === 'completed' && '✓ Done'}
                {status === 'error' && '✗ Error'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'completed') {
    return (
      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
    )
  }
  if (status === 'generating') {
    return (
      <div className="h-2.5 w-2.5 rounded-full bg-cs-accent animate-pulse" />
    )
  }
  if (status === 'error') {
    return (
      <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
    )
  }
  return (
    <div className="h-2.5 w-2.5 rounded-full bg-cs-border" />
  )
}