import { NextResponse } from "next/server"
import { verifyEventSignature, isEventFresh } from "@/lib/wompi"
import { sendNotification } from "@/lib/email"
import { CONSULT_AMOUNT_COP } from "@/lib/config"

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export async function POST(req: Request) {
  const eventsSecret = process.env.WOMPI_EVENTS_SECRET

  if (!eventsSecret) {
    return NextResponse.json({ error: "Webhook no configurado" }, { status: 503 })
  }

  let event: any
  try {
    event = await req.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  if (!verifyEventSignature(event, eventsSecret) || !isEventFresh(event)) {
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 })
  }

  if (event.event !== "transaction.updated") {
    return NextResponse.json({ ok: true })
  }

  const tx = event.data?.transaction
  if (!tx) return NextResponse.json({ ok: true })

  if (tx.status !== "APPROVED") {
    console.log(`[WOMPI] ${tx.reference} → ${tx.status}`)
    return NextResponse.json({ ok: true })
  }

  if (tx.amount_in_cents !== CONSULT_AMOUNT_COP * 100) {
    console.warn(`[WOMPI] Transacción aprobada fuera de alcance: ${tx.reference} ${tx.amount_in_cents}`)
    return NextResponse.json({ ok: true })
  }

  const html = `
    <h2>Pago aprobado — Consulta Estratégica</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Referencia</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(tx.reference || "")}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Transacción</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(tx.id || "")}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Monto</td><td style="padding:8px;border:1px solid #ddd;">$ ${(((tx.amount_in_cents as number) ?? 0) / 100).toLocaleString("es-CO")} COP</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(tx.customer_email || "—")}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Método</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(tx.payment_method_type || "—")}</td></tr>
    </table>
    <p>Confirma la cita con el cliente por correo.</p>
  `

  await sendNotification({ subject: "Pago Wompi — Consulta Estratégica", html })
  return NextResponse.json({ ok: true })
}