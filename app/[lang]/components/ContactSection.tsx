"use client"

import { useState } from "react"
import { FaMapMarkerAlt, FaPhoneAlt, FaGlobeAmericas, FaClock } from "react-icons/fa"

const contactIcons = [<FaMapMarkerAlt key="0" />, <FaPhoneAlt key="1" />, <FaGlobeAmericas key="2" />, <FaClock key="3" />]

export function ContactSection({ dict, onBook }: { dict: Record<string, any>; lang: string; onBook: () => void }) {
  const [btnText, setBtnText] = useState(dict.contact.form.submit)
  const [btnDisabled, setBtnDisabled] = useState(false)

  const handleSubmit = () => {
    setBtnText(dict.contact.form.success)
    setBtnDisabled(true)
    setTimeout(() => {
      setBtnText(dict.contact.form.submit)
      setBtnDisabled(false)
    }, 3500)
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
        <div className="contact-form reveal">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{dict.contact.form.name}</label>
              <input type="text" className="form-input" placeholder={dict.contact.form.namePlaceholder} />
            </div>
            <div className="form-group">
              <label className="form-label">{dict.contact.form.email}</label>
              <input type="email" className="form-input" placeholder={dict.contact.form.emailPlaceholder} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{dict.contact.form.whatsapp}</label>
              <input type="tel" className="form-input" placeholder={dict.contact.form.whatsappPlaceholder} />
            </div>
            <div className="form-group">
              <label className="form-label">{dict.contact.form.nationality}</label>
              <input type="text" className="form-input" placeholder={dict.contact.form.nationalityPlaceholder} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{dict.contact.form.service}</label>
            <select className="form-select">
              {dict.contact.form.options.map((o: string, i: number) => (
                <option key={i} value={o === dict.contact.form.servicePlaceholder ? "" : o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{dict.contact.form.caseLabel}</label>
            <textarea className="form-textarea" placeholder={dict.contact.form.casePlaceholder} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn-primary"
              style={{ flex: 1, fontSize: "0.7rem", letterSpacing: "0.12em", padding: "16px", border: "none", cursor: "pointer" }}
              onClick={handleSubmit}
              disabled={btnDisabled}
            >
              {btnText}
            </button>
            <button
              className="btn-ghost"
              onClick={onBook}
              style={{ fontSize: "0.7rem", letterSpacing: "0.12em", padding: "16px 24px", cursor: "pointer" }}
            >
              {dict.nav.cta}
            </button>
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.06em", color: "var(--gray)", textAlign: "center", marginTop: "12px", lineHeight: "1.6" }}>
            {dict.contact.form.privacy}
          </p>
        </div>
      </div>
    </section>
  )
}
