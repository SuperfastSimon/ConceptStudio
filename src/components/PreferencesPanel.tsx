'use client'

interface PreferencesPanelProps {
  preferences: {
    style: string
    industry: string
    audience: string
    budget: string
    timeline: string
    additionalNotes: string
  }
  onChange: (key: string, value: string) => void
  disabled?: boolean
}

const STYLE_OPTIONS = ['Professional', 'Startup/Casual', 'Enterprise', 'Creative/Bold', 'Minimalist', 'Luxury']
const BUDGET_OPTIONS = ['Bootstrap (<$5K)', 'Seed ($5K-$50K)', 'Series A ($50K-$500K)', 'Growth ($500K+)', 'Not specified']
const TIMELINE_OPTIONS = ['1-3 months', '3-6 months', '6-12 months', '12+ months', 'As soon as possible']

export default function PreferencesPanel({ preferences, onChange, disabled }: PreferencesPanelProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-cs-text">
        Preferences <span className="text-cs-text-muted font-normal">(optional)</span>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Style */}
        <div className="space-y-1.5">
          <label className="text-xs text-cs-text-muted">Style / Tone</label>
          <select
            value={preferences.style}
            onChange={(e) => onChange('style', e.target.value)}
            disabled={disabled}
            className="w-full rounded-lg bg-cs-card border border-cs-border p-2.5 text-sm text-cs-text focus:border-cs-accent focus:outline-none disabled:opacity-50"
          >
            <option value="">Any style</option>
            {STYLE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Industry */}
        <div className="space-y-1.5">
          <label className="text-xs text-cs-text-muted">Industry</label>
          <input
            type="text"
            value={preferences.industry}
            onChange={(e) => onChange('industry', e.target.value)}
            disabled={disabled}
            placeholder="e.g. FinTech, Healthcare, EdTech"
            className="w-full rounded-lg bg-cs-card border border-cs-border p-2.5 text-sm text-cs-text placeholder:text-cs-text-muted/50 focus:border-cs-accent focus:outline-none disabled:opacity-50"
          />
        </div>

        {/* Audience */}
        <div className="space-y-1.5">
          <label className="text-xs text-cs-text-muted">Target Audience</label>
          <input
            type="text"
            value={preferences.audience}
            onChange={(e) => onChange('audience', e.target.value)}
            disabled={disabled}
            placeholder="e.g. Small business owners, Gen Z"
            className="w-full rounded-lg bg-cs-card border border-cs-border p-2.5 text-sm text-cs-text placeholder:text-cs-text-muted/50 focus:border-cs-accent focus:outline-none disabled:opacity-50"
          />
        </div>

        {/* Budget */}
        <div className="space-y-1.5">
          <label className="text-xs text-cs-text-muted">Budget Range</label>
          <select
            value={preferences.budget}
            onChange={(e) => onChange('budget', e.target.value)}
            disabled={disabled}
            className="w-full rounded-lg bg-cs-card border border-cs-border p-2.5 text-sm text-cs-text focus:border-cs-accent focus:outline-none disabled:opacity-50"
          >
            <option value="">Not specified</option>
            {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Timeline */}
        <div className="space-y-1.5">
          <label className="text-xs text-cs-text-muted">Timeline</label>
          <select
            value={preferences.timeline}
            onChange={(e) => onChange('timeline', e.target.value)}
            disabled={disabled}
            className="w-full rounded-lg bg-cs-card border border-cs-border p-2.5 text-sm text-cs-text focus:border-cs-accent focus:outline-none disabled:opacity-50"
          >
            <option value="">No timeline</option>
            {TIMELINE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Additional Notes */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs text-cs-text-muted">Additional Notes</label>
          <textarea
            value={preferences.additionalNotes}
            onChange={(e) => onChange('additionalNotes', e.target.value)}
            disabled={disabled}
            placeholder="Any specific requirements, constraints, or preferences..."
            className="w-full rounded-lg bg-cs-card border border-cs-border p-2.5 text-sm text-cs-text placeholder:text-cs-text-muted/50 focus:border-cs-accent focus:outline-none resize-y disabled:opacity-50"
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}