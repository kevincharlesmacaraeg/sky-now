import type { Aspect } from "@/lib/planets"

const TYPE_COLOR: Record<Aspect["type"], string> = {
  Conjunction: "text-yellow-400",
  Sextile:     "text-sky-400",
  Square:      "text-red-400",
  Trine:       "text-emerald-400",
  Opposition:  "text-orange-400",
}

interface Props {
  aspects: Aspect[]
}

export default function AspectList({ aspects }: Props) {
  if (aspects.length === 0) return null

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Active Aspects</h2>
      </div>
      <div className="divide-y divide-white/5">
        {aspects.map((a, i) => {
          const color = TYPE_COLOR[a.type]
          return (
            <div key={i} className="flex items-center px-4 py-2.5 gap-3">
              <span className={`text-lg w-6 text-center ${color}`}>{a.symbol}</span>
              <div className="flex-1">
                <span className="text-sm text-white">{a.p1}</span>
                <span className="text-xs text-gray-500 mx-1.5">{a.type.toLowerCase()}</span>
                <span className="text-sm text-white">{a.p2}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-gray-500">{a.orb}° orb</span>
                <span className={`ml-2 text-xs ${a.applying ? "text-green-400" : "text-gray-600"}`}>
                  {a.applying ? "▲ applying" : "▼ separating"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
