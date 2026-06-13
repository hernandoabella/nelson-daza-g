export function PricingSection({ dict, onBook }: { dict: Record<string, any>; lang: string; onBook: () => void }) {
  return (
    <section id="pricing">
      <div className="pricing-intro">
        <div className="section-label">{dict.pricing.label}</div>
        <h2 dangerouslySetInnerHTML={{ __html: dict.pricing.title.replace(/\n/g, "<br />") }} />
        <p>{dict.pricing.intro}</p>
      </div>
      <div className="pricing-grid">
        {dict.pricing.plans.map((p: any, i: number) => (
          <div className={`pricing-card reveal${p.featured ? " featured" : ""}`} key={i}>
            {p.badge && <div className="pricing-badge">{p.badge}</div>}
            <h3>{p.name}</h3>
            <div className="p-desc">{p.desc}</div>
            <div className="price-amount"><span>$</span>{p.price.replace("$", "")}</div>
            <div className="price-unit">{p.unit}</div>
            <ul className="price-features">
              {p.features.map((f: string, j: number) => (
                <li key={j}>{f}</li>
              ))}
            </ul>
            <div className="price-note">{p.note}</div>
            <br />
            <button
              className={p.featured ? "btn-primary" : "btn-ghost"}
              onClick={onBook}
              style={{ display: "block", textAlign: "center", width: "100%", border: p.featured ? "none" : undefined, cursor: "pointer" }}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
