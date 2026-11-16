import type { EngineInterface, Register } from 'claude-code'

// Offers each prompt to HedwigAI instead of Claude. Answered by HedwigAI, the
// prompt never reaches Claude: the answer is shown in the transcript and
// added to the conversation, so a follow-up to Claude knows what was said.
//
// Everything goes through the HedwigAI MCP server (the plugin brings it, or
// uses the one already connected): its `ask` tool, signed in with the
// person's own HedwigAI account.

const CLAUDE = 'Claude Code'
const HEDWIG = 'HedwigAI'
const PREFIX = /^@hedwig\b[:,]?\s*/i

/**
 * What HedwigAI is asked about a prompt before it is offered: both halves
 * must hold. Judged by HedwigAI itself, through the MCP, from the prompt's
 * text alone: no program runs and nothing is looked up.
 */
export const FITS =
  'Is this prompt both (1) verifiable — a question whose answer is a fact or figure that can be checked ' +
  'against a record or source, not an opinion, a piece of writing, or a change to code — and (2) answerable ' +
  'from public data (SEC filings, funding rounds, company hiring, trademarks, FDA, real estate, search and ' +
  "SEO data, company or people data), rather than from files on the asker's own computer?"
/** How sure HedwigAI must be that it fits before the person is asked. */
export const SURE = 0.8
/** Past this, the prompt goes to Claude unasked: the judge never holds a prompt up. */
const JUDGE_MS = 2500

export type Mode = 'ask' | 'prefix' | 'off'

export const register: Register = (on, options) => {
  const mode: Mode = options?.mode === 'prefix' || options?.mode === 'off' ? options.mode : 'ask'

  on('prompt.submit', async ($, e, next) => {
    const routed = route(e, mode)
    if (routed === 'claude') return next(e)
    const { question, prefixed } = routed

    // Connected first: the judge and the answer both go through it. Not
    // connected (a new install, not signed in yet), only an @hedwig prompt
    // says so; any other goes to Claude as if the plugin were not there.
    const hedwig = await $.mcp.connect('hedwigai')
    if (!hedwig.isConnected) {
      if (!prefixed) return next(e)
      return {
        drop: `HedwigAI is not connected (${hedwig.message ?? hedwig.reason}). Run /mcp, choose hedwigai and sign in, then send the prompt again.`,
      }
    }

    // Offered only where HedwigAI believes it can verify the answer from a
    // session's own data. `@hedwig` is the person choosing, and is not judged.
    if (!prefixed && !(await fits($, hedwig.server, question, next.signal))) return next(e)

    if (!prefixed) {
      let pick: string
      try {
        pick = await $.ui.ask('Who should answer this prompt?', { options: [CLAUDE, HEDWIG], header: 'Answer by' })
      } catch {
        return next(e) // dismissed: Claude answers, as it would have
      }
      if (pick !== HEDWIG) return next(e)
    }

    $.ui.status('HedwigAI is answering…')
    try {
      const result = await $.mcp.call(hedwig.server, 'ask', { question, llm_model: 'unknown' })
      const raw = result.content
        .flatMap(block => (block.type === 'text' ? [block.text] : []))
        .join('\n')
        .trim()
      if (result.isError) {
        return { drop: `HedwigAI could not answer: ${raw.slice(0, 400) || 'no reason given'}. Send it again to ask Claude.` }
      }
      const answer = readable(raw)
      await $.session.append({
        message: {
          type: 'user',
          content: [{ type: 'text', text: `I asked HedwigAI instead of you: "${question}"\n\nHedwigAI answered:\n${answer}` }],
        },
      })
      $.ui.log(`HedwigAI: ${answer}`)
      return { drop: 'Answered by HedwigAI (above).' }
    } catch (err) {
      return { drop: `HedwigAI could not be reached: ${String(err).slice(0, 300)}. Send it again to ask Claude.` }
    } finally {
      $.ui.status(undefined)
    }
  }).catch(($, e, next) => next(e)) // whatever failed here, the prompt still reaches Claude
}

/**
 * Whether HedwigAI is sure enough the prompt is verifiable and runs in a
 * HedwigAI session: its `ask` over the prompt as `context`, yes or no. A
 * slow, failed or unsure judge is a no.
 */
async function fits(
  $: EngineInterface,
  server: string,
  question: string,
  signal: AbortSignal,
): Promise<boolean> {
  if (!worthJudging(question)) return false
  const judged = $.mcp
    .call(server, 'ask', { question: FITS, context: question, options: ['yes', 'no'], llm_model: 'unknown' })
    .then(r => (r.isError ? 0 : yesOf(r.content.flatMap(b => (b.type === 'text' ? [b.text] : [])).join(''))))
    .catch(() => 0)
  const late = $.clock.sleep(JUDGE_MS, { signal }).then(() => 0, () => 0)
  return (await Promise.race([judged, late])) >= SURE
}

/** The judge's probability of yes, from ask's JSON; 0 when it cannot be read. */
export function yesOf(raw: string): number {
  try {
    const r = JSON.parse(raw) as { probabilities?: { yes?: unknown } }
    const p = r.probabilities?.yes
    return typeof p === 'number' ? p : 0
  } catch {
    return 0
  }
}

/**
 * Prompts not worth a round trip to the judge: a word or two ("yes",
 * "continue"), a long paste, or one carrying code.
 */
export function worthJudging(question: string): boolean {
  const words = question.split(/\s+/).filter(Boolean).length
  return words >= 4 && question.length <= 1500 && !question.includes('```')
}

type Submitted = {
  text: string
  command?: unknown
  isMeta?: true
  turnId?: string
  attachments?: readonly unknown[]
  origin: { kind: string }
}

/**
 * Whether a prompt is HedwigAI's to offer, and the question it would ask.
 *
 * Only what the person typed, between turns. A slash command, a prompt the
 * engine made, one queued into a running turn, or one with images (HedwigAI
 * answers text) goes to Claude untouched. `@hedwig` sends a prompt straight
 * to HedwigAI in either mode; in `prefix` mode nothing else is offered.
 */
export function route(e: Submitted, mode: Mode): 'claude' | { question: string; prefixed: boolean } {
  if (mode === 'off' || e.command || e.isMeta || e.turnId || e.attachments?.length) return 'claude'
  if (e.origin.kind !== 'composer' && e.origin.kind !== 'bridge') return 'claude'
  const prefixed = PREFIX.test(e.text)
  if (mode === 'prefix' && !prefixed) return 'claude'
  const question = (prefixed ? e.text.replace(PREFIX, '') : e.text).trim()
  return question ? { question, prefixed } : 'claude'
}

/** ask answers JSON: the answer, then the sources it rests on. */
export function readable(raw: string): string {
  try {
    const r = JSON.parse(raw) as { answer?: unknown; sources?: { cite?: string; target?: string }[] }
    if (r.answer === undefined) return raw
    const answer = typeof r.answer === 'string' ? r.answer : JSON.stringify(r.answer)
    const sources = (r.sources ?? [])
      .map(s => [s.cite, s.target].filter(Boolean).join(' — '))
      .filter(Boolean)
      .slice(0, 8)
    return sources.length ? `${answer}\n\nSources:\n${sources.map(s => `• ${s}`).join('\n')}` : answer
  } catch {
    return raw
  }
}
