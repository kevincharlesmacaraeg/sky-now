import type { Aspect } from "@/lib/planets"

const TYPE_COLOR: Record<Aspect["type"], string> = {
  Conjunction: "text-yellow-600",
  Sextile:     "text-sky-500",
  Square:      "text-red-500",
  Trine:       "text-emerald-600",
  Opposition:  "text-orange-500",
}

interface Props {
  aspects: Aspect[]
}

export default function AspectList({ aspects }: Props) {
  if (aspects.length === 0) return null

  return (
    <div className="rounded border border-black/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-black/10">
        <h2 className="text-[10px] font-semibold text-black/40 uppercase tracking-[0.2em]">Active Aspects</h2>
      </div>
      <div className="divide-y divide-black/5">
        {aspects.map((a, i) => {
          const color = TYPE_COLOR[a.type]
          return (
            <div key={i} className="flex items-center px-4 py-2.5 gap-3">
              <span className={`text-lg w-6 text-center ${color}`}>{a.symbol}</span>
              <div className="flex-1">
                <span className="text-sm text-black">{a.p1}</span>
                <span className="text-xs text-black/35 mx-1.5">{a.type.toLowerCase()}</span>
                <span className="text-sm text-black">{a.p2}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-black/35">{a.orb}° orb</span>
                <span className={`ml-2 text-xs ${a.applying ? "text-emerald-600" : "text-black/25"}`}>
                  {a.applying ? "▲" : "▼"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
