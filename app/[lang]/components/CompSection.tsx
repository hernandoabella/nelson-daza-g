export function CompSection({ dict }: { dict: Record<string, any>; lang: string }) {
  return (
    <section className="comp-bg">
      <div className="section-label">{dict.comp.label}</div>
      <h2 dangerouslySetInnerHTML={{ __html: dict.comp.title.replace(/\n/g, "<br />") }} />
      <div className="comp-grid">
        {dict.comp.items.map((c: any, i: number) => (
          <div className="comp-card reveal" key={i}>
            <h4>{c.name}</h4>
            <div className="comp-fee">{c.fee}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
