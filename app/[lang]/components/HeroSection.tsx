export function HeroSection({ dict }: { dict: Record<string, any> }) {
  return (
    <section className="hero" id="home">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/video1.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-content">
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
      </div>
    </section>
  )
}
