"use client"

import { useState } from "react"
import { FiChevronDown } from "react-icons/fi"

export function PricingSection({ dict, onBook }: { dict: Record<string, any>; lang: string; onBook: () => void }) {
  const [openAcc, setOpenAcc] = useState<number | null>(null)
  const allPlans = dict.pricing.plans
  const mainPlans = allPlans.filter((p: any) => !p.secondary)
  const secondaryPlans = allPlans.filter((p: any) => p.secondary)

  return (
    <section id="pricing">
      <div className="pricing-intro">
        <div className="section-label">{dict.pricing.label}</div>
        <h2 dangerouslySetInnerHTML={{ __html: dict.pricing.title.replace(/\n/g, "<br />") }} />
        <p>{dict.pricing.intro}</p>
      </div>

      {/* Main plans — full-width cards */}
      <div className="pricing-grid">
        {mainPlans.map((p: any, i: number) => (
          <div className={`pricing-card reveal${p.featured ? " featured" : ""}`} key={`main-${i}`}>
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
            {p.note && <div className="price-note">{p.note}</div>}
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

      {/* Secondary plans — compact cards */}
      {secondaryPlans.length > 0 && (
        <>
          <div className="secondary-pricing-label">
            <span className="secondary-label-line" />
            <span className="secondary-label-text">Servicios adicionales</span>
            <span className="secondary-label-line" />
          </div>
          <div className="pricing-grid-secondary">
            {secondaryPlans.map((p: any, i: number) => (
              <div className="pricing-card pricing-card-secondary reveal" key={`sec-${i}`}>
                <div
                  className="svc-acc-head"
                  role="button"
                  tabIndex={0}
                  aria-expanded={openAcc === i}
                  onClick={() => setOpenAcc(openAcc === i ? null : i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenAcc(openAcc === i ? null : i) } }}
                >
                  <div>
                    <h3>{p.name}</h3>
                    <div className="p-desc">{p.desc}</div>
                  </div>
                  <span className={`svc-acc-chevron${openAcc === i ? " open" : ""}`}><FiChevronDown /></span>
                </div>
                <div className={`svc-acc-body${openAcc === i ? " open" : ""}`}>
                  <div>
                    <ul className="price-features">
                      {p.features.map((f: string, j: number) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                    <button
                      className="btn-ghost"
                      onClick={onBook}
                      style={{ display: "block", textAlign: "center", width: "100%", cursor: "pointer", marginTop: "16px" }}
                    >
                      {p.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
