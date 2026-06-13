type Props = {
  imgSrc: string
  icon: string
  label?: string
  title: string
  sub?: string
  stats?: { num: string; label: string }[]
  cta?: { text: string; href: string }
  height?: number
}

export function ImageBanner({ imgSrc, icon, label, title, sub, stats, cta, height }: Props) {
  return (
    <div className="img-banner reveal-banner" style={height ? { height: `${height}px` } : undefined}>
      <div className="img-banner-imgwrap">
        <img src={imgSrc} alt="" />
      </div>
      <div className="img-banner-frame" />
      <div className="img-banner-content">
        <div className="img-banner-icon">{icon}</div>
        {label && <div className="section-label">{label}</div>}
        <h2 dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }} />
        {sub && <p>{sub}</p>}
        {stats && (
          <div className="img-banner-stats">
            {stats.map((s, i) => (
              <div className="bstat" key={i}>
                <div className="bstat-num">{s.num}</div>
                <div className="bstat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {cta && (
          <div className="banner-cta">
            <a href={cta.href}>{cta.text}</a>
          </div>
        )}
      </div>
    </div>
  )
}
