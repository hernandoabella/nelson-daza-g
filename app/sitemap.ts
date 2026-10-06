import type { MetadataRoute } from "next"
import { getPosts } from "@/lib/blog"

const BASE = "https://dazaimmigration.com"
const LANGS = ["es", "en", "ru"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  for (const lang of LANGS) {
    entries.push({ url: `${BASE}/${lang}`, changeFrequency: "weekly", priority: 1 })
    entries.push({ url: `${BASE}/${lang}/blog`, changeFrequency: "weekly", priority: 0.8 })
    for (const post of getPosts(lang)) {
      entries.push({ url: `${BASE}/${lang}/blog/${post.slug}`, changeFrequency: "monthly", priority: 0.6 })
    }
  }
  return entries
}
