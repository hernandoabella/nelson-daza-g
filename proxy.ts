import { NextResponse } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

const locales = ["es", "en", "ru"]
const defaultLocale = "es"

function getLocale(request: Request): string {
  const headers = { "accept-language": request.headers.get("accept-language") || "" }
  const languages = new Negotiator({ headers }).languages()
  return match(languages, locales, defaultLocale)
}

export function proxy(request: Request) {
  const { pathname } = new URL(request.url)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return
  const locale = getLocale(request)
  const url = new URL(request.url)
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|.*\\.(?:png|jpg|jpeg|svg|webp|mp4|webm|mov|avi|ogg|ogv)$).*)"],
}
