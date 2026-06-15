import { posts as es } from "./es"
import { posts as en } from "./en"
import { posts as ru } from "./ru"

const allPosts = { es, en, ru } as const

export function getPosts(lang: "es" | "en" | "ru") {
  return allPosts[lang]
}

export function getPost(lang: "es" | "en" | "ru", slug: string) {
  return allPosts[lang].find(post => post.slug === slug)
}
