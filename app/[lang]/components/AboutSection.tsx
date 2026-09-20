import { GiGraduateCap, GiJusticeStar, GiScrollUnfurled, GiGreekTemple } from "react-icons/gi"

const eduIcons = [<GiGraduateCap key="0" />, <GiJusticeStar key="1" />, <GiScrollUnfurled key="2" />, <GiGreekTemple key="3" />]

export function AboutSection({ dict }: { dict: Record<string, any>; lang: string }) {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-left reveal">
          <div className="about-portrait">
            <div className="portrait-frame">
              <img
                src="/lawyer.jpg"
                alt="Nelson Daza"
              />
            </div>
            <div className="portrait-border" />
          </div>
        </div>
        <div className="about-text reveal">
          <div className="section-label">{dict.about.label}</div>
          <h2 dangerouslySetInnerHTML={{ __html: dict.about.title.replace(/\n/g, "<br />") }} />
          <p>{dict.about.p1}</p>
          <p>{dict.about.p2}</p>
          <div className="edu-grid">
            {dict.about.edu.map((e: any, i: number) => (
              <div className="edu-card" key={i}>
                <div className="edu-icon">{eduIcons[i]}</div>
                <div className="edu-info">
                  <h4>{e.title}</h4>
                  <p>{e.subtitle}</p>
                </div>
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
