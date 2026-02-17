# 🎨 Concept Studio

**AI-powered business concept generator** — Generate complete concepts from a single prompt.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![AutoGPT](https://img.shields.io/badge/AutoGPT-Platform-8b5cf6?style=flat-square)

## ✨ Features

- **10 Modular Outputs** — Pick and choose what you need:
  - 💡 Creative Brainstorm
  - 📊 Business Plan & Roadmap
  - 🔍 Market Research
  - 💼 Business Advice
  - 📐 App Blueprint
  - 💻 Code Scripts
  - 🎨 UI/UX Design
  - 🖼️ Mockup Images
  - 🎨 Branding & Identity
  - 🤖 AI Suggestions

- **Preference System** — Fine-tune output with style, industry, audience, budget & timeline
- **Real-time Progress** — Watch modules generate one by one with animated progress
- **Export** — Copy individual modules or export everything as Markdown
- **Dark Theme** — Sleek glassmorphism design with purple accent

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/SuperfastSimon/ConceptStudio.git
cd ConceptStudio

# Install
npm install

# Configure
cp .env.example .env.local
# Edit .env.local with your API keys

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

See `.env.example` for all configuration options. The app works in **demo mode** without API keys, returning placeholder content.

For real AI generation, connect your AutoGPT agents by setting the `AGENT_*` environment variables.

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx          # Main page with generation flow
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Design system
│   └── api/generate/     # API route (AutoGPT integration)
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── PromptInput.tsx   # Main prompt textarea
│   ├── ModuleSelector.tsx # Toggle modules on/off
│   ├── PreferencesPanel.tsx # Advanced preferences
│   ├── GenerationProgress.tsx # Real-time progress
│   └── ResultsViewer.tsx # Tabbed results with export
└── lib/
    ├── types.ts          # Module definitions & types
    └── api.ts            # API client
```

## 📡 Powered by AutoGPT

Each module maps to a dedicated AutoGPT agent for specialized AI generation. The platform handles orchestration, letting each agent focus on its expertise.

## 📄 License

MIT © SuperfastSimon