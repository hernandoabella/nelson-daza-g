import { hasLocale, getDictionary, type Locale } from "./dictionaries"
import { PageContent } from "./components/PageContent"

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }, { lang: "ru" }]
}

export default async function Home({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) {
    const { notFound } = await import("next/navigation")
    notFound()
  }
  const dict = await getDictionary(lang as Locale)
  return <PageContent dict={dict} lang={lang} />
}
