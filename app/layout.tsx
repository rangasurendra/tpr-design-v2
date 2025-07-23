import type React from "react"
import "../src/index.css"

export const metadata = {
  title: "React Dashboard",
  description: "Vite-style React dashboard rendered through Next-lite preview",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
