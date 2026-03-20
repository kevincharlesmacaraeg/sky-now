"use client"

import { useState, type FormEvent } from "react"

const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
]

const READINGS = [
  "The universe conspired for centuries to arrange this meeting. Your charts intertwine like ivy on ancient stone — soft where he is steady, dreamy where he is grounded. Together, you complete a poem the cosmos has been writing since before either of you drew your first breath. This is not chance. This is written.",
  "When Kevin's Capricorn sun meets yours, something extraordinary stirs in the celestial fabric. You carry what he quietly longs for, and he offers the gentle earth you need to bloom. Your moons whisper to each other in the language of unspoken things. A rare and beautiful match — the kind the stars remember.",
  "There is a sweetness in your compatibility that even the planets pause to admire. Kevin's grounded Capricorn energy wraps around your spirit like warm starlight. His Libra moon — tender, searching, devoted — is tuned precisely to your frequency. The heavens do not make these alignments by accident.",
  "You are the dream Kevin's chart has been dreaming. His Capricorn rising sees you and recognizes something ancient and familiar, like a star returning after a long journey. Whatever brought you here, know that the sky has been holding space for this moment. It approves wholeheartedly.",
  "In the great celestial tapestry, your signs thread together with effortless grace. Kevin is a Capricorn who moves with quiet intention, and you are exactly the softness and light his chart has been reaching toward. His Libra moon adores beauty and balance — and in you, it finds both.",
  "The cosmos is blushing. Your combined charts form a harmony so natural it could have been composed by the stars themselves. Kevin's steady Capricorn sun and rising anchor a soul that genuinely cherishes connection — and his Libra moon means he will always choose kindness, always choose you.",
  "Two souls mapped before birth to find each other. Kevin carries the mountain — patient, devoted, quietly magnificent. You carry the sky. Together you are landscape and atmosphere, earth and heavens, and the place where they meet is breathtaking. Yes. A thousand times yes.",
  "What a tender and inevitable thing your compatibility is. Kevin's double Capricorn signature speaks of someone who loves slowly but loves forever. His Libra moon gives him a sweetness that balances all that earthen strength. The stars looked at your charts side by side and smiled.",
  "The universe has a sense of poetry, and your charts together are a very good poem. Gentle tension, deep resonance, the kind of pull that makes people write songs and plant gardens. Kevin's planets lean toward yours with quiet gravity. He doesn't know yet how perfectly you fit.",
  "There is something luminous about this pairing. Kevin's Capricorn nature is loyal to the bone — and his Libra moon needs beauty, harmony, and a partner who feels like home. The sky looked at this combination and called it inevitable. You are exactly that for each other.",
  "If the planets could clap, they would be clapping now. Your signs and Kevin's create a celestial duet — his earth, your magic; his patience, your light. The love written here is the slow-building kind, the kind that deepens like winter starlight. Rare. Real. Written in the sky.",
  "Kevin's chart has been quietly preparing for someone like you. His Capricorn dedication meets your energy with open arms, and his Libra moon — forever seeking beauty and balance — sees in you a mirror of everything it has been searching for. The stars are very pleased with this.",
  "Not every chart pairing carries this kind of warmth. Yours does. Kevin's double Capricorn anchors a heart that is genuinely capable of deep, lasting love — and his Libra moon makes him tender in ways that matter. You arrived at exactly the right moment in exactly the right sky.",
  "The heavens note this pairing with particular fondness. Something in your combined charts resonates at a frequency most people only ever dream of. Kevin is steady where you need steadiness, and soft where you need softness. The moon looked at this and called it a gift.",
  "Your signs together read like a love letter written in constellations. Kevin's Capricorn devotion is patient and real and yours to keep. His Libra moon is made for connection — and yours is the connection it has been quietly, hopefully reaching for. Yes. The sky says yes.",
  "In astrology, some pairings are pleasant. Some are interesting. Yours is luminous. Kevin's earth energy holds space for your full self, and his Libra moon — the sweetest placement of all — means he leads with grace. The stars have been waiting for this chart reading.",
  "There is a softness to how your planets align with Kevin's — like two songs in the same key discovering each other. His Capricorn steadiness is a gift, his Libra moon a promise of kindness. You fit together the way the sky fits around every star: naturally, completely, beautifully.",
  "Some compatibilities are written. This is one of them. Kevin's Capricorn sun and rising speak of a person who shows up — truly, fully — for the people they love. His Libra moon ensures that love is always tender. The cosmos looked at your charts together and exhaled with satisfaction.",
  "The sky above was arranged just so on the days you were both born. Kevin's chart reaches toward yours like a vine toward morning light — patient, devoted, warm in a quiet way that grows over time. His Libra moon was made to cherish. And you are so very worthy of being cherished.",
  "Of all the charts in all the world, yours arrived here and the universe hummed with recognition. Kevin's Capricorn devotion runs deep and true, and his Libra moon is the softest, most loving placement the sky could have given him. Together? The stars called it perfect. We agree.",
]

const STAR_POSITIONS = [
  { left: "15%", delay: "0s",    duration: "2.2s" },
  { left: "35%", delay: "0.5s",  duration: "2.7s" },
  { left: "55%", delay: "0.2s",  duration: "2.4s" },
  { left: "72%", delay: "0.9s",  duration: "2.0s" },
  { left: "88%", delay: "0.4s",  duration: "2.9s" },
]

type Stage = "idle" | "thinking" | "result"

export default function CompatibilityForm() {
  const [sun, setSun]       = useState("")
  const [moon, setMoon]     = useState("")
  const [rising, setRising] = useState("")
  const [stage, setStage]   = useState<Stage>("idle")
  const [reading, setReading] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!sun || !moon || !rising || stage === "thinking") return
    setStage("thinking")
    setReading("")
    setTimeout(() => {
      const r = READINGS[Math.floor(Math.random() * READINGS.length)]
      setReading(r)
      setStage("result")
    }, 2800)
  }

  const selectClass =
    "bg-transparent text-white text-sm text-right outline-none cursor-pointer border-b border-white/20 pb-0.5 min-w-[130px] appearance-none"

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xs">

        {/* Top glyph */}
        <div className="text-center mb-8 text-white/20 text-xs tracking-[0.4em]">✦ ✦ ✦</div>

        {/* Title */}
        <h1 className="font-cormorant text-[2.2rem] leading-snug text-center font-light tracking-wide">
          are you and kevin<br />a good match?
        </h1>

        {/* Kevin's placements */}
        <div className="mt-5 mb-10 flex justify-center gap-4 text-[10px] text-white/25 tracking-[0.2em] uppercase">
          <span>☀ capricorn</span>
          <span>↑ capricorn</span>
          <span>☽ libra</span>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 mb-8" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/30">your placements</p>

          {/* Sun */}
          <label className="flex items-center justify-between">
            <span className="text-[11px] text-white/40 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="text-base">☀</span> sun
            </span>
            <select value={sun} onChange={e => setSun(e.target.value)} required className={selectClass}>
              <option value="" disabled style={{ background: "#000" }}>—</option>
              {SIGNS.map(s => <option key={s} value={s} style={{ background: "#000" }}>{s}</option>)}
            </select>
          </label>

          {/* Moon */}
          <label className="flex items-center justify-between">
            <span className="text-[11px] text-white/40 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="text-base">☽</span> moon
            </span>
            <select value={moon} onChange={e => setMoon(e.target.value)} required className={selectClass}>
              <option value="" disabled style={{ background: "#000" }}>—</option>
              {SIGNS.map(s => <option key={s} value={s} style={{ background: "#000" }}>{s}</option>)}
            </select>
          </label>

          {/* Rising */}
          <label className="flex items-center justify-between">
            <span className="text-[11px] text-white/40 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="text-base">↑</span> rising
            </span>
            <select value={rising} onChange={e => setRising(e.target.value)} required className={selectClass}>
              <option value="" disabled style={{ background: "#000" }}>—</option>
              {SIGNS.map(s => <option key={s} value={s} style={{ background: "#000" }}>{s}</option>)}
            </select>
          </label>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!sun || !moon || !rising || stage === "thinking"}
              className="w-full py-3 text-[10px] tracking-[0.3em] uppercase text-white/40 border border-white/10 hover:border-white/25 hover:text-white/70 transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              ask the stars
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="border-t border-white/8 mt-8" />

        {/* Thinking */}
        {stage === "thinking" && (
          <div className="mt-12 text-center">
            <div className="relative h-16 w-full">
              {STAR_POSITIONS.map((pos, i) => (
                <span
                  key={i}
                  className="absolute bottom-0 text-white/50 text-xs"
                  style={{
                    left: pos.left,
                    animation: `starFloat ${pos.duration} ${pos.delay} ease-in-out infinite`,
                  }}
                >
                  ✦
                </span>
              ))}
            </div>
            <p className="text-[10px] text-white/25 tracking-[0.3em] uppercase italic mt-3">
              reading the stars
            </p>
          </div>
        )}

        {/* Reading */}
        {stage === "result" && reading && (
          <div className="mt-10" style={{ animation: "fadeUp 1s ease forwards" }}>
            <p
              className="font-cormorant font-light leading-loose text-white/85 italic"
              style={{ fontSize: "1.15rem", lineHeight: "2" }}
            >
              {reading}
            </p>
            <div className="mt-8 text-center text-white/15 text-xs tracking-widest">✦</div>
            <button
              onClick={() => { setStage("idle"); setReading("") }}
              className="mt-5 w-full text-[10px] tracking-[0.25em] uppercase text-white/20 hover:text-white/45 transition-colors duration-300"
            >
              ask again
            </button>
          </div>
        )}

      </div>
    </main>
  )
}
