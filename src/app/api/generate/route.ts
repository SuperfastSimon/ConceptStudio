import { NextRequest, NextResponse } from 'next/server'

// ================================================================
// Concept Studio API Route
// Bridge between the Next.js frontend and AutoGPT agent backend
// ================================================================

const AUTOGPT_API_URL = process.env.AUTOGPT_API_URL || 'https://backend.agpt.co/external-api/v1'
const AUTOGPT_API_KEY = process.env.AUTOGPT_API_KEY || ''
// The agent graph ID for your Concept Studio agent (set after building it)
const AGENT_GRAPH_ID = process.env.CONCEPT_STUDIO_AGENT_ID || ''

interface GenerateRequest {
  prompt: string
  modules: string[]
  style: string
  industry: string
  audience: string
  budget: string
  timeline: string
  additionalNotes: string
}

// Poll for execution results
async function pollExecution(graphId: string, executionId: string, maxAttempts = 60): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 3000))

    const res = await fetch(
      `${AUTOGPT_API_URL}/graphs/${graphId}/executions/${executionId}`,
      { headers: { 'X-API-Key': AUTOGPT_API_KEY } }
    )

    if (!res.ok) continue

    const data = await res.json()
    if (data.status === 'COMPLETED' || data.status === 'FAILED') {
      return data
    }
  }

  throw new Error('Execution timed out after 3 minutes')
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json()

    // Validation
    if (!body.prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }
    if (!body.modules?.length) {
      return NextResponse.json({ error: 'At least one module must be selected' }, { status: 400 })
    }

    // Check configuration
    if (!AUTOGPT_API_KEY) {
      return NextResponse.json(
        { error: 'AUTOGPT_API_KEY not configured. Add it to .env.local' },
        { status: 500 }
      )
    }
    if (!AGENT_GRAPH_ID) {
      return NextResponse.json(
        { error: 'CONCEPT_STUDIO_AGENT_ID not configured. Build the agent first, then add its ID to .env.local' },
        { status: 500 }
      )
    }

    // Format inputs for the AutoGPT agent
    const agentInputs = {
      prompt: body.prompt,
      modules: body.modules.join(', '),
      style: body.style,
      industry: body.industry || 'Not specified',
      target_audience: body.audience || 'Not specified',
      budget: body.budget || 'Not specified',
      timeline: body.timeline || 'Not specified',
      additional_notes: body.additionalNotes || 'None',
    }

    // Step 1: Trigger the agent execution
    const execRes = await fetch(
      `${AUTOGPT_API_URL}/graphs/${AGENT_GRAPH_ID}/execute`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': AUTOGPT_API_KEY,
        },
        body: JSON.stringify(agentInputs),
      }
    )

    if (!execRes.ok) {
      const errorText = await execRes.text()
      return NextResponse.json(
        { error: `AutoGPT execution failed: ${errorText}` },
        { status: execRes.status }
      )
    }

    const execution = await execRes.json()
    const executionId = execution.id || execution.execution_id

    // Step 2: Poll for completion
    const result = await pollExecution(AGENT_GRAPH_ID, executionId)

    if (result.status === 'FAILED') {
      return NextResponse.json(
        { error: 'Agent execution failed', details: result },
        { status: 500 }
      )
    }

    // Step 3: Parse outputs into module results
    const moduleResults = parseAgentOutputs(result, body.modules)

    return NextResponse.json({
      success: true,
      executionId,
      modules: moduleResults,
    })
  } catch (error: any) {
    console.error('[Concept Studio] Generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Parse AutoGPT agent outputs into module-specific results
function parseAgentOutputs(execution: any, requestedModules: string[]) {
  const outputs = execution.outputs || execution.output || {}
  const results: Record<string, any> = {}

  for (const mod of requestedModules) {
    // Try to match output keys to module names
    const key = mod.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const match = Object.entries(outputs).find(([k, _]) =>
      k.toLowerCase().includes(key) || key.includes(k.toLowerCase())
    )

    results[mod] = {
      status: match ? 'completed' : 'pending',
      content: match ? match[1] : null,
    }
  }

  // If output is a single blob (e.g. full JSON), try to distribute
  if (Object.values(results).every((r) => r.status === 'pending')) {
    // Fallback: put entire output in each module
    for (const mod of requestedModules) {
      results[mod] = {
        status: 'completed',
        content: outputs,
      }
    }
  }

  return results
}