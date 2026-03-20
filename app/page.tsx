import { calculatePlanets, calculateAspects, getMoonPhase } from "@/lib/planets"
import PlanetGrid from "@/components/PlanetGrid"
import AspectList from "@/components/AspectList"
import HourlyCountdown from "@/components/HourlyCountdown"

// Revalidate every hour — new positions
export const revalidate = 3600

export default function Home() {
  // Snap to the top of the current hour for consistent caching
  const now = new Date()
  const hourSnap = new Date(now)
  hourSnap.setMinutes(0, 0, 0)

  const planets = calculatePlanets(hourSnap)
  const aspects = calculateAspects(planets, hourSnap)
  const moonPhase = getMoonPhase(planets)

  const dateLabel = hourSnap.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    timeZoneName: "short",
  })

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-violet-400">✦</span> Sky Now
            </h1>
            <p className="text-sm text-gray-500 mt-1">{dateLabel}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{moonPhase.emoji}</span>
              <span>{moonPhase.name}</span>
            </div>
            <HourlyCountdown generatedAt={hourSnap.toISOString()} />
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PlanetGrid planets={planets} />
        <AspectList aspects={aspects} />
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-700">
        <span>Positions computed with astronomy-engine</span>
        <span>Refreshes hourly</span>
      </div>
    </main>
  )
}
