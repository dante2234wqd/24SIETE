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
          padding: "128px 20px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* ── TITULO: texto blanco (sin pincelada), mismo tamaño que HABLANOS, con emojis siempre visibles ── */}
        <div ref={titleReveal.ref} style={{ ...titleReveal.style, display: "flex", alignItems: "center" }}>
          <span
            style={{
              position: "relative",
              display: "inline-block",
              fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.7rem, 9.6vw, 2.9rem)",
              letterSpacing: "0.01em",
              lineHeight: "90%",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            {/* whiteSpace: nowrap por línea: sin esto el navegador puede volver a
                partir una línea a la mitad (p.ej. "QUE" solo) si no entra en el ancho */}
            <span style={{ display: "block", whiteSpace: "nowrap" }}>PREGUNTAS QUE SE</span>
            <span style={{ display: "block", whiteSpace: "nowrap" }}>HACEN A LAS 3 AM</span>
            <FaqTitleEmojis size={24} />
          </span>
        </div>

        {/* ── PREGUNTAS + RESPUESTA (card que entra desde la derecha) ── */}
        <div ref={listReveal.ref} style={listReveal.style}>
          <FaqSection variant="auto" />
        </div>
      </main>
    </div>
  )
}
