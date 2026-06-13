export function AboutSection({ dict }: { dict: Record<string, any>; lang: string }) {
  return (
    <section id="about">
      <div className="section-label">{dict.about.label}</div>
      <h2 dangerouslySetInnerHTML={{ __html: dict.about.title.replace(/\n/g, "<br />") }} />
      <div className="about-grid">
        <div className="about-portrait reveal">
          <div className="portrait-frame">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop"
              alt="Nelson Daza"
            />
          </div>
          <div className="portrait-border" />
        </div>
        <div className="about-text reveal">
          <p>{dict.about.p1}</p>
          <p>{dict.about.p2}</p>
          <div className="edu-grid">
            {dict.about.edu.map((e: any, i: number) => (
              <div className="edu-card" key={i}>
                <div className="edu-icon">{e.icon}</div>
                <h4>{e.title}</h4>
                <p>{e.subtitle}</p>
              </div>
            ))}
          </div>
          <div className="lang-pills">
            {dict.about.langs.map((l: string, i: number) => (
              <span className="lang-pill" key={i}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
