"use client"

import { useState, useEffect, useRef } from "react"
import { FaTimes, FaCheck } from "react-icons/fa"
import { CALENDLY_FREE, CALENDLY_PAID } from "@/lib/config"

declare global {
  interface Window { Calendly?: any }
}

type BookingFlowProps = {
  dict: Record<string, any>
  lang: string
  onClose: () => void
}

export function BookingFlow({ dict, onClose }: BookingFlowProps) {
  const [selected, setSelected] = useState<"free" | "paid" | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const opts = dict.bookingOptions

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    if (!selected || !containerRef.current) return

    const el = containerRef.current
    el.innerHTML = ""
    const url = selected === "free" ? CALENDLY_FREE : CALENDLY_PAID

    const init = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url,
          parentElement: el,
        })
      }
    }

    if (window.Calendly) {
      init()
    } else {
      // Esperar a que cargue widget.js
      const check = setInterval(() => {
        if (window.Calendly) {
          clearInterval(check)
          init()
        }
      }, 200)
      return () => clearInterval(check)
    }
  }, [selected])

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        padding: "20px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: "var(--bg)", borderRadius: "12px",
          width: "100%", maxWidth: selected ? "720px" : "680px",
          maxHeight: "90vh", overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "24px 28px 0", position: "sticky", top: 0, background: "transparent", zIndex: 10,
          }}
        >
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              {selected ? (selected === "free" ? opts.freeName : opts.paidName) : opts.title}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--gray)", cursor: "pointer", fontSize: "1.2rem", padding: "8px" }}>
            <FaTimes />
          </button>
        </div>

        <div style={{ padding: "20px 28px 28px" }}>
          {!selected ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div
                onClick={() => setSelected("free")}
                style={{
                  background: "var(--bg2)", borderRadius: "10px", padding: "28px 24px",
                  cursor: "pointer", border: "1px solid var(--border)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)" }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "" }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>
                  {opts.freeName}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--gold)", marginBottom: "14px" }}>
                  {opts.freeDesc}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {opts.freeBullets.map((b: string, i: number) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--ink3)", marginBottom: "6px" }}>
                      <FaCheck style={{ color: "var(--gold)", fontSize: "0.55rem", flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn-primary"
                  style={{ marginTop: "16px", width: "100%", border: "none", cursor: "pointer", padding: "12px", fontSize: "0.68rem" }}
                >
                  {opts.freeCta}
                </button>
              </div>

              <div
                onClick={() => setSelected("paid")}
                style={{
                  background: "var(--bg2)", borderRadius: "10px", padding: "28px 24px",
                  cursor: "pointer", border: "2px solid var(--gold)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)" }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "" }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>
                  {opts.paidName}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--gold)", marginBottom: "14px" }}>
                  {opts.paidDesc}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {opts.paidBullets.map((b: string, i: number) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--ink3)", marginBottom: "6px" }}>
                      <FaCheck style={{ color: "var(--gold)", fontSize: "0.55rem", flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn-primary"
                  style={{ marginTop: "16px", width: "100%", border: "none", cursor: "pointer", padding: "12px", fontSize: "0.68rem" }}
                >
                  {opts.paidCta}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <p style={{ fontSize: "0.95rem", color: "var(--ink3)", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 20px" }}
                dangerouslySetInnerHTML={{ __html: selected === "free" ? opts.freeCalDesc : opts.paidCalDesc }}
              />
              <div ref={containerRef} style={{ minWidth: "320px", height: "580px", borderRadius: "8px", overflow: "hidden" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
