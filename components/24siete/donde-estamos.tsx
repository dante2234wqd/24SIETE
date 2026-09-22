"use client"

import { useEffect, useMemo, useState } from "react"
import { type NavBarItem } from "./nav-bar"
import DesktopLogo from "./desktop-logo"
import DesktopBottomNav from "./desktop-bottom-nav"

// ─────────────────────────────────────────────────
//  24SIETE — ¿Dónde estamos?
//  Stage fijo 1920×1080, escalado para entrar siempre
//  en pantalla sin necesidad de scroll.
// ─────────────────────────────────────────────────

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

const DONDE_ESTAMOS_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

// "Los 24 horas" letra por letra: cada una parpadea con su propio ritmo
// (variante + delay + duración), para que el cartel se sienta vivo en vez
// de titilar todo junto. "dropout" = la letra se apaga y vuelve, cada
// tanto — el resto nunca lo hace, para que sea un detalle raro, no la regla.
export const LOS_24_HORAS = "Los 24 horas"
export const LETTER_FLICKER: ({ variant: "calm" | "twitchy" | "dropout"; delay: number; duration: number } | null)[] = [
  { variant: "calm", delay: 0, duration: 11 }, // L
  { variant: "twitchy", delay: 1.4, duration: 3.6 }, // o
  { variant: "calm", delay: 3.2, duration: 13 }, // s
  null, // " "
  { variant: "dropout", delay: 2.1, duration: 17 }, // 2
  { variant: "calm", delay: 5.5, duration: 10 }, // 4
  null, // " "
  { variant: "twitchy", delay: 0.6, duration: 4.2 }, // h
  { variant: "calm", delay: 4.4, duration: 12 }, // o
  { variant: "twitchy", delay: 2.8, duration: 3.9 }, // r
  { variant: "dropout", delay: 6.7, duration: 19 }, // a
  { variant: "calm", delay: 1.9, duration: 11.5 }, // s
]

export default function DondeEstamos() {
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
        src="/assets/fondo%20menu%20navegacionv3_v3.png"
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
      <DesktopBottomNav items={DONDE_ESTAMOS_NAV_ITEMS} activeKey="donde-estamos" ctaHref="/activate" />

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
        {/* ── PRÓXIMAMENTE: EN TODOS LOS 24 HORAS ─────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 4,
          }}
        >
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src="/assets/ESTRELLA_BLANCA_V2.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                ...enter("fade"),
                position: "absolute",
                left: -190,
                top: 46,
                width: 84,
                height: "auto",
                transform: "rotate(-12deg)",
              }}
            />

            <span
              style={{
                ...enter(),
                fontFamily: "var(--font-sora), sans-serif",
                fontWeight: 500,
                fontSize: 42,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
            >
              Próximamente
            </span>

            {/* relleno blanco sólido, sin ningún efecto de neón */}
            <div style={{ ...enter("fade") }}>
              <h2
                style={{
                  fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                  fontWeight: 900,
                  fontSize: 92,
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  textTransform: "uppercase",
                  margin: "26px 0 0",
                  textAlign: "center",
                }}
              >
                En todos
              </h2>
            </div>

            {/* la entrada (una sola vez) va en este wrapper; el glow del
                tubo va en el h2 (className, estático); el parpadeo va
                letra por letra, cada una con su propio ritmo */}
            <div style={{ ...enter("fade") }}>
              <h2
                className="neon-24horas"
                style={{
                  fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                  fontWeight: 900,
                  fontSize: 132,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "transparent",
                  WebkitTextStroke: "3px #39ff14",
                  textTransform: "uppercase",
                  margin: "20px 0 0",
                  textAlign: "center",
                }}
              >
                {LOS_24_HORAS.split("").map((char, i) => {
                  const cfg = LETTER_FLICKER[i]
                  if (!cfg) return <span key={i}>{" "}</span>
                  return (
                    <span
                      key={i}
                      className={`neon-letter neon-letter-${cfg.variant}`}
                      data-text={char}
                      style={{ animationDuration: `${cfg.duration}s`, animationDelay: `${cfg.delay}s` }}
                    >
                      {char}
                    </span>
                  )
                })}
              </h2>
            </div>

            <div
              style={{
                ...enter(),
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginTop: 64,
              }}
            >
              <div
                style={{
                  width: 720,
                  height: 16,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  overflow: "hidden",
                }}
              >
                <div className="proximamente-progress-fill" style={{ height: "100%", borderRadius: 999, background: "#39ff14" }} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-sora), sans-serif",
                  fontWeight: 700,
                  fontSize: 26,
                  color: "#fff",
                }}
              >
                80%
              </span>

              <img
                src="/assets/ESTRELLA_VERDE_V2.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  right: -170,
                  bottom: -80,
                  width: 96,
                  height: "auto",
                  transform: "rotate(14deg)",
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
