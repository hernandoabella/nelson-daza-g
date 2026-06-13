import "server-only"

const dictionaries = {
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
}

export type Locale = keyof typeof dictionaries

export const locales = ["es", "en", "ru"] as const

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
