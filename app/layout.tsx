import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "are you and kevin a good match?",
  description: "find out if the stars align",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
