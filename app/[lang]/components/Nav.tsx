"use client"

import { useRouter, usePathname } from "next/navigation"

export function Nav({ dict, lang, onBook }: { dict: Record<string, any>; lang: string; onBook: () => void }) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLang = (l: string) => {
    const newPath = pathname.replace(/^\/(es|en|ru)/, `/${l}`)
    router.push(newPath)
  }

  const isActive = (l: string) => l === lang ? "active" : ""

  return (
    <>
      <nav id="navbar">
        <a href={`/${lang}`} className="nav-logo">
          <img src="/logo.jpeg" alt="Nelson Daza" className="nav-logo-img" />
        </a>
        <ul className="nav-links">
          <li><a href={`/${lang}#about`}>{dict.nav.about}</a></li>
          <li><a href={`/${lang}#services`}>{dict.nav.services}</a></li>
          <li><a href={`/${lang}#pricing`}>{dict.nav.pricing}</a></li>
          <li><a href={`/${lang}#process`}>{dict.nav.process}</a></li>
          <li><a href={`/${lang}/blog`}>{dict.nav.blog}</a></li>
          <li><a href={`/${lang}#contact`}>{dict.nav.contact}</a></li>
        </ul>
        <div className="nav-cta-wrap">
          <div className="nav-langs">
            <button className={`nav-lang-btn ${isActive("es")}`} onClick={() => switchLang("es")}><span className="flag" aria-hidden>🇪🇸</span>ES</button>
            <button className={`nav-lang-btn ${isActive("en")}`} onClick={() => switchLang("en")}><span className="flag" aria-hidden>🇬🇧</span>EN</button>
            <button className={`nav-lang-btn ${isActive("ru")}`} onClick={() => switchLang("ru")}><span className="flag" aria-hidden>🇷🇺</span>RU</button>
          </div>
          <button
            className="nav-cta btn-primary"
            onClick={onBook}
            style={{ padding: "11px 26px", fontSize: "0.68rem", border: "none", cursor: "pointer" }}
          >
            {dict.nav.cta}
          </button>
        </div>
      </nav>
    </>
  )
}
