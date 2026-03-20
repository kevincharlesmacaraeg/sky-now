import { calculatePlanets, calculateAspects, getMoonPhase } from "@/lib/planets"
import CompatibilityForm from "@/components/CompatibilityForm"
import PlanetGrid from "@/components/PlanetGrid"
import AspectList from "@/components/AspectList"

export const revalidate = 3600

export default function Home() {
  const now = new Date()
  const hourSnap = new Date(now)
  hourSnap.setMinutes(0, 0, 0)

  const planets = calculatePlanets(hourSnap)
  const aspects = calculateAspects(planets, hourSnap)
  const moonPhase = getMoonPhase(planets)

  const dateLabel = hourSnap.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long", month: "long", day: "numeric",
    hour: "numeric", timeZoneName: "short",
  })

  return (
    <>
      <CompatibilityForm />
      <div className="max-w-xs mx-auto px-6 pb-16 space-y-5">
        <div className="border-t border-black/10 pt-10 mb-6">
          <p className="text-[10px] tracking-[0.25em] uppercase text-black/35 mb-1">the sky right now</p>
          <p className="text-[10px] text-black/25 tracking-[0.1em]">{dateLabel} · {moonPhase.emoji} {moonPhase.name}</p>
        </div>
        <PlanetGrid planets={planets} />
        <AspectList aspects={aspects} />
      </div>
    </>
  )
}
