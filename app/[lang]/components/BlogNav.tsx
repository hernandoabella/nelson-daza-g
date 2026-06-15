"use client"

import { useRouter, usePathname } from "next/navigation"

export function BlogNav({ dict, lang }: { dict: Record<string, any>; lang: string; onBook?: () => void }) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLang = (l: string) => {
    const newPath = pathname.replace(/^\/(es|en|ru)/, `/${l}`)
    router.push(newPath)
  }

  const isActive = (l: string) => l === lang ? "active" : ""

  return (
    <div className="lang-bar" style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <button className={`lang-btn ${isActive("es")}`} onClick={() => switchLang("es")}>ES</button>
      <span className="lang-sep">|</span>
      <button className={`lang-btn ${isActive("en")}`} onClick={() => switchLang("en")}>EN</button>
      <span className="lang-sep">|</span>
      <button className={`lang-btn ${isActive("ru")}`} onClick={() => switchLang("ru")}>RU</button>
    </div>
  )
}
