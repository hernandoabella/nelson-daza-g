export function ServicesSection({ dict }: { dict: Record<string, any>; lang: string }) {
  return (
    <section id="services" className="services-bg">
      <div className="section-label">{dict.services.label}</div>
      <h2 dangerouslySetInnerHTML={{ __html: dict.services.title.replace(/\n/g, "<br />") }} />
      <div className="services-grid">
        {dict.services.items.map((s: any, i: number) => (
          <div className="service-card reveal" key={i}>
            <div className="service-num">{s.num}</div>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
            <div className="service-fee">{s.fee}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
