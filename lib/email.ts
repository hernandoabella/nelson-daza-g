import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function sendNotification({
  subject,
  html,
}: {
  subject: string
  html: string
}) {
  const to = process.env.NOTIFICATION_EMAIL || "nelsondg7@gmail.com"

  if (resend) {
    await resend.emails.send({
      from: "Nelson Daza Web <onboarding@resend.dev>",
      to,
      subject,
      html,
    })
  }

  console.log(`[EMAIL] To: ${to} | Subject: ${subject}`)
  console.log(`[EMAIL] Body:\n${html.replace(/<[^>]*>/g, "")}`)
}
