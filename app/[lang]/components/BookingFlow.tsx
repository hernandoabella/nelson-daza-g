"use client"

import { useState, useEffect } from "react"
import { FaTimes, FaArrowRight, FaCalendarAlt } from "react-icons/fa"
import { CALENDLY_URL } from "@/lib/config"
import { EvaluationForm } from "./EvaluationForm"

type BookingFlowProps = {
  dict: Record<string, any>
  lang: string
  onClose: () => void
}

export function BookingFlow({ dict, onClose }: BookingFlowProps) {
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const handleFormComplete = () => setShowForm(false)
  const handleSkipForm = () => setShowForm(false)

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
          width: "100%", maxWidth: showForm ? "680px" : "720px",
          maxHeight: "90vh", overflow: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "24px 28px 0", position: "sticky", top: 0, background: "var(--bg)", zIndex: 10,
          }}
        >
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              {showForm ? "Evaluación Migratoria" : "Agenda tu consulta"}
            </h3>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: "var(--gold)", marginTop: "4px" }}>
              {showForm ? "Opcional — completa o salta al calendario" : "Elige fecha y paga para confirmar"}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--gray)", cursor: "pointer", fontSize: "1.2rem", padding: "8px" }}>
            <FaTimes />
          </button>
        </div>

        <div style={{ padding: "20px 28px 28px" }}>
          {showForm ? (
            <div>
              <EvaluationForm
                onComplete={handleFormComplete}
                onSkip={handleSkipForm}
              />
              <div style={{ textAlign: "center", marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                <button
                  className="btn-primary"
                  onClick={handleSkipForm}
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", fontSize: "0.68rem", border: "none", cursor: "pointer" }}
                >
                  Ir al calendario <FaCalendarAlt />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <p style={{ fontSize: "0.95rem", color: "var(--ink3)", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 20px" }}>
                Selecciona una fecha disponible. Al confirmar, Calendly te pedirá el pago de <strong>$50 USD</strong> para reservar tu cita.
              </p>
              <div
                className="calendly-inline-widget"
                data-url={CALENDLY_URL}
                style={{ minWidth: "320px", height: "580px", borderRadius: "8px", overflow: "hidden" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
