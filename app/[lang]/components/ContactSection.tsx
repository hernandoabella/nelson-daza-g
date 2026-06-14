"use client"

import { useState, FormEvent } from "react"
import { FaMapMarkerAlt, FaPhoneAlt, FaGlobeAmericas, FaClock } from "react-icons/fa"

const contactIcons = [<FaMapMarkerAlt key="0" />, <FaPhoneAlt key="1" />, <FaGlobeAmericas key="2" />, <FaClock key="3" />]

export function ContactSection({ dict, onBook }: { dict: Record<string, any>; lang: string; onBook: () => void }) {
  const [btnText, setBtnText] = useState(dict.contact.form.submit)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", nationality: "", service: "", message: "" })

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setBtnDisabled(true)
    setBtnText("Enviando...")
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      setBtnText(dict.contact.form.success)
      setForm({ name: "", email: "", whatsapp: "", nationality: "", service: "", message: "" })
    } catch {
      setBtnText("Error — intenta de nuevo")
      setBtnDisabled(false)
    }
    setTimeout(() => { setBtnText(dict.contact.form.submit); setBtnDisabled(false) }, 3000)
  }

  return (
    <section id="contact" style={{ background: "var(--bg2)" }}>
      <div className="section-label">{dict.contact.label}</div>
      <h2 dangerouslySetInnerHTML={{ __html: dict.contact.title.replace(/\n/g, "<br />") }} />
      <div className="contact-grid">
        <div className="contact-info reveal">
          <h3>{dict.contact.introTitle}</h3>
          <p>{dict.contact.intro}</p>
          <div className="contact-details">
            {dict.contact.details.map((d: any, i: number) => (
              <div className="contact-item" key={i}>
                <div className="contact-item-icon">{contactIcons[i]}</div>
                <div className="contact-item-text">
                  <h5>{d.label}</h5>
                  <p>{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{dict.contact.form.name}</label>
              <input type="text" className="form-input" placeholder={dict.contact.form.namePlaceholder} value={form.name} onChange={e => update("name", e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">{dict.contact.form.email}</label>
              <input type="email" className="form-input" placeholder={dict.contact.form.emailPlaceholder} value={form.email} onChange={e => update("email", e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{dict.contact.form.whatsapp}</label>
              <input type="tel" className="form-input" placeholder={dict.contact.form.whatsappPlaceholder} value={form.whatsapp} onChange={e => update("whatsapp", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">{dict.contact.form.nationality}</label>
              <input type="text" className="form-input" placeholder={dict.contact.form.nationalityPlaceholder} value={form.nationality} onChange={e => update("nationality", e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{dict.contact.form.service}</label>
            <select className="form-select" value={form.service} onChange={e => update("service", e.target.value)}>
              {dict.contact.form.options.map((o: string, i: number) => (
                <option key={i} value={o === dict.contact.form.servicePlaceholder ? "" : o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{dict.contact.form.caseLabel}</label>
            <textarea className="form-textarea" placeholder={dict.contact.form.casePlaceholder} value={form.message} onChange={e => update("message", e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn-primary"
              style={{ flex: 1, fontSize: "0.7rem", letterSpacing: "0.12em", padding: "16px", border: "none", cursor: btnDisabled ? "default" : "pointer" }}
              type="submit"
              disabled={btnDisabled}
            >
              {btnText}
            </button>
            <button
              className="btn-ghost"
              onClick={onBook}
              type="button"
              style={{ fontSize: "0.7rem", letterSpacing: "0.12em", padding: "16px 24px", cursor: "pointer" }}
            >
              {dict.nav.cta}
            </button>
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.06em", color: "var(--gray)", textAlign: "center", marginTop: "12px", lineHeight: "1.6" }}>
            {dict.contact.form.privacy}
          </p>
        </form>
      </div>
    </section>
  )
}
