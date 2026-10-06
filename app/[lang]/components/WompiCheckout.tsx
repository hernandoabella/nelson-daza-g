"use client"

import { useState } from "react"
import { FaCreditCard } from "react-icons/fa"
import { SiBitcoin } from "react-icons/si"
import { NOWPAYMENTS_WIDGET_URL, WOMPI_PAYMENT_LINK } from "@/lib/config"

type WompiCheckoutProps = {
  labels: Record<string, string>
  onApproved: () => void
  fallbackToCalendly: () => void
}

export function WompiCheckout({ labels, onApproved, fallbackToCalendly }: WompiCheckoutProps) {
  const [method, setMethod] = useState<"wompi" | "crypto" | null>(null)
  const [opened, setOpened] = useState(false)

  const startPayment = () => {
    window.open(WOMPI_PAYMENT_LINK, "_blank", "noopener,noreferrer")
    setOpened(true)
  }

  const backButton = (
    <button
      onClick={() => { setMethod(null); setOpened(false) }}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: "0.75rem", color: "var(--gray)", textDecoration: "underline",
        padding: "4px",
      }}
    >
      {labels.back}
    </button>
  )

  return (
    <div style={{ textAlign: "center", padding: "10px 0" }}>
      {!method ? (
        <>
          <p style={{ fontSize: "0.9rem", color: "var(--ink3)", lineHeight: 1.7, marginBottom: "18px" }}>
            {labels.payMethods}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", maxWidth: "480px", margin: "0 auto" }}>
            {([
              { key: "wompi" as const, icon: <FaCreditCard />, label: labels.payBtn, sub: "Visa · Mastercard · PSE · Nequi" },
              { key: "crypto" as const, icon: <SiBitcoin />, label: labels.payCryptoBtn, sub: "BTC · USDT · ETH" },
            ]).map((opt) => (
              <div
                key={opt.key}
                onClick={() => setMethod(opt.key)}
                style={{
                  background: "var(--bg2)", borderRadius: "10px", padding: "24px 16px",
                  cursor: "pointer", border: "1px solid var(--border)", textAlign: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)" }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "" }}
              >
                <div style={{ fontSize: "1.4rem", color: "var(--gold)", marginBottom: "10px" }}>{opt.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>
                  {opt.label}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--gray)" }}>
                  {opt.sub}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : method === "wompi" ? (
        <>
          {!opened ? (
            <button
              className="btn-primary"
              onClick={startPayment}
              style={{ border: "none", cursor: "pointer", padding: "14px 34px", fontSize: "0.7rem" }}
            >
              {labels.payBtn}
            </button>
          ) : (
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--ink3)", lineHeight: 1.7, marginBottom: "16px" }}>
                {labels.payOpenedNote}
              </p>
              <button
                className="btn-primary"
                onClick={onApproved}
                style={{ border: "none", cursor: "pointer", padding: "14px 34px", fontSize: "0.7rem" }}
              >
                {labels.payDoneCta}
              </button>
            </div>
          )}
          <div style={{ marginTop: "16px", display: "flex", gap: "16px", justifyContent: "center" }}>
            <button
              onClick={fallbackToCalendly}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.75rem", color: "var(--gray)", textDecoration: "underline",
                padding: "4px",
              }}
            >
              {labels.payFallbackCta}
            </button>
            {backButton}
          </div>
        </>
      ) : (
        <div>
          <p style={{ fontSize: "0.85rem", color: "var(--ink3)", lineHeight: 1.7, marginBottom: "16px" }}>
            {labels.payCryptoNote}
          </p>
          <div style={{ maxHeight: "55vh", overflowY: "auto", marginBottom: "16px", display: "flex", justifyContent: "center" }}>
            <iframe
              src={NOWPAYMENTS_WIDGET_URL}
              width="410"
              height="696"
              frameBorder="0"
              scrolling="no"
              title="NOWPayments"
              style={{ overflowY: "hidden", maxWidth: "100%" }}
            />
          </div>
          <button
            className="btn-primary"
            onClick={onApproved}
            style={{ border: "none", cursor: "pointer", padding: "14px 34px", fontSize: "0.7rem" }}
          >
            {labels.payDoneCta}
          </button>
          <div style={{ marginTop: "16px", display: "flex", gap: "16px", justifyContent: "center" }}>
            <button
              onClick={fallbackToCalendly}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.75rem", color: "var(--gray)", textDecoration: "underline",
                padding: "4px",
              }}
            >
              {labels.payFallbackCta}
            </button>
            {backButton}
          </div>
        </div>
      )}
    </div>
  )
}
