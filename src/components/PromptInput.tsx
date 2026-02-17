'use client'

import { useState } from 'react'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const EXAMPLE_PROMPTS = [
  'A mobile app that helps freelancers track invoices and expenses with AI',
  'An AI-powered recipe platform that creates meal plans based on dietary goals',
  'A SaaS tool for real estate agents to generate property listings with AI',
  'A community marketplace for local artisans with AR product preview',
  'An EdTech platform that creates personalized coding curricula with AI',
]

export default function PromptInput({ value, onChange, disabled }: PromptInputProps) {
  const [showExamples, setShowExamples] = useState(false)

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-cs-text">
        Describe your concept
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Describe your business idea, product concept, or project..."
          className="w-full min-h-[120px] rounded-xl bg-cs-card border border-cs-border p-4 text-cs-text placeholder:text-cs-text-muted/50 focus:border-cs-accent focus:ring-1 focus:ring-cs-accent/50 focus:outline-none resize-y transition-colors disabled:opacity-50"
          rows={4}
        />
        <div className="absolute bottom-3 right-3 text-xs text-cs-text-muted">
          {value.length} chars
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowExamples(!showExamples)}
        className="text-xs text-cs-accent hover:text-cs-accent-hover transition-colors"
      >
        {showExamples ? 'Hide examples ▲' : 'Show examples ▼'}
      </button>

      {showExamples && (
        <div className="grid gap-2">
          {EXAMPLE_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => { onChange(prompt); setShowExamples(false) }}
              disabled={disabled}
              className="text-left rounded-lg border border-cs-border/50 bg-cs-card/50 p-3 text-sm text-cs-text-muted hover:text-cs-text hover:border-cs-accent/50 transition-all disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}