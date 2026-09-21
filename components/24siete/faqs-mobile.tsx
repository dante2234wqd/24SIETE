"use client"

import MobileNavBar from "./mobile-nav-bar"
import type { NavBarItem } from "./nav-bar"
import FaqSection from "./faq-section"
import FaqTitleEmojis from "./faq-title-emojis"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// ─────────────────────────────────────────────────
//  24SIETE — Mobile FAQS
//  Layout de flujo normal (no stage escalado), pensado
//  para pantallas angostas. Reutiliza el mismo título,
//  preguntas e imágenes de respuesta que la versión de
//  escritorio.
// ─────────────────────────────────────────────────

const BRUSH_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brush_blanco_donde%20estamos-yZAFCxUsKMT38Rwe1RoDyS835o3dTd.png"

const FAQS_MOBILE_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "#" },
]

export default function FaqsMobile() {
  const enter = useScrollReveal()

  const titleReveal = enter("fade")
  const listReveal = enter()

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#110f10",
        backgroundImage: "url(/assets/textura_puntos_mobile.png), url(/assets/fondo_mobile.png)",
        backgroundSize: "100% auto, cover",
        backgroundPosition: "top center, top center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundAttachment: "scroll, fixed",
        overflowX: "hidden",
      }}
    >
      <MobileNavBar items={FAQS_MOBILE_NAV_ITEMS} activeKey="faqs" ctaHref="/activate" />

      <main
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "28px 20px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* ── TITULO ─────────────────────────────── */}
        <div style={{ position: "relative", paddingBottom: 36 }}>
          <div
            ref={titleReveal.ref}
            style={{ ...titleReveal.style, position: "relative", width: "calc(100% + 40px)", marginLeft: -20, aspectRatio: "560 / 150" }}
          >
            <img
              src={BRUSH_URL}
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
                transform: "rotate(-1.2deg)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "15%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', 'Oswald', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.5rem, 7.5vw, 2rem)",
                  lineHeight: "98%",
                  letterSpacing: "-0.02em",
                  color: "#110f10",
                  textTransform: "uppercase",
                }}
              >
                PREGUNTAS QUE SE
                <br />
                HACEN A LAS 3 AM
              </span>
            </div>
            <FaqTitleEmojis size={22} layout="mobile" />
          </div>

        </div>

        {/* ── PREGUNTAS + RESPUESTA (card que entra desde la derecha) ── */}
        <div ref={listReveal.ref} style={listReveal.style}>
          <FaqSection variant="auto" />
        </div>
      </main>
    </div>
  )
}
