import { NextRequest, NextResponse } from 'next/server'

// ================================================================
// Concept Generation API Route
// Connects to AutoGPT agents for real concept generation
// ================================================================

const AUTOGPT_API_URL = process.env.AUTOGPT_API_URL || 'https://api.agpt.co'
const AUTOGPT_API_KEY = process.env.AUTOGPT_API_KEY || ''

// Map module IDs to AutoGPT agent IDs (configure after creating agents)
const MODULE_AGENTS: Record<string, string> = {
  brainstorm: process.env.AGENT_BRAINSTORM || '',
  business_plan: process.env.AGENT_BUSINESS_PLAN || '',
  market_research: process.env.AGENT_MARKET_RESEARCH || '',
  business_advice: process.env.AGENT_BUSINESS_ADVICE || '',
  app_blueprint: process.env.AGENT_APP_BLUEPRINT || '',
  code_scripts: process.env.AGENT_CODE_SCRIPTS || '',
  ui_ux: process.env.AGENT_UI_UX || '',
  mockups: process.env.AGENT_MOCKUPS || '',
  branding: process.env.AGENT_BRANDING || '',
  ai_suggestions: process.env.AGENT_AI_SUGGESTIONS || '',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, modules, style, industry, audience, budget, timeline, additionalNotes } = body

    if (!prompt || !modules || modules.length === 0) {
      return NextResponse.json(
        { error: 'Prompt and at least one module are required' },
        { status: 400 }
      )
    }

    // If no API key configured, return demo/placeholder response
    if (!AUTOGPT_API_KEY) {
      return NextResponse.json({
        success: true,
        executionId: `local-${Date.now()}`,
        modules: Object.fromEntries(
          modules.map((mod: string) => [
            mod,
            {
              status: 'completed',
              content: `[Demo Mode] Generated ${mod} content for: ${prompt}. Configure AUTOGPT_API_KEY to enable real generation.`,
            },
          ])
        ),
        message: 'Running in demo mode. Set AUTOGPT_API_KEY environment variable for real AI generation.',
      })
    }

    // Real AutoGPT integration
    const results: Record<string, any> = {}

    for (const moduleId of modules) {
      const agentId = MODULE_AGENTS[moduleId]
      if (!agentId) {
        results[moduleId] = {
          status: 'error',
          content: `Agent not configured for module: ${moduleId}`,
        }
        continue
      }

      try {
        const agentResponse = await fetch(`${AUTOGPT_API_URL}/api/v1/agents/${agentId}/execute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AUTOGPT_API_KEY}`,
          },
          body: JSON.stringify({
            input: {
              prompt,
              module: moduleId,
              style: style || 'Professional',
              industry: industry || 'General',
              audience: audience || 'General',
              budget: budget || 'Not specified',
              timeline: timeline || 'Not specified',
              additional_notes: additionalNotes || '',
            },
          }),
        })

        if (agentResponse.ok) {
          const data = await agentResponse.json()
          results[moduleId] = {
            status: 'completed',
            content: data.output || data.result || JSON.stringify(data),
          }
        } else {
          results[moduleId] = {
            status: 'error',
            content: `Agent returned HTTP ${agentResponse.status}`,
          }
        }
      } catch (err: any) {
        results[moduleId] = {
          status: 'error',
          content: `Failed to execute agent: ${err.message}`,
        }
      }
    }

    return NextResponse.json({
      success: true,
      executionId: `exec-${Date.now()}`,
      modules: results,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}