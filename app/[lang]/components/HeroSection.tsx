export function HeroSection({ dict }: { dict: Record<string, any>; lang: string }) {
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className="hero-eyebrow">{dict.hero.eyebrow}</div>
        <h1>
          {dict.hero.title1}<br />
          {dict.hero.title2}<em>{dict.hero.titleEm}</em><br />
          {dict.hero.title3}
        </h1>
        <p className="hero-sub">{dict.hero.sub}</p>
        <div className="hero-actions">
          <a href="#pricing" className="btn-primary">{dict.hero.ctaPrimary}</a>
          <a href="#services" className="btn-ghost">{dict.hero.ctaSecondary}</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">{dict.hero.stat1Num}</div><div className="stat-label">{dict.hero.stat1Label}</div></div>
          <div className="stat"><div className="stat-num">{dict.hero.stat2Num}</div><div className="stat-label">{dict.hero.stat2Label}</div></div>
          <div className="stat"><div className="stat-num">{dict.hero.stat3Num}</div><div className="stat-label">{dict.hero.stat3Label}</div></div>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=80&auto=format&fit=crop"
          alt="Nelson Daza"
        />
      </div>
    </section>
  )
}
