import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nelson Daza — Миграционный адвокат",
  description: "Профессиональная миграционная поддержка для иностранцев в Колумбии",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
