"use client"

import { useEffect, useMemo, useState } from "react"
import { type NavBarItem } from "./nav-bar"
import FaqSection from "./faq-section"
import FaqTitleEmojis from "./faq-title-emojis"
import DesktopLogo from "./desktop-logo"
import DesktopBottomNav from "./desktop-bottom-nav"

// ─────────────────────────────────────────────────
//  24SIETE — FAQS
//  Stage fijo 1920×1080, escalado para entrar siempre
//  en pantalla sin necesidad de scroll.
// ─────────────────────────────────────────────────

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

const FAQS_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

export default function Faqs() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)

    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const scale = useMemo(() => {
    if (!viewport.width || !viewport.height) return 1
    return Math.min(viewport.width / STAGE_WIDTH, viewport.height / STAGE_HEIGHT)
  }, [viewport])

  let enterDelay = 0
  const enter = (
    variant: "slide" | "fade" = "slide",
    opts?: { step?: number; toOpacity?: number },
  ): React.CSSProperties => {
    const step = opts?.step ?? 0.055
    const delay = enterDelay
    enterDelay += step
    const name = variant === "slide" ? "stage-slide-in" : "stage-fade-in"
    return {
      animation: `${name} 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay.toFixed(2)}s backwards`,
      ["--enter-to-opacity" as unknown as string]: opts?.toOpacity ?? 1,
    } as React.CSSProperties
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#110f10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Fondo general (mismo que la home) */}
      <img
        src="/assets/fondo_nuevo.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          ...enter("fade"),
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Fondo pincelada blanca detrás de la barra de navegación: fuera del stage escalado para poder ocupar el 100% del ancho real del viewport */}
      <img
        src="/assets/fondo%20menu%20navegacionv3.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          ...enter("fade"),
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: `${(283 / STAGE_HEIGHT) * 100}%`,
          pointerEvents: "none",
        }}
      />

      <DesktopLogo />
      <DesktopBottomNav items={FAQS_NAV_ITEMS} activeKey="faqs" ctaHref="/activate" />

      <div
        style={{
          position: "relative",
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          flexShrink: 0,
          transform: `scale(${scale})`,
          color: "#fff",
        }}
      >
        {/* Título (más separado del logo, que ahora va fijo en la esquina) */}
        <div style={{ position: "absolute", left: 280, top: 130, display: "flex", alignItems: "center", gap: 28, zIndex: 4 }}>
          {/* título: texto blanco (sin pincelada), mismo tamaño que HABLANOS, con emojis siempre visibles */}
          <span
            style={{
              ...enter(),
              position: "relative",
              display: "inline-block",
              fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 64,
              letterSpacing: "0.01em",
              lineHeight: "90%",
              color: "#ffffff",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            PREGUNTAS QUE SE
            <br />
            HACEN A LAS 3 AM
            <FaqTitleEmojis size={34} />
          </span>
        </div>

        {/* Preguntas + card de respuesta (entra desde la derecha) — ver faq-section.tsx */}
        <div style={{ ...enter(), position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none" }}>
          <FaqSection variant="stage" />
        </div>

      </div>
    </div>
  )
}
