"use client"

import { useEffect, useMemo, useState } from "react"
import NavBar, { type NavBarItem } from "./nav-bar"

// ─────────────────────────────────────────────────
//  24SIETE — ¿Dónde estamos?
//  Stage fijo 1920×1080, escalado para entrar siempre
//  en pantalla sin necesidad de scroll.
// ─────────────────────────────────────────────────

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

const BACKGROUND_URL = "/assets/fondo%20donde%20estamos.png"
const LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_24SIETE-763F9MXWDBGbgG9D9rB5eXlsyu8VUo.svg"
const BRUSH_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brush_blanco_donde%20estamos-yZAFCxUsKMT38Rwe1RoDyS835o3dTd.png"
const PIN_ICON_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Icono_Ubicacion-BrZW3HwXymcG5cS8uWR0qVAEQWULBU.png"

const DONDE_ESTAMOS_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

const NEIGHBORHOODS: { name: string; address: string; labelSrc: string; labelW: number; labelH: number }[] = [
  { name: "Palermo", address: "Santa Fe 4300", labelSrc: "/assets/Group%208.png", labelW: 120, labelH: 42 },
  { name: "Soho", address: "Gurruchaga 1700", labelSrc: "/assets/Group%206.png", labelW: 119, labelH: 41 },
  { name: "Recoleta", address: "Callao 1200", labelSrc: "/assets/Group%207.png", labelW: 119, labelH: 41 },
  { name: "Microcentro", address: "Corrientes 900", labelSrc: "/assets/Group%2011.png", labelW: 120, labelH: 42 },
  { name: "Belgrano", address: "Cabildo 2200", labelSrc: "/assets/Group%209.png", labelW: 119, labelH: 41 },
  { name: "Caballito", address: "Rivadavia 5200", labelSrc: "/assets/Group%2010.png", labelW: 119, labelH: 41 },
  { name: "Villa Crespo", address: "Corrientes 4800", labelSrc: "/assets/Group%2014.png", labelW: 120, labelH: 42 },
  { name: "Chacarita", address: "Federico Lacroze 3900", labelSrc: "/assets/Group%2012.png", labelW: 119, labelH: 41 },
  { name: "Nuñez", address: "Cabildo 3500", labelSrc: "/assets/Group%2013.png", labelW: 127, labelH: 41 },
]

// cluster de pines decorativo sobre la zona de CABA en el mapa (posiciones relativas en %)
const MAP_PIN_CLUSTER = [
  { x: 46, y: 32 }, { x: 53, y: 28 }, { x: 60, y: 31 }, { x: 66, y: 27 },
  { x: 49, y: 38 }, { x: 56, y: 36 }, { x: 63, y: 38 }, { x: 69, y: 34 },
  { x: 44, y: 44 }, { x: 51, y: 44 }, { x: 58, y: 45 }, { x: 65, y: 43 },
  { x: 71, y: 41 }, { x: 47, y: 51 }, { x: 55, y: 52 }, { x: 62, y: 50 },
  { x: 68, y: 49 }, { x: 53, y: 58 },
]

function AddressLink({
  name,
  address,
  labelSrc,
  labelW,
  labelH,
}: {
  name: string
  address: string
  labelSrc: string
  labelW: number
  labelH: number
}) {
  const query = encodeURIComponent(`${address}, ${name}, Buenos Aires, Argentina`)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
  const displayWidth = 118
  const displayHeight = Math.round((displayWidth * labelH) / labelW)

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <span
        className="pointer-events-none absolute -top-9 left-0 z-10 whitespace-nowrap rounded-md border-2 border-black px-3 py-1 text-[11px] font-bold uppercase text-black opacity-0 shadow-[2px_2px_0px_#000] transition-opacity duration-150 group-hover:opacity-100"
        style={{
          background: "#39ff14",
          fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
        }}
      >
        Ir a Google Maps →
      </span>

      <img
        src={labelSrc}
        alt={name}
        draggable={false}
        width={displayWidth}
        height={displayHeight}
        style={{
          width: displayWidth,
          height: displayHeight,
          aspectRatio: `${labelW} / ${labelH}`,
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#fff",
        }}
      >
        {address}
      </span>
    </a>
  )
}

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
        backgroundColor: "#0a0a0a",
        backgroundImage: `url(${BACKGROUND_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
        {/* Contenido principal: logo + título, mapa + direcciones */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            padding: "32px 40px",
            zIndex: 4,
            transform: "scale(1.3)",
            transformOrigin: "top left",
          }}
        >
          <div style={{ maxWidth: 1230, marginLeft: 114, marginRight: 0 }}>
            {/* Logo + título */}
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <img
                src={LOGO_URL}
                alt="24SIETE logo"
                style={{ ...enter(), width: 72, height: 74, flexShrink: 0 }}
              />

              <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
                <img
                  src={BRUSH_URL}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  style={{
                    ...enter("fade"),
                    width: "100%",
                    height: "auto",
                    display: "block",
                    transform: "rotate(1.5deg)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    ...enter(),
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    paddingLeft: "6%",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', 'Oswald', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(22px, 2.6vw, 38px)",
                      letterSpacing: "-0.03em",
                      color: "#101010",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                    }}
                  >
                    ¿DONDE ESTAMOS?
                  </span>
                  <img
                    src={PIN_ICON_URL}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: "10%",
                      minWidth: 28,
                      height: "auto",
                      filter: "drop-shadow(0 4px 10px rgba(0,255,0,0.3))",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Mapa + direcciones */}
            <div
              style={{
                marginTop: 56,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 56,
              }}
            >
              <div style={{ ...enter("fade"), position: "relative", width: "100%", maxWidth: 460, flexShrink: 0 }}>
                <img
                  src="/assets/Mapa_buenos_aires.png"
                  alt="Mapa de la provincia de Buenos Aires"
                  draggable={false}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                {MAP_PIN_CLUSTER.map((p, i) => (
                  <img
                    key={i}
                    src={LOGO_URL}
                    alt=""
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: "6.5%",
                      height: "auto",
                      transform: "translate(-50%, -50%)",
                      filter: "drop-shadow(0 0 4px rgba(57,255,20,0.5))",
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  ...enter(),
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(120px, 1fr))",
                  columnGap: 0,
                  rowGap: 36,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {NEIGHBORHOODS.map((n, i) => (
                  <div
                    key={n.name}
                    style={{
                      borderLeft: i % 3 === 0 ? "none" : "3px solid #39ff14",
                      paddingLeft: i % 3 === 0 ? 0 : 32,
                      paddingRight: 16,
                    }}
                  >
                    <AddressLink {...n} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA text */}
        <div
          style={{
            ...enter(),
            position: "absolute",
            left: 870,
            top: 790,
            width: 460,
            height: 150,
            transform: "rotate(0deg)",
            zIndex: 6,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-grold-rounded), sans-serif",
              fontWeight: 700,
              fontSize: 33,
              lineHeight: "112%",
              color: "#fff",
              margin: 0,
            }}
          >
            CUANDO TE PINTE...
            <br />
            SIEMPRE HAY UN <span style={{ color: "#39ff14" }}>24SIETE</span> CERCA.
          </p>
        </div>

        {/* Bottom nav */}
        <div style={{ ...enter(), position: "absolute", left: 200, top: 986, zIndex: 7 }}>
          <NavBar
            items={DONDE_ESTAMOS_NAV_ITEMS}
            activeKey="donde-estamos"
            ctaHref="/activate"
            scale={1080 / 873}
          />
        </div>
      </div>
    </div>
  )
}
