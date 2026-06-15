import { getDictionary, hasLocale, locales } from "../dictionaries"
import { getPosts } from "@/lib/blog"
import { FaCalendarAlt, FaClock, FaArrowRight, FaTag } from "react-icons/fa"
import Link from "next/link"
import { BlogShell } from "../components/BlogShell"

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = hasLocale(lang) ? lang : "es"
  const dict = await getDictionary(locale)
  const posts = getPosts(locale)

  return (
    <BlogShell dict={dict} lang={locale}>
      {/* Blog hero banner */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--bg2) 0%, var(--bg) 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "60px 24px 48px",
          textAlign: "center",
        }}
      >
        <Link
          href={`/${lang}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--gold)", textDecoration: "none",
            marginBottom: "16px", transition: "opacity 0.2s",
          }}
        >
          <FaArrowRight style={{ transform: "rotate(180deg)", fontSize: "0.5rem" }} />
          {locale === "en" ? "Home" : locale === "ru" ? "Главная" : "Inicio"}
        </Link>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            fontWeight: 800, color: "var(--ink)",
            margin: "0 0 12px", lineHeight: 1.15,
          }}
        >
          {dict.blogPage.title}
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--ink3)", lineHeight: 1.7, margin: "0 auto", maxWidth: "580px" }}>
          {dict.blogPage.description}
        </p>
      </section>

      <div style={{ maxWidth: "880px", margin: "0 auto", padding: "48px 24px 80px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {posts.map((post: any, i: number) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div className="blog-card">
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    fontFamily: "'DM Mono', monospace", fontSize: "0.55rem",
                    letterSpacing: "0.12em", color: "var(--gray)",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <FaCalendarAlt style={{ fontSize: "0.5rem" }} /> {post.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <FaClock style={{ fontSize: "0.5rem" }} /> {post.readingTime}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.25rem", fontWeight: 700,
                    color: "var(--ink)", margin: "0 0 8px",
                    lineHeight: 1.3,
                  }}
                >
                  {post.title}
                </h2>

                <p
                  style={{
                    fontSize: "0.92rem", lineHeight: 1.7,
                    color: "var(--ink3)", margin: "0 0 14px",
                  }}
                >
                  {post.description}
                </p>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {post.keywords.split(",").slice(0, 3).map((kw: string, j: number) => (
                    <span
                      key={j}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
                        letterSpacing: "0.08em", color: "var(--gold)",
                        background: "rgba(166,121,79,0.08)",
                        padding: "4px 10px", borderRadius: "4px",
                      }}
                    >
                      <FaTag style={{ fontSize: "0.4rem" }} />
                      {kw.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BlogShell>
  )
}
