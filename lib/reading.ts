import Anthropic from "@anthropic-ai/sdk"
import type { PlanetData, Aspect, MoonPhase } from "./planets"
import { SIGN_ELEMENT, SIGN_MODALITY } from "./planets"

export interface SkyReading {
  headline: string
  body: string
  keywords: string[]
  generatedAt: string
}

export async function generateReading(
  planets: PlanetData[],
  aspects: Aspect[],
  moonPhase: MoonPhase,
  date: Date
): Promise<SkyReading> {
  const client = new Anthropic()

  // Build a clean planetary summary for Claude
  const planetLines = planets
    .map((p) => {
      const retro = p.retrograde ? " ℞" : ""
      return `${p.name}: ${p.sign} ${Math.floor(p.degree)}°${retro}`
    })
    .join("\n")

  const aspectLines = aspects.length
    ? aspects
        .map((a) => `${a.p1} ${a.symbol} ${a.p2} (${a.type}, ${a.orb}° orb, ${a.applying ? "applying" : "separating"})`)
        .join("\n")
    : "No major aspects within orb"

  // Element / modality balance
  const elements = { Fire: 0, Earth: 0, Air: 0, Water: 0 }
  const modalities = { Cardinal: 0, Fixed: 0, Mutable: 0 }
  for (const p of planets) {
    elements[SIGN_ELEMENT[p.sign]]++
    modalities[SIGN_MODALITY[p.sign]]++
  }
  const dominantElement  = Object.entries(elements).sort((a,b) => b[1]-a[1])[0][0]
  const dominantModality = Object.entries(modalities).sort((a,b) => b[1]-a[1])[0][0]

  const hour = date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long", month: "long", day: "numeric",
    hour: "numeric", minute: "2-digit", timeZoneName: "short",
  })

  const prompt = `You are a skilled, modern astrologer. The current sky for ${hour}:

PLANETARY POSITIONS (geocentric)
${planetLines}

MOON PHASE
${moonPhase.emoji} ${moonPhase.name} (${Math.round(moonPhase.angle)}°)

ACTIVE ASPECTS
${aspectLines}

DOMINANT ENERGY
Element: ${dominantElement} | Modality: ${dominantModality}

Write an overarching astrological reading for this hour. Structure your response as JSON with this exact shape:
{
  "headline": "a short evocative title for this sky (8 words max)",
  "body": "3–4 paragraphs of astrological interpretation. Cover: the dominant themes, the most significant planetary configurations, and what this moment is calling for collectively. Be insightful, poetic, and grounded. No bullet points.",
  "keywords": ["3 to 5 one- or two-word keywords capturing the essence of this sky"]
}

Return only valid JSON, no markdown fences.`

  const msg = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  })

  const raw = (msg.content[0] as { type: string; text: string }).text.trim()

  try {
    const parsed = JSON.parse(raw) as SkyReading
    return { ...parsed, generatedAt: date.toISOString() }
  } catch {
    // Fallback if JSON parse fails
    return {
      headline: "The Sky in Motion",
      body: raw,
      keywords: [],
      generatedAt: date.toISOString(),
    }
  }
}
