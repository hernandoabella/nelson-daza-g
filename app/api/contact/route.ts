import { NextRequest, NextResponse } from "next/server"
import { sendNotification } from "@/lib/email"

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, whatsapp, nationality, service, message } = body

    const html = `
      <h2>Nuevo mensaje desde el formulario de contacto</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nombre</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(name || "")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(email || "")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">WhatsApp</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(whatsapp || "")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nacionalidad</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(nationality || "")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Servicio</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(service || "")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Mensaje</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(message || "")}</td></tr>
      </table>
    `

    await sendNotification({ subject: "Contacto web — Nelson Daza", html })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "Error al procesar" }, { status: 500 })
  }
}
