import type { PlanetData } from "@/lib/planets"
import { SIGN_SYMBOL, SIGN_ELEMENT } from "@/lib/planets"

const ELEMENT_COLOR = {
  Fire:  "text-orange-400",
  Earth: "text-emerald-400",
  Air:   "text-sky-400",
  Water: "text-violet-400",
}

interface Props {
  planets: PlanetData[]
}

export default function PlanetGrid({ planets }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Planetary Positions</h2>
      </div>
      <div className="divide-y divide-white/5">
        {planets.map((p) => {
          const element = SIGN_ELEMENT[p.sign]
          const elColor = ELEMENT_COLOR[element]
          return (
            <div key={p.name} className="flex items-center px-4 py-2.5 gap-3">
              {/* Planet */}
              <span className="w-5 text-center text-base text-gray-300 shrink-0">{p.symbol}</span>
              <span className="w-16 text-sm font-medium text-white">{p.name}</span>

              {/* Sign */}
              <div className="flex items-center gap-1.5 flex-1">
                <span className={`text-base ${elColor}`}>{SIGN_SYMBOL[p.sign]}</span>
                <span className={`text-sm font-medium ${elColor}`}>{p.sign}</span>
                <span className="text-xs text-gray-500">{Math.floor(p.degree)}°{Math.round((p.degree % 1) * 60).toString().padStart(2,"0")}′</span>
              </div>

              {/* Retrograde */}
              {p.retrograde && (
                <span className="text-xs text-amber-400 font-medium bg-amber-400/10 px-1.5 py-0.5 rounded">℞</span>
              )}

              {/* Element pill */}
              <span className={`hidden sm:block text-xs ${elColor} opacity-50`}>{element}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
