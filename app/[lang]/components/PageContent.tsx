"use client"

import { useEffect, useState } from "react"
import { Nav } from "./Nav"
import { HeroSection } from "./HeroSection"
import { ImageBanner } from "./ImageBanner"
import { AboutSection } from "./AboutSection"
import { ServicesSection } from "./ServicesSection"
import { PricingSection } from "./PricingSection"
import { CompSection } from "./CompSection"
import { ProcessSection } from "./ProcessSection"
import { ContactSection } from "./ContactSection"
import { Disclaimer } from "./Disclaimer"
import { Footer } from "./Footer"
import { BookingFlow } from "./BookingFlow"

export function PageContent({ dict, lang }: { dict: Record<string, any>; lang: string }) {
  const [isBookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const cursor = document.getElementById("cursor")
    const ring = document.getElementById("cursorRing")
    if (!cursor || !ring) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; cursor.style.left = (mx - 4) + "px"; cursor.style.top = (my - 4) + "px" }
    document.addEventListener("mousemove", onMove)
    let raf: number
    const animate = () => {
      rx += (mx - rx - 18) * 0.12
      ry += (my - ry - 18) * 0.12
      ring.style.left = rx + "px"
      ring.style.top = ry + "px"
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const nav = document.getElementById("navbar")
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 60)
    window.addEventListener("scroll", onScroll)

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 65)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el))

    const bannerObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in-view"); bannerObs.unobserve(e.target) }
        })
      },
      { threshold: 0.25 }
    )
    document.querySelectorAll(".img-banner").forEach((el) => bannerObs.observe(el))

    return () => {
      document.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      obs.disconnect()
      bannerObs.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
      <Nav dict={dict} lang={lang} onBook={() => setBookingOpen(true)} />
      <HeroSection dict={dict} />
      <AboutSection dict={dict} lang={lang} />
      <ImageBanner
        imgSrc="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=80&auto=format&fit=crop"
        icon="⚖️"
        label={dict.banner1.label}
        title={dict.banner1.title}
        sub={dict.banner1.sub}
        stats={[
          { num: dict.banner1.stat1Num, label: dict.banner1.stat1Label },
          { num: dict.banner1.stat2Num, label: dict.banner1.stat2Label },
          { num: dict.banner1.stat3Num, label: dict.banner1.stat3Label },
        ]}
      />
      <ServicesSection dict={dict} lang={lang} />
      <ImageBanner
        imgSrc="https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?w=1800&q=80&auto=format&fit=crop"
        icon="🛂"
        label={dict.banner2.label}
        title={dict.banner2.title}
        cta={{ text: dict.banner2.cta, href: "#pricing" }}
        height={360}
      />
      <PricingSection dict={dict} lang={lang} onBook={() => setBookingOpen(true)} />
      <CompSection dict={dict} lang={lang} />
      <ProcessSection dict={dict} lang={lang} />
      <ImageBanner
        imgSrc="https://images.unsplash.com/photo-1593115057322-e94b77572f20?w=1800&q=80&auto=format&fit=crop"
        icon="🌎"
        label={dict.banner3.label}
        title={dict.banner3.title}
        sub={dict.banner3.sub}
        cta={{ text: dict.banner3.cta, href: "#contact" }}
        height={420}
      />
      <ContactSection dict={dict} lang={lang} onBook={() => setBookingOpen(true)} />
      <Disclaimer text={dict.disclaimer} />
      <Footer dict={dict} lang={lang} onBook={() => setBookingOpen(true)} />

      {isBookingOpen && <BookingFlow key="booking" dict={dict} lang={lang} onClose={() => setBookingOpen(false)} />}
    </>
  )
}
