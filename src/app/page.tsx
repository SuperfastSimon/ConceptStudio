'use client'

import { useState, useCallback } from 'react'
import Header from '@/components/Header'
import PromptInput from '@/components/PromptInput'
import ModuleSelector from '@/components/ModuleSelector'
import PreferencesPanel from '@/components/PreferencesPanel'
import GenerationProgress from '@/components/GenerationProgress'
import ResultsViewer from '@/components/ResultsViewer'
import { generateConceptDemo } from '@/lib/api'
import { MODULES, GenerationStatus } from '@/lib/types'

export default function Home() {
  // --- State ---
  const [prompt, setPrompt] = useState('')
  const [selectedModules, setSelectedModules] = useState<string[]>(['brainstorm', 'business_plan'])
  const [preferences, setPreferences] = useState({
    style: '',
    industry: '',
    audience: '',
    budget: '',
    timeline: '',
    additionalNotes: '',
  })
  const [status, setStatus] = useState<GenerationStatus>('idle')
  const [moduleStatuses, setModuleStatuses] = useState<Record<string, 'pending' | 'generating' | 'completed' | 'error'>>({})
  const [results, setResults] = useState<Record<string, { status: string; content: string }>>({})
  const [showPrefs, setShowPrefs] = useState(false)

  // --- Handlers ---
  const toggleModule = useCallback((id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }, [])

  const handlePreferenceChange = useCallback((key: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim() || selectedModules.length === 0) return

    setStatus('generating')
    setResults({})

    // Initialize all modules as pending
    const initialStatuses: Record<string, 'pending' | 'generating' | 'completed' | 'error'> = {}
    selectedModules.forEach((id) => { initialStatuses[id] = 'pending' })
    setModuleStatuses(initialStatuses)

    // Simulate sequential generation with progress
    for (const modId of selectedModules) {
      setModuleStatuses((prev) => ({ ...prev, [modId]: 'generating' }))
      
      try {
        // Demo: generate one module at a time for visual effect
        const response = await generateConceptDemo({
          prompt,
          modules: [modId],
          ...preferences,
        })

        if (response.modules[modId]) {
          setResults((prev) => ({
            ...prev,
            [modId]: response.modules[modId],
          }))
        }

        setModuleStatuses((prev) => ({ ...prev, [modId]: 'completed' }))
      } catch {
        setModuleStatuses((prev) => ({ ...prev, [modId]: 'error' }))
      }
    }

    setStatus('completed')
  }

  const handleReset = () => {
    setStatus('idle')
    setResults({})
    setModuleStatuses({})
  }

  // --- Render ---
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero */}
        {status === 'idle' && (
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold gradient-text sm:text-5xl">
              Concept Studio
            </h1>
            <p className="mt-3 text-lg text-cs-text-muted">
              Generate complete business concepts with AI.
              <br className="hidden sm:block" />
              Brainstorms, blueprints, business plans, mockups & more.
            </p>
          </div>
        )}

        {/* Form */}
        {(status === 'idle' || status === 'error') && (
          <div className="space-y-8 rounded-2xl border border-cs-border bg-cs-card/50 p-6 sm:p-8">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              disabled={status === 'generating'}
            />

            <ModuleSelector
              selected={selectedModules}
              onToggle={toggleModule}
              disabled={status === 'generating'}
            />

            {/* Preferences toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowPrefs(!showPrefs)}
                className="text-sm text-cs-accent hover:text-cs-accent-hover transition-colors"
              >
                {showPrefs ? '▲ Hide preferences' : '▼ Advanced preferences'}
              </button>
              {showPrefs && (
                <div className="mt-4">
                  <PreferencesPanel
                    preferences={preferences}
                    onChange={handlePreferenceChange}
                    disabled={status === 'generating'}
                  />
                </div>
              )}
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || selectedModules.length === 0}
              className="w-full rounded-xl bg-cs-accent py-3.5 text-base font-semibold text-white hover:bg-cs-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed glow-accent"
            >
              ✨ Generate Concept ({selectedModules.length} module{selectedModules.length !== 1 ? 's' : ''})
            </button>
          </div>
        )}

        {/* Generating */}
        {status === 'generating' && (
          <div className="space-y-6">
            <GenerationProgress
              selectedModules={selectedModules}
              moduleStatuses={moduleStatuses}
            />

            {/* Show partial results as they come in */}
            {Object.keys(results).length > 0 && (
              <ResultsViewer
                results={results}
                selectedModules={selectedModules.filter((id) => results[id])}
              />
            )}
          </div>
        )}

        {/* Completed */}
        {status === 'completed' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold gradient-text">
                ✅ Concept Generated
              </h2>
              <button
                onClick={handleReset}
                className="rounded-lg border border-cs-border px-4 py-2 text-sm text-cs-text-muted hover:text-cs-text hover:border-cs-accent/50 transition-all"
              >
                ← New Concept
              </button>
            </div>

            <ResultsViewer
              results={results}
              selectedModules={selectedModules}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-cs-border/30 py-6 text-center text-xs text-cs-text-muted">
        Powered by AutoGPT · Concept Studio v1.0
      </footer>
    </>
  )
}