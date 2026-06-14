import { NextRequest, NextResponse } from "next/server"
import { sendNotification } from "@/lib/email"

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function field(label: string, value: string | undefined): string {
  return `<tr><td style="padding:6px 10px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9;">${escapeHtml(label)}</td><td style="padding:6px 10px;border:1px solid #ddd;">${escapeHtml(value || "—")}</td></tr>`
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const rows = Object.entries(data).map(([key, val]) =>
      field(key, Array.isArray(val) ? val.join(", ") : String(val))
    ).join("\n")

    const html = `
      <h2>Evaluación migratoria completada</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        ${rows}
      </table>
    `

    await sendNotification({ subject: "Evaluación migratoria — Nelson Daza", html })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "Error al procesar" }, { status: 500 })
  }
}
