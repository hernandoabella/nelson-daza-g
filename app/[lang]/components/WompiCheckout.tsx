"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    WidgetCheckout?: any
  }
}

const WIDGET_SRC = "https://checkout.wompi.co/widget.js"

type WompiCheckoutProps = {
  labels: Record<string, string>
  onApproved: (transaction: Record<string, unknown>) => void
  onDeclined: () => void
  fallbackToCalendly: () => void
}

export function WompiCheckout({ labels, onApproved, onDeclined, fallbackToCalendly }: WompiCheckoutProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "opening" | "error">("idle")
  const [error, setError] = useState<"unavailable" | "widget" | null>(null)

  useEffect(() => {
    if (window.WidgetCheckout) return
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return
    const s = document.createElement("script")
    s.src = WIDGET_SRC
    s.async = true
    document.body.appendChild(s)
  }, [])

  const startPayment = async () => {
    setError(null)
    setStatus("loading")

    let config: {
      publicKey: string
      reference: string
      amountInCents: number
      currency: string
      signature: string
    }

    try {
      const res = await fetch("/api/wompi/checkout", { method: "POST" })
      if (!res.ok) throw new Error("checkout_failed")
      config = await res.json()
    } catch {
      setStatus("error")
      setError("unavailable")
      return
    }

    if (!window.WidgetCheckout) {
      setStatus("error")
      setError("widget")
      return
    }

    const checkout = new window.WidgetCheckout({
      currency: config.currency,
      amountInCents: config.amountInCents,
      reference: config.reference,
      publicKey: config.publicKey,
      signature: { integrity: config.signature },
    })

    setStatus("opening")
    checkout.open(function (result: any) {
      const transaction = result?.transaction
      if (transaction?.status === "APPROVED") {
        onApproved(transaction)
      } else {
        setStatus("idle")
        onDeclined()
      }
    })
  }

  if (status === "error") {
    return (
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <p style={{ fontSize: "0.9rem", color: "var(--ink3)", lineHeight: 1.7, marginBottom: "18px" }}>
          {error === "widget" ? labels.payWidgetError : labels.payUnavailable}
        </p>
        <button
          className="btn-primary"
          onClick={fallbackToCalendly}
          style={{ border: "none", cursor: "pointer", padding: "13px 30px", fontSize: "0.68rem" }}
        >
          {labels.payFallbackCta}
        </button>
      </div>
    )
  }

  return (
    <div style={{ textAlign: "center", padding: "10px 0" }}>
      <p style={{ fontSize: "0.9rem", color: "var(--ink3)", lineHeight: 1.7, marginBottom: "18px" }}>
        {labels.payMethods}
      </p>
      <button
        className="btn-primary"
        onClick={startPayment}
        disabled={status === "loading" || status === "opening"}
        style={{ border: "none", cursor: "pointer", padding: "14px 34px", fontSize: "0.7rem" }}
      >
        {status === "loading" || status === "opening" ? labels.payProcessing : labels.payBtn}
      </button>
    </div>
  )
}