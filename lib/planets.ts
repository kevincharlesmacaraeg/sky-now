import * as Astronomy from "astronomy-engine"

export const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const
export type Sign = typeof SIGNS[number]

export const SIGN_SYMBOL: Record<Sign, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
}

export const PLANET_SYMBOL: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀",
  Mars: "♂", Jupiter: "♃", Saturn: "♄",
  Uranus: "♅", Neptune: "♆", Pluto: "♇",
}

export const SIGN_ELEMENT: Record<Sign, "Fire" | "Earth" | "Air" | "Water"> = {
  Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
  Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
  Gemini: "Air", Libra: "Air", Aquarius: "Air",
  Cancer: "Water", Scorpio: "Water", Pisces: "Water",
}

export const SIGN_MODALITY: Record<Sign, "Cardinal" | "Fixed" | "Mutable"> = {
  Aries: "Cardinal", Cancer: "Cardinal", Libra: "Cardinal", Capricorn: "Cardinal",
  Taurus: "Fixed", Leo: "Fixed", Scorpio: "Fixed", Aquarius: "Fixed",
  Gemini: "Mutable", Virgo: "Mutable", Sagittarius: "Mutable", Pisces: "Mutable",
}

export interface PlanetData {
  name: string
  symbol: string
  lon: number       // geocentric ecliptic longitude 0–360
  sign: Sign
  degree: number    // 0–30 within sign
  retrograde: boolean
}

export interface Aspect {
  p1: string
  p2: string
  type: "Conjunction" | "Sextile" | "Square" | "Trine" | "Opposition"
  symbol: string
  orb: number       // degrees from exact
  applying: boolean // moving closer (true) or separating (false)
}

export interface MoonPhase {
  name: string
  emoji: string
  angle: number  // Sun–Moon angle 0–360
}

// ── Geocentric ecliptic longitude ──────────────────────────────────────────

function geocentricLon(body: Astronomy.Body, date: Date): number {
  const vec = Astronomy.GeoVector(body, date, true)
  const ec  = Astronomy.Ecliptic(vec)
  return ((ec.elon % 360) + 360) % 360
}

function getLon(name: string, date: Date): number {
  if (name === "Sun") {
    return ((Astronomy.SunPosition(date).elon % 360) + 360) % 360
  }
  return geocentricLon(Astronomy.Body[name as keyof typeof Astronomy.Body] as Astronomy.Body, date)
}

function fromLon(lon: number): { sign: Sign; degree: number } {
  const n = ((lon % 360) + 360) % 360
  return { sign: SIGNS[Math.floor(n / 30)], degree: n % 30 }
}

// ── Retrograde (geocentric longitude decreasing over 24h) ──────────────────

function isRetrograde(name: string, date: Date): boolean {
  if (name === "Sun" || name === "Moon") return false
  const lon1 = getLon(name, date)
  const lon2 = getLon(name, new Date(date.getTime() + 86_400_000))
  let diff = lon2 - lon1
  if (diff > 180)  diff -= 360
  if (diff < -180) diff += 360
  return diff < 0
}

// ── All planets ────────────────────────────────────────────────────────────

const PLANET_ORDER = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto"]

export function calculatePlanets(date: Date): PlanetData[] {
  return PLANET_ORDER.map((name) => {
    const lon = getLon(name, date)
    const { sign, degree } = fromLon(lon)
    return {
      name,
      symbol: PLANET_SYMBOL[name],
      lon,
      sign,
      degree,
      retrograde: isRetrograde(name, date),
    }
  })
}

// ── Aspects ────────────────────────────────────────────────────────────────

const ASPECT_DEFS = [
  { type: "Conjunction" as const, symbol: "☌", angle: 0,   orb: 8 },
  { type: "Sextile"     as const, symbol: "⚹", angle: 60,  orb: 6 },
  { type: "Square"      as const, symbol: "□", angle: 90,  orb: 7 },
  { type: "Trine"       as const, symbol: "△", angle: 120, orb: 8 },
  { type: "Opposition"  as const, symbol: "☍", angle: 180, orb: 8 },
]

export function calculateAspects(planets: PlanetData[], date: Date): Aspect[] {
  const aspects: Aspect[] = []
  for (let i = 0; i < planets.length - 1; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i], p2 = planets[j]
      let diff = Math.abs(p1.lon - p2.lon)
      if (diff > 180) diff = 360 - diff
      for (const def of ASPECT_DEFS) {
        const orb = Math.abs(diff - def.angle)
        if (orb <= def.orb) {
          // Determine applying/separating (orb decreasing over next hour?)
          const future = new Date(date.getTime() + 3_600_000)
          const fp1 = getLon(p1.name, future)
          const fp2 = getLon(p2.name, future)
          let fdiff = Math.abs(fp1 - fp2)
          if (fdiff > 180) fdiff = 360 - fdiff
          const forb = Math.abs(fdiff - def.angle)
          aspects.push({
            p1: p1.name, p2: p2.name,
            type: def.type, symbol: def.symbol,
            orb: Math.round(orb * 10) / 10,
            applying: forb < orb,
          })
        }
      }
    }
  }
  return aspects.sort((a, b) => a.orb - b.orb).slice(0, 8)
}

// ── Moon phase ─────────────────────────────────────────────────────────────

export function getMoonPhase(planets: PlanetData[]): MoonPhase {
  const sun  = planets.find((p) => p.name === "Sun")!
  const moon = planets.find((p) => p.name === "Moon")!
  let angle = ((moon.lon - sun.lon) + 360) % 360
  const phases = [
    { name: "New Moon",        emoji: "🌑", min: 0   },
    { name: "Waxing Crescent", emoji: "🌒", min: 45  },
    { name: "First Quarter",   emoji: "🌓", min: 90  },
    { name: "Waxing Gibbous",  emoji: "🌔", min: 135 },
    { name: "Full Moon",       emoji: "🌕", min: 180 },
    { name: "Waning Gibbous",  emoji: "🌖", min: 225 },
    { name: "Last Quarter",    emoji: "🌗", min: 270 },
    { name: "Waning Crescent", emoji: "🌘", min: 315 },
  ]
  const phase = [...phases].reverse().find((p) => angle >= p.min) ?? phases[0]
  return { ...phase, angle }
}
