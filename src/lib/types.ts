// ================================================================
// Concept Studio Type Definitions
// ================================================================

export interface Module {
  id: string
  label: string
  icon: string
  description: string
  category: 'strategy' | 'creative' | 'technical' | 'visual'
}

export const MODULES: Module[] = [
  { id: 'brainstorm', label: 'Creative Brainstorm', icon: '💡', description: 'Generate innovative concepts and ideas', category: 'creative' },
  { id: 'business_plan', label: 'Business Plan', icon: '📋', description: 'Complete business plan with roadmap', category: 'strategy' },
  { id: 'market_research', label: 'Market Research', icon: '📊', description: 'Market analysis, competitors & trends', category: 'strategy' },
  { id: 'business_advice', label: 'Business Advice', icon: '🧠', description: 'Strategic recommendations & insights', category: 'strategy' },
  { id: 'app_blueprint', label: 'App Blueprint', icon: '🏗️', description: 'Technical architecture & specifications', category: 'technical' },
  { id: 'code_scripts', label: 'Code Scripts', icon: '💻', description: 'Working code snippets & boilerplate', category: 'technical' },
  { id: 'ui_ux', label: 'UI/UX Design', icon: '🎨', description: 'Interface wireframes & UX flows', category: 'visual' },
  { id: 'mockups', label: 'Visual Mockups', icon: '🖼️', description: 'AI-generated concept images', category: 'visual' },
  { id: 'branding', label: 'Logo & Branding', icon: '✨', description: 'Brand identity & logo concepts', category: 'visual' },
  { id: 'ai_suggestions', label: 'AI Suggestions', icon: '🤖', description: 'Additional AI-powered recommendations', category: 'creative' },
]

export interface ConceptRequest {
  prompt: string
  modules: string[]
  style: string
  industry: string
  audience: string
  budget: string
  timeline: string
  additionalNotes: string
}

export interface ModuleResult {
  status: 'pending' | 'generating' | 'completed' | 'error'
  content: any
}

export interface ConceptResponse {
  success: boolean
  executionId: string
  modules: Record<string, ModuleResult>
  error?: string
}

export type GenerationStatus = 'idle' | 'generating' | 'completed' | 'error'