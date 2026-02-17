'use client'

import { MODULES, Module } from '@/lib/types'

interface ModuleSelectorProps {
  selected: string[]
  onToggle: (id: string) => void
  disabled?: boolean
}

const categoryLabels: Record<string, string> = {
  strategy: '📋 Strategy',
  creative: '💡 Creative',
  technical: '⚙️ Technical',
  visual: '🎨 Visual',
}

const categoryOrder = ['strategy', 'creative', 'technical', 'visual']

export default function ModuleSelector({ selected, onToggle, disabled }: ModuleSelectorProps) {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    modules: MODULES.filter((m) => m.category === cat),
  }))

  const allSelected = selected.length === MODULES.length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-cs-text">
          Select modules ({selected.length}/{MODULES.length})
        </label>
        <button
          type="button"
          onClick={() => {
            if (allSelected) {
              // Deselect all
              selected.forEach((id) => onToggle(id))
            } else {
              // Select all unselected
              MODULES.forEach((m) => {
                if (!selected.includes(m.id)) onToggle(m.id)
              })
            }
          }}
          disabled={disabled}
          className="text-xs text-cs-accent hover:text-cs-accent-hover transition-colors disabled:opacity-50"
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>
      </div>

      {grouped.map(({ category, label, modules }) => (
        <div key={category} className="space-y-2">
          <h3 className="text-xs font-medium text-cs-text-muted uppercase tracking-wider">
            {label}
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {modules.map((mod) => {
              const isSelected = selected.includes(mod.id)
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => onToggle(mod.id)}
                  disabled={disabled}
                  className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all disabled:opacity-50 ${
                    isSelected
                      ? 'border-cs-accent/60 bg-cs-accent/10 glow-accent'
                      : 'border-cs-border bg-cs-card hover:border-cs-border/80'
                  }`}
                >
                  <span className="text-xl leading-none mt-0.5">{mod.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-cs-text">{mod.label}</div>
                    <div className="text-xs text-cs-text-muted mt-0.5">{mod.description}</div>
                  </div>
                  {isSelected && (
                    <div className="ml-auto flex-shrink-0">
                      <svg className="h-5 w-5 text-cs-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}