import { foundItems } from './items.js'

/**
 * MOCK MATCH ENGINE — stands in for the real AI matching service.
 * Future API requirement (for tech lead):
 *   GET /items/lost/:id/matches -> [{ item, final_score }], sorted desc by final_score
 * This mock ranks existing found items by category overlap + a randomized
 * jitter so the demo shows varied, realistic-looking scores every run.
 */
export function generateMatches(lostReport) {
  const candidates = foundItems.filter((f) => f.category === lostReport.category)
  const pool = candidates.length ? candidates : foundItems.slice(0, 3)

  const scored = pool.map((item, idx) => {
    const base = 0.62 + (candidates.length ? 0.25 : 0.05)
    const jitter = Math.random() * 0.12
    const final_score = Math.min(0.98, base + jitter - idx * 0.05)
    return { item, final_score }
  })

  return scored.sort((a, b) => b.final_score - a.final_score)
}
