import type { PlanetData } from "@/lib/planets"
import { SIGN_SYMBOL, SIGN_ELEMENT } from "@/lib/planets"

const ELEMENT_COLOR = {
  Fire:  "text-orange-500",
  Earth: "text-emerald-600",
  Air:   "text-sky-500",
  Water: "text-violet-500",
}

interface Props {
  planets: PlanetData[]
}

export default function PlanetGrid({ planets }: Props) {
  return (
    <div className="rounded border border-black/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-black/10">
        <h2 className="text-[10px] font-semibold text-black/40 uppercase tracking-[0.2em]">Planetary Positions</h2>
      </div>
      <div className="divide-y divide-black/5">
        {planets.map((p) => {
          const element = SIGN_ELEMENT[p.sign]
          const elColor = ELEMENT_COLOR[element]
          return (
            <div key={p.name} className="flex items-center px-4 py-2.5 gap-3">
              <span className="w-5 text-center text-base text-black/50 shrink-0">{p.symbol}</span>
              <span className="w-16 text-sm font-medium text-black">{p.name}</span>
              <div className="flex items-center gap-1.5 flex-1">
                <span className={`text-base ${elColor}`}>{SIGN_SYMBOL[p.sign]}</span>
                <span className={`text-sm font-medium ${elColor}`}>{p.sign}</span>
                <span className="text-xs text-black/30">{Math.floor(p.degree)}°{Math.round((p.degree % 1) * 60).toString().padStart(2,"0")}′</span>
              </div>
              {p.retrograde && (
                <span className="text-xs text-amber-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded">℞</span>
              )}
              <span className={`hidden sm:block text-xs ${elColor} opacity-50`}>{element}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
