import type { SkyReading } from "@/lib/reading"

interface Props {
  reading: SkyReading
}

export default function SkyReadingPanel({ reading }: Props) {
  const paragraphs = reading.body.split(/\n\n+/).filter(Boolean)

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-white/10">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Sky Reading</p>
        <h2 className="text-xl font-semibold text-white leading-snug">{reading.headline}</h2>
        {reading.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {reading.keywords.map((kw) => (
              <span
                key={kw}
                className="text-xs px-2 py-0.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 py-5 space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-gray-300 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}
