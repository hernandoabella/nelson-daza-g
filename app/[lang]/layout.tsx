import type { Metadata } from "next"
import { hasLocale, getDictionary, type Locale } from "./dictionaries"

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let { lang } = await params
  if (!hasLocale(lang)) lang = "es"
  const dict = await getDictionary(lang as Locale)
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  }
}

export default async function LocaleLayout({ children }: Props) {
  return <>{children}</>
}
