"use client"

import { useState, useEffect } from "react"

interface Props {
  generatedAt: string  // ISO string
}

export default function HourlyCountdown({ generatedAt }: Props) {
  const [remaining, setRemaining] = useState("")

  useEffect(() => {
    function update() {
      const next = new Date(new Date(generatedAt).getTime() + 3_600_000)
      const diff = Math.max(0, next.getTime() - Date.now())
      const m = Math.floor(diff / 60_000)
      const s = Math.floor((diff % 60_000) / 1000)
      setRemaining(`${m}:${String(s).padStart(2, "0")}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [generatedAt])

  return (
    <span className="text-xs text-gray-600 tabular-nums">
      Next reading in {remaining}
    </span>
  )
}
