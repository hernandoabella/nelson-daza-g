"use client"

import { useState } from "react"
import { BlogNav } from "./BlogNav"
import { Footer } from "./Footer"
import { BookingFlow } from "./BookingFlow"

export function BlogShell({
  dict, lang, children,
}: {
  dict: Record<string, any>
  lang: string
  children: React.ReactNode
}) {
  const [isBookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <BlogNav dict={dict} lang={lang} />
      {children}
      <Footer dict={dict} lang={lang} onBook={() => setBookingOpen(true)} />
      {isBookingOpen && <BookingFlow key="booking" dict={dict} lang={lang} onClose={() => setBookingOpen(false)} />}
    </>
  )
}
