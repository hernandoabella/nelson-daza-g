import "server-only"
import { createHash, randomBytes, timingSafeEqual } from "node:crypto"

const sha256Hex = (value: string) => createHash("sha256").update(value).digest("hex")

export function generateReference(prefix = "CONS"): string {
  const stamp = Date.now().toString(36).toUpperCase()
  const salt = randomBytes(3).toString("hex").toUpperCase()
  return `${prefix}-${stamp}-${salt}`
}

// https://docs.wompi.co/docs/colombia/widget-checkout-web/#paso-3-genera-una-firma-de-integridad
export function createIntegritySignature(
  reference: string,
  amountInCents: number,
  currency: string,
  integritySecret: string,
): string {
  return sha256Hex(`${reference}${amountInCents}${currency}${integritySecret}`)
}

type WompiEvent = {
  event?: string
  data?: Record<string, unknown>
  signature?: { properties?: string[]; checksum?: string }
  timestamp?: number
  sent_at?: string
}

function resolveProperty(data: unknown, path: string): string | null {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc === null || typeof acc !== "object") return undefined
    return (acc as Record<string, unknown>)[key]
  }, data)

  if (value === null || value === undefined) return null
  return String(value)
}

// https://docs.wompi.co/docs/colombia/eventos/
export function verifyEventSignature(event: WompiEvent, eventsSecret: string): boolean {
  const properties = event.signature?.properties
  const received = event.signature?.checksum
  const timestamp = event.timestamp
  const data = event.data

  if (!Array.isArray(properties) || properties.length === 0) return false
  if (!received || typeof timestamp !== "number" || !data) return false

  const values = properties.map((path) => resolveProperty(data, path))
  if (values.some((value) => value === null)) return false

  const expected = sha256Hex(`${values!.join("")}${timestamp}${eventsSecret}`)

  const a = Buffer.from(expected.toLowerCase(), "utf8")
  const b = Buffer.from(String(received).toLowerCase(), "utf8")
  if (a.length !== b.length) return false

  return timingSafeEqual(a, b)
}

const MAX_EVENT_AGE_SECONDS = 5 * 60

export function isEventFresh(event: WompiEvent, nowSeconds = Math.floor(Date.now() / 1000)): boolean {
  if (typeof event.timestamp !== "number") return false
  return Math.abs(nowSeconds - event.timestamp) <= MAX_EVENT_AGE_SECONDS
}