"use client"

import { useRouter, usePathname } from "next/navigation"

export function Nav({ dict, lang }: { dict: Record<string, any>; lang: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLang = (l: string) => {
    const newPath = pathname.replace(/^\/(es|en|ru)/, `/${l}`)
    router.push(newPath)
  }

  const isActive = (l: string) => l === lang ? "active" : ""

  return (
    <>
      <div className="lang-bar">
        <button className={`lang-btn ${isActive("es")}`} onClick={() => switchLang("es")}>
          🇨🇴 {dict.lang.es}
        </button>
        <span className="lang-sep">|</span>
        <button className={`lang-btn ${isActive("en")}`} onClick={() => switchLang("en")}>
          🇺🇸 {dict.lang.en}
        </button>
        <span className="lang-sep">|</span>
        <button className={`lang-btn ${isActive("ru")}`} onClick={() => switchLang("ru")}>
          🇷🇺 {dict.lang.ru}
        </button>
      </div>
      <nav id="navbar">
        <a href={`/${lang}`} className="nav-logo" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span>Nelson </span><span style={{ color: "var(--gold)" }}>Daza</span>
        </a>
        <ul className="nav-links">
          <li><a href={`/${lang}#about`}>{dict.nav.about}</a></li>
          <li><a href={`/${lang}#services`}>{dict.nav.services}</a></li>
          <li><a href={`/${lang}#pricing`}>{dict.nav.pricing}</a></li>
          <li><a href={`/${lang}#process`}>{dict.nav.process}</a></li>
          <li><a href={`/${lang}#contact`}>{dict.nav.contact}</a></li>
        </ul>
        <a href={`/${lang}#pricing`} className="nav-cta btn-primary" style={{ padding: "11px 26px", fontSize: "0.68rem" }}>
          {dict.nav.cta}
        </a>
      </nav>
    </>
  )
}
