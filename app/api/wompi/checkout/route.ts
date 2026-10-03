import { NextResponse } from "next/server"
import { generateReference, createIntegritySignature } from "@/lib/wompi"
import { CONSULT_AMOUNT_COP } from "@/lib/config"

export async function POST() {
  const publicKey = process.env.WOMPI_PUBLIC_KEY
  const integritySecret = process.env.WOMPI_INTEGRITY_SECRET

  if (!publicKey || !integritySecret) {
    return NextResponse.json(
      { error: "Pagos no configurados" },
      { status: 503 },
    )
  }

  const currency = "COP"
  const reference = generateReference()
  const signature = createIntegritySignature(
    reference,
    CONSULT_AMOUNT_COP,
    currency,
    integritySecret,
  )

  return NextResponse.json({
    publicKey,
    reference,
    amountInCents: CONSULT_AMOUNT_COP,
    currency,
    signature,
  })
}