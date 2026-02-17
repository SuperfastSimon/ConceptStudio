// ================================================================
// Concept Studio API Client
// ================================================================

import { ConceptRequest, ConceptResponse } from './types'

const API_BASE = '/api'

export async function generateConcept(request: ConceptRequest): Promise<ConceptResponse> {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP ${res.status}`)
  }

  return res.json()
}

// Demo mode: simulates generation for UI testing without backend
export async function generateConceptDemo(request: ConceptRequest): Promise<ConceptResponse> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 2000))

  const modules: Record<string, any> = {}
  for (const mod of request.modules) {
    modules[mod] = {
      status: 'completed',
      content: getDemoContent(mod, request.prompt),
    }
  }

  return {
    success: true,
    executionId: `demo-${Date.now()}`,
    modules,
  }
}

function getDemoContent(moduleId: string, prompt: string): string {
  const contents: Record<string, string> = {
    brainstorm: `# 💡 Creative Brainstorm\n\n## Core Concept\n**${prompt}**\n\n### Key Ideas\n1. **AI-Powered Core** — Leverage machine learning to deliver personalized experiences\n2. **Modular Architecture** — Build once, deploy anywhere with plug-and-play modules\n3. **Community-First** — Foster organic growth through user-generated content\n4. **Data Flywheel** — Each interaction improves the product for everyone\n5. **Freemium Gateway** — Free tier drives adoption, premium unlocks full power\n\n### Unique Value Proposition\nThe first platform that combines ${prompt.toLowerCase()} with intelligent automation, reducing manual effort by 80% while increasing output quality.\n\n### Innovation Angles\n- Integration with existing workflows (Slack, Notion, etc.)\n- Real-time collaboration features\n- AI-assisted decision making\n- Predictive analytics dashboard`,
    business_plan: `# 📋 Business Plan\n\n## Executive Summary\n**${prompt}**\n\nA next-generation platform targeting a $4.2B addressable market with 23% YoY growth.\n\n## Market Opportunity\n- TAM: $4.2B (2024)\n- SAM: $890M\n- SOM: $45M (Year 3)\n\n## Revenue Model\n| Tier | Price | Target |\n|------|-------|--------|\n| Free | $0/mo | Individual users |\n| Pro | $29/mo | Power users |\n| Business | $99/mo | Teams |\n| Enterprise | Custom | Organizations |\n\n## Roadmap\n- **Q1**: MVP launch, 500 beta users\n- **Q2**: Pro tier launch, 2K users\n- **Q3**: Business tier, partnerships\n- **Q4**: Enterprise features, 10K users\n\n## Financial Projections\n- Year 1: $120K ARR\n- Year 2: $580K ARR\n- Year 3: $2.1M ARR`,
    market_research: `# 📊 Market Research\n\n## Industry Analysis\nThe ${prompt.toLowerCase()} market is experiencing rapid growth driven by AI adoption.\n\n### Market Size\n- Global market: $4.2B (2024)\n- Expected CAGR: 23.1% through 2028\n- Key growth driver: Enterprise AI adoption\n\n### Competitive Landscape\n| Competitor | Strength | Weakness |\n|-----------|----------|----------|\n| Incumbent A | Brand recognition | Slow innovation |\n| Startup B | Modern UX | Limited features |\n| Startup C | Low price | Poor support |\n| **You** | AI-native + modular | New entrant |\n\n### Target Segments\n1. **Early Adopters** (15%): Tech-savvy professionals\n2. **Main Market** (60%): Business teams\n3. **Late Majority** (25%): Traditional enterprises\n\n### Key Trends\n- AI-first workflows replacing manual processes\n- No-code/low-code platforms gaining traction\n- Consolidation of point solutions into platforms`,
    business_advice: `# 🧠 Strategic Advice\n\n## Top Recommendations\n\n### 1. Start Narrow, Expand Wide\nFocus on ONE killer use case first. Don't try to be everything. Master one workflow, then expand.\n\n### 2. Build in Public\nShare your journey on Twitter/LinkedIn. This builds trust and creates early adopters at zero cost.\n\n### 3. Pricing Strategy\nStart with a generous free tier. Your goal in Year 1 is USERS, not revenue. Monetize in Year 2.\n\n### 4. Technical Moat\nInvest in proprietary AI models trained on your specific domain data. This creates a defensible advantage.\n\n### 5. Distribution\n- Partner with complementary tools (integrations)\n- Create a template marketplace\n- Invest in SEO-driven content marketing`,
    app_blueprint: `# 🏗️ App Blueprint\n\n## Architecture Overview\n\n\`\`\`\n┌─────────────┐     ┌──────────────┐     ┌─────────────┐\n│   Frontend   │────▶│   API Layer  │────▶│  AI Engine   │\n│  (Next.js)   │◀────│  (Node.js)   │◀────│  (AutoGPT)   │\n└─────────────┘     └──────────────┘     └─────────────┘\n                           │                      │\n                    ┌──────▼──────┐        ┌──────▼──────┐\n                    │  Database    │        │  Storage     │\n                    │ (PostgreSQL) │        │  (S3/R2)     │\n                    └─────────────┘        └─────────────┘\n\`\`\`\n\n## Tech Stack\n- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS\n- **Backend**: Node.js API routes\n- **AI**: AutoGPT agents (Claude/GPT-4)\n- **Database**: PostgreSQL + Prisma ORM\n- **Auth**: NextAuth.js\n- **Deploy**: Vercel\n\n## Key Features\n1. Prompt-based concept generation\n2. Modular output selection\n3. Real-time generation progress\n4. Export to PDF/Markdown\n5. Save & share concepts`,
    code_scripts: `# 💻 Code Scripts\n\n## Core Generation Engine\n\n\`\`\`typescript\n// concept-engine.ts\nimport { AutoGPTClient } from './autogpt-client'\n\ninterface ConceptConfig {\n  prompt: string\n  modules: string[]\n  llmModel: 'claude-3-opus' | 'gpt-4o' | 'gemini-pro'\n}\n\nexport class ConceptEngine {\n  private client: AutoGPTClient\n\n  constructor(apiKey: string) {\n    this.client = new AutoGPTClient(apiKey)\n  }\n\n  async generate(config: ConceptConfig) {\n    const results = await Promise.allSettled(\n      config.modules.map(mod =>\n        this.client.runAgent({\n          agentId: MODULE_AGENTS[mod],\n          inputs: {\n            prompt: config.prompt,\n            module: mod,\n          },\n        })\n      )\n    )\n\n    return results.map((r, i) => ({\n      module: config.modules[i],\n      status: r.status,\n      data: r.status === 'fulfilled' ? r.value : r.reason,\n    }))\n  }\n}\n\`\`\``,
    ui_ux: `# 🎨 UI/UX Design Specifications\n\n## Design System\n\n### Colors\n- Background: \`#0a0a14\` (deep space)\n- Cards: \`#121220\` (elevated surface)\n- Accent: \`#8b5cf6\` (electric purple)\n- Success: \`#34d399\` (emerald)\n- Text: \`#e4e4ed\` (soft white)\n\n### Typography\n- Headings: Inter Bold\n- Body: Inter Regular\n- Code: JetBrains Mono\n\n### User Flow\n1. Landing → Enter prompt\n2. Select modules (toggle cards)\n3. Optional: fill preferences\n4. Click Generate → progress view\n5. Results → tabbed module outputs\n6. Export / Share / Save\n\n### Key Screens\n- **Dashboard**: Clean prompt input with module cards\n- **Generation**: Animated progress with module status\n- **Results**: Tab-based output viewer with copy/export\n- **History**: Saved concepts gallery`,
    mockups: `# 🖼️ Visual Mockups\n\n*AI-generated concept visualizations would appear here*\n\n## Mockup Descriptions\n\n### 1. Hero Landing Screen\nDark gradient background with centered prompt input, floating module cards arranged in a grid, subtle purple glow effects.\n\n### 2. Generation Progress\nFull-screen dark view with animated module cards showing completion status, progress bars, and real-time text streaming.\n\n### 3. Results Dashboard\nSplit view: left sidebar with module tabs, right panel showing rich formatted output with charts, code blocks, and images.\n\n### 4. Mobile View\nStacked layout with swipeable module cards and bottom sheet results viewer.\n\n> 🎨 *Connect the Concept Studio agent with AI image generation to produce actual mockup images*`,
    branding: `# ✨ Brand Identity\n\n## Brand Name\n**Concept Studio**\n\n## Tagline Options\n1. "From idea to reality, powered by AI"\n2. "Think it. Build it. Launch it."\n3. "Your AI concept partner"\n\n## Brand Colors\n- Primary: \`#8b5cf6\` (Electric Purple)\n- Secondary: \`#6366f1\` (Indigo)\n- Accent: \`#34d399\` (Emerald)\n- Dark: \`#0a0a14\` (Deep Space)\n\n## Logo Concept\nMinimal "CS" monogram in electric purple with a subtle lightbulb/spark integrated into the S. Clean, modern, tech-forward.\n\n## Brand Voice\n- Confident but approachable\n- Technical but clear\n- Innovative but grounded\n- Professional but creative\n\n## Usage Guidelines\n- Always use on dark backgrounds\n- Minimum size: 32px height\n- Clear space: 1x logo height on all sides`,
    ai_suggestions: `# 🤖 AI-Powered Suggestions\n\n## Additional Opportunities\n\n### 1. Template Marketplace\nCreate pre-built concept templates users can customize. Revenue share with template creators.\n\n### 2. Collaboration Features\nReal-time co-creation. Multiple users refine concepts together. Think "Google Docs for concepts."\n\n### 3. Concept Versioning\nGit-like version control for concepts. Branch, compare, and merge different directions.\n\n### 4. Integration Hub\n- Export to Notion, Confluence\n- Push code to GitHub\n- Send plans to project management tools\n- Share mockups to Figma\n\n### 5. AI Refinement Loop\nAllow users to give feedback on generated outputs. AI refines iteratively until perfect.\n\n### 6. Analytics Dashboard\nTrack which concept types perform best, industry trends, and user behavior patterns.`,
  }

  return contents[moduleId] || `# ${moduleId}\n\nContent for ${moduleId} module based on: ${prompt}`
}