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
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `https://dazaimmigration.com/${lang}`,
      languages: { es: "/es", en: "/en", ru: "/ru" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://dazaimmigration.com/${lang}`,
      siteName: "Nelson Daza — Immigration Attorney",
      locale: lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "es_CO",
      type: "website",
    },
  }
}

export default async function LocaleLayout({ children }: Props) {
  return <>{children}</>
}
