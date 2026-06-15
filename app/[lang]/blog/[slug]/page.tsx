import { getDictionary, hasLocale, locales } from "../../dictionaries"
import { getPosts } from "@/lib/blog"
import { FaArrowLeft, FaBalanceScale, FaLightbulb, FaExclamationTriangle, FaCalendarAlt, FaClock } from "react-icons/fa"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BlogShell } from "../../components/BlogShell"

export async function generateStaticParams() {
  const slugs: { lang: string; slug: string }[] = []
  for (const lang of locales) {
    const posts = getPosts(lang)
    for (const post of posts) {
      slugs.push({ lang, slug: post.slug })
    }
  }
  return slugs
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const locale = hasLocale(lang) ? lang : "es"
  const dict = await getDictionary(locale)
  const posts = getPosts(locale)
  const post = posts.find((p: any) => p.slug === slug)
  if (!post) notFound()

  return (
    <BlogShell dict={dict} lang={locale}>
      <article style={{ maxWidth: "740px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <Link
          href={`/${lang}/blog`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--gold)", textDecoration: "none",
            marginBottom: "24px", transition: "opacity 0.2s",
          }}
        >
          <FaArrowLeft style={{ fontSize: "0.5rem" }} />
          {locale === "en" ? "Back to blog" : locale === "ru" ? "Назад в блог" : "Volver al blog"}
        </Link>

        <header style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: "16px",
              fontFamily: "'DM Mono', monospace", fontSize: "0.55rem",
              letterSpacing: "0.12em", color: "var(--gray)",
              marginBottom: "12px",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <FaCalendarAlt style={{ fontSize: "0.5rem" }} /> {post.date}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <FaClock style={{ fontSize: "0.5rem" }} /> {post.readingTime}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
              fontWeight: 700, color: "var(--ink)",
              lineHeight: 1.25, margin: 0,
            }}
          >
            {post.title}
          </h1>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {post.sections.map((section: any, i: number) => {
            switch (section.type) {
              case "heading":
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.3rem", fontWeight: 700,
                      color: "var(--ink)",
                      margin: "24px 0 0", lineHeight: 1.3,
                    }}
                  >
                    {section.content}
                  </h2>
                )
              case "paragraph":
                return (
                  <p key={i} style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--ink3)", margin: 0 }}>
                    {section.content}
                  </p>
                )
              case "list":
                return (
                  <ul key={i} style={{ margin: "0", padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {section.items.map((item: string, j: number) => (
                      <li key={j} style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--ink3)" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              case "legal":
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 18px", background: "var(--bg2)", borderRadius: "8px", borderLeft: "3px solid var(--gold)" }}>
                    <FaBalanceScale style={{ color: "var(--gold)", fontSize: "0.9rem", marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontSize: "0.85rem", color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>{section.content}</p>
                  </div>
                )
              case "tip":
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 18px", background: "var(--bg2)", borderRadius: "8px", borderLeft: "3px solid #4CAF50" }}>
                    <FaLightbulb style={{ color: "#4CAF50", fontSize: "0.9rem", marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontSize: "0.85rem", color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>{section.content}</p>
                  </div>
                )
              case "warning":
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 18px", background: "#FFF3E0", borderRadius: "8px", borderLeft: "3px solid #FF9800" }}>
                    <FaExclamationTriangle style={{ color: "#FF9800", fontSize: "0.9rem", marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontSize: "0.85rem", color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>{section.content}</p>
                  </div>
                )
              default:
                return null
            }
          })}
        </div>

        <div style={{ marginTop: "48px", padding: "28px", textAlign: "center", background: "var(--bg2)", borderRadius: "10px", border: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 8px" }}>
            {locale === "en" ? "Need personalized advice?" : locale === "ru" ? "Нужна персональная консультация?" : "¿Necesitas asesoría personalizada?"}
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--ink3)", margin: "0 0 20px", lineHeight: 1.6 }}>
            {locale === "en" ? "Book a strategic consultation with Nelson Daza." : locale === "ru" ? "Запишитесь на стратегическую консультацию с Нельсоном Дазой." : "Agenda una consulta estratégica con Nelson Daza."}
          </p>
          <Link href={`/${lang}#contact`} className="btn-primary" style={{ display: "inline-block", padding: "14px 32px", fontSize: "0.68rem", letterSpacing: "0.14em", textDecoration: "none", textTransform: "uppercase", border: "none" }}>
            {dict.nav.cta}
          </Link>
        </div>
      </article>
    </BlogShell>
  )
}
