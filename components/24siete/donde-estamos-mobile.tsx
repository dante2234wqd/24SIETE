"use client"

import MobileNavBar, { MOBILE_NAV_BAR_HEIGHT } from "./mobile-nav-bar"
import type { NavBarItem } from "./nav-bar"
import { LETTER_FLICKER, LOS_24_HORAS } from "./donde-estamos"

// ─────────────────────────────────────────────────
//  24SIETE — Mobile ¿Dónde estamos?
//  Versión responsive de la sección de escritorio
//  ("Próximamente · En todos Los 24 horas"): mismo
//  cartel de neón por letra, misma barra de carga y
//  mismas estrellas, con tamaños en vw para que el
//  cartel entre en cualquier ancho de pantalla.
//  Fondo: el mismo que la home mobile.
// ─────────────────────────────────────────────────

const DONDE_ESTAMOS_MOBILE_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "#" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

const CUBANO = "var(--font-cubano), 'Impact', 'Arial Black', sans-serif"

// misma animación de entrada escalonada que el stage de escritorio
let enterDelay = 0
function enter(variant: "slide" | "fade" = "slide", step = 0.055): React.CSSProperties {
  const delay = enterDelay
  enterDelay += step
  const name = variant === "slide" ? "stage-slide-in" : "stage-fade-in"
  return { animation: `${name} 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay.toFixed(2)}s backwards` }
}

export default function DondeEstamosMobile() {
  enterDelay = 0

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        backgroundColor: "#110f10",
        backgroundImage: "url(/assets/textura_puntos_mobile.png), url(/assets/fondo_mobile.png)",
        backgroundSize: "100% auto, cover",
        backgroundPosition: "top center, top center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundAttachment: "scroll, fixed",
        overflowX: "clip",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MobileNavBar items={DONDE_ESTAMOS_MOBILE_NAV_ITEMS} activeKey="donde-estamos" ctaHref="/activate" />

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${MOBILE_NAV_BAR_HEIGHT + 24}px 16px 48px`,
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            minWidth: 0,
            maxWidth: 480,
          }}
        >
          <img
            src="/assets/ESTRELLA_BLANCA_V2.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{
              ...enter("fade"),
              position: "absolute",
              left: "2%",
              top: "min(11vw, 50px)",
              width: "min(15vw, 68px)",
              height: "auto",
              transform: "rotate(-12deg)",
            }}
          />

          <span
            style={{
              ...enter(),
              fontFamily: "var(--font-sora), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1rem, 5.6vw, 1.9rem)",
              letterSpacing: "-0.02em",
              color: "#fff",
            }}
          >
            Próximamente
          </span>

          {/* relleno blanco sólido, sin efecto de neón */}
          <div style={{ ...enter("fade") }}>
            <h2
              style={{
                fontFamily: CUBANO,
                fontWeight: 900,
                fontSize: "min(9.4vw, 4.4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "#fff",
                textTransform: "uppercase",
                margin: "min(4vw, 24px) 0 0",
                textAlign: "center",
              }}
            >
              En todos
            </h2>
          </div>

          {/* la entrada va en este wrapper; el glow del tubo en el h2 (className);
              el parpadeo va letra por letra con su propio ritmo */}
          <div style={{ ...enter("fade") }}>
            <h2
              className="neon-24horas"
              style={{
                fontFamily: CUBANO,
                fontWeight: 900,
                fontSize: "min(13.4vw, 6.4rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "transparent",
                WebkitTextStroke: "max(1.5px, 0.0227em) #39ff14",
                textTransform: "uppercase",
                margin: "min(2.6vw, 16px) 0 0",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {LOS_24_HORAS.split("").map((char, i) => {
                const cfg = LETTER_FLICKER[i]
                if (!cfg) return <span key={i}>{" "}</span>
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

          {/* barra de carga 80% */}
          <div
            style={{
              ...enter(),
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "min(3vw, 14px)",
              width: "86%",
              marginTop: "min(12vw, 56px)",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "clamp(10px, 2.4vw, 14px)",
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
                fontSize: "clamp(0.95rem, 4.4vw, 1.3rem)",
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
                right: "-4%",
                bottom: "min(-13vw, -56px)",
                width: "min(15vw, 68px)",
                height: "auto",
                transform: "rotate(14deg)",
              }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
