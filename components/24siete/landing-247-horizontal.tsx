"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import NavBar, { type NavBarItem, type NavKey } from "./nav-bar"
import LogoMusicButton from "./logo-music-button"

// ─────────────────────────────────────────────────
//  24SIETE — Horizontal Editorial Landing Stage
//  Stage base: 3359px × 873px
//  Escalado por altura para experiencia inmersiva
// ─────────────────────────────────────────────────

const STAGE_WIDTH = 3359
const STAGE_HEIGHT = 873

const LANDING_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "#" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

// puntos de corte (en unidades del stage) que definen cuándo cada sección
// pasa a considerarse la "actual" mientras se scrollea horizontalmente
const NAV_SECTION_THRESHOLDS: { key: NavKey; x: number }[] = [
  { key: "yo-soy-24siete", x: 0 },
  { key: "donde-estamos", x: 900 },
  { key: "faqs", x: 2200 },
]

function useDraggableSticker(scale: number) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      setOffset({
        x: drag.originX + (e.clientX - drag.startX) / scale,
        y: drag.originY + (e.clientY - drag.startY) / scale,
      })
    }

    const onPointerUp = () => {
      dragRef.current = null
      setIsDragging(false)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [scale])

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault()
    ;(e.currentTarget as HTMLImageElement).setPointerCapture(e.pointerId)
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y,
    }
  }

  return { offset, isDragging, onPointerDown }
}

export default function Landing247Horizontal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [activeSection, setActiveSection] = useState<NavKey>("yo-soy-24siete")

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)

    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        container.scrollLeft += e.deltaY
      }
    }

    container.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      container.removeEventListener("wheel", onWheel)
    }
  }, [])

  const scale = useMemo(() => {
    if (!viewport.height) return 1

    const availableHeight = viewport.height
    const scaleByHeight = availableHeight / STAGE_HEIGHT

    return scaleByHeight
  }, [viewport])

  const scaledWidth = STAGE_WIDTH * scale
  const scaledHeight = STAGE_HEIGHT * scale

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onScroll = () => {
      const focalX = (container.scrollLeft + container.clientWidth / 2) / scale
      let current = NAV_SECTION_THRESHOLDS[0].key
      for (const { key, x } of NAV_SECTION_THRESHOLDS) {
        if (focalX >= x) current = key
      }
      setActiveSection(current)
    }

    onScroll()
    container.addEventListener("scroll", onScroll, { passive: true })

    return () => container.removeEventListener("scroll", onScroll)
  }, [scale])

  const modoSticker = useDraggableSticker(scale)
  const activeSticker = useDraggableSticker(scale)

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
      ref={containerRef}
      className="overflow-x-auto overflow-y-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0a0a0a",
      }}
    >
      <div
        style={{
          height: "100%",
          minWidth: scaledWidth,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            position: "relative",
            width: scaledWidth,
            height: scaledHeight,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: STAGE_WIDTH,
              height: STAGE_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {/* ── Stage ─────────────────────────────────── */}
            <div
              style={{
                position: "relative",
                width: 3359,
                height: 873,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {/* ── 1. BACKGROUND ─────────────────────────── */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-247-lsWd9A5wL0F1XD1CWWgCuRpyYbEpTv.png"
                alt=""
                aria-hidden="true"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 3359,
                  height: 873,
                  objectFit: "cover",
                  zIndex: 1,
                }}
              />

              {/* ── 2. LOGO TOP LEFT (también botón de música) ── */}
              <LogoMusicButton
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 56,
                  top: 34,
                  width: 81,
                  height: 83,
                  zIndex: 10,
                }}
              />

              {/* ── 3. MAIN HERO IMAGE LEFT (stacked alfajores) ── */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen_principal_inicio-ewY7pC9CfdrundPdqgGTzfbS0EVGQq.png"
                alt="Stack of 24SIETE alfajores"
                style={{
                  ...enter(),
                  position: "absolute",
                  left: -13,
                  top: 69,
                  width: 740,
                  height: 679,
                  objectFit: "contain",
                  objectPosition: "left center",
                  zIndex: 4,
                  transform: "scale(1)",
                  transition: "transform 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.transform = "scale(1)"
                }}
              />

              {/* ── STIKER_24SIETE (por encima de la torre de alfajores, arrastrable) ─── */}
              <img
                src="/assets/Stiker_24SIETE.png"
                alt="Sticker 24SIETE - ¿Estás active o estás mirando?"
                draggable={false}
                onPointerDown={activeSticker.onPointerDown}
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 450 + activeSticker.offset.x,
                  top: 34 + activeSticker.offset.y,
                  width: 230,
                  height: 258,
                  objectFit: "contain",
                  transform: `rotate(-10.43deg) scale(${activeSticker.isDragging ? 1.08 : 1})`,
                  transition: activeSticker.isDragging ? "none" : "transform 0.2s ease",
                  opacity: 1,
                  zIndex: activeSticker.isDragging ? 999 : 9,
                  cursor: activeSticker.isDragging ? "grabbing" : "grab",
                  touchAction: "none",
                  userSelect: "none",
                }}
              />

              {/* ── 4. FLOATING STICKER (movido junto a la foto de la chica) ─── */}
              <img
                src="/assets/ALFAJORES.webp"
                alt="ALFAJORES.webp"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 1700,
                  top: 58,
                  width: 520,
                  height: 820,
                  objectFit: "contain",
                  transform: "rotate(-16.9deg) scale(1)",
                  transition: "transform 0.25s ease",
                  cursor: "pointer",
                  zIndex: 8,
                  filter: "drop-shadow(4px 8px 16px rgba(0,0,0,0.6))",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.transform =
                    "rotate(-16.9deg) scale(1.06)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.transform =
                    "rotate(-16.9deg) scale(1)"
                }}
              />

              {/* ── 4B. MAPA ARGENTINA agregado al lado del paquete/pulseras ─── */}
              <img
                src="/assets/Mapa_argentina1.webp"
                alt="Mapa de Argentina"
                style={{
                  ...enter("slide", { toOpacity: 0.72 }),
                  position: "absolute",
                  left: 2145,
                  top: 70,
                  width: 600,
                  height: 700,
                  objectFit: "contain",
                  zIndex: 3,
                  opacity: 0.72,
                  filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.35))",
                }}
              />

              {/* ── HABLANOS (debajo del mapa de Argentina) ─────────── */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2173.34,
                  top: 659.83,
                  width: 606,
                  height: 149,
                  zIndex: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  cursor: "pointer",
                  transition: "opacity 0.18s ease, transform 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.opacity = "0.82"
                  ;(e.currentTarget as HTMLDivElement).style.transform =
                    "rotate(1deg) scale(1.015)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.opacity = "1"
                  ;(e.currentTarget as HTMLDivElement).style.transform =
                    "rotate(0deg) scale(1)"
                }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HABLANOS%201-ZwLdgrogKIGt37GTm3IKYkYnOrgNjq.png"
                  alt="Contact us icon"
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    flexShrink: 0,
                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.5))",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 100,
                    letterSpacing: "0.01em",
                    lineHeight: "90%",
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  HABLANOS
                </span>
              </div>

              {/* ── FOTO BARILOCHE CON FONDO BLANCO (arriba, al lado del mapa) ─── */}
              <img
                src="/assets/fondoblanco_fotobariloche.png"
                alt="Persona comiendo alfajor 24SIETE en Bariloche"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 2340,
                  top: -50,
                  width: 700,
                  height: 400.5,
                  objectFit: "contain",
                  transform: "rotate(-3deg)",
                  zIndex: 6,
                }}
              />

              {/* ── 5. WHITE BRUSH BEHIND TITLE ───────────── */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brush_blanco_donde%20estamos-yZAFCxUsKMT38Rwe1RoDyS835o3dTd.png"
                alt=""
                aria-hidden="true"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 662.27,
                  top: 114.53,
                  width: 990.49,
                  height: 207.43,
                  objectFit: "fill",
                  transform: "rotate(3.68deg)",
                  zIndex: 3,
                }}
              />

              {/* ── 6. MAIN TITLE "DONDE ESTAMOS?" ────────── */}
              <Link
                href="/donde-estamos"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 770,
                  top: 178.63,
                  width: 1000,
                  height: 98,
                  transform: "rotate(1.68deg)",
                  zIndex: 7,
                  display: "block",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "opacity 0.18s ease, transform 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = "0.82"
                  ;(e.currentTarget as HTMLAnchorElement).style.transform =
                    "rotate(2.68deg) scale(1.015)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = "1"
                  ;(e.currentTarget as HTMLAnchorElement).style.transform =
                    "rotate(1.68deg) scale(1)"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', 'Oswald', sans-serif",
                    fontWeight: 900,
                    fontSize: 109.39,
                    letterSpacing: "-0.03em",
                    lineHeight: "90%",
                    color: "#101010",
                    whiteSpace: "nowrap",
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  DONDE ESTAMOS?
                </span>
              </Link>

              {/* ── 7. LOCATION PIN ICON ──────────────────── */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Icono_Ubicacion-BrZW3HwXymcG5cS8uWR0qVAEQWULBU.png"
                alt="Location pin"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 1600.35,
                  top: 80.16,
                  width: 167.69,
                  height: 244.53,
                  objectFit: "contain",
                  transform: "rotate(2.46deg)",
                  zIndex: 8,
                  filter: "drop-shadow(0 4px 12px rgba(0,255,0,0.25))",
                }}
              />

              {/* ── 8. PHOTO CARD 1 — KIOSCO ─────────────── */}
              <div
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 710.6,
                  top: 324.63,
                  width: 283.8,
                  height: 364.89,
                  transform: "rotate(-2.36deg)",
                  zIndex: 5,
                  boxShadow: "6px 8px 24px rgba(0,0,0,0.55)",
                }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Alfajores_kiosco-stHZ8K5D5dJ8m1V6MYUHgONdilVRRd.png"
                  alt="24SIETE alfajores on a kiosk shelf"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* ── 9. PHOTO CARD 2 — MADRUGADA ──────────── */}
              <div
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 1011.34,
                  top: 335.81,
                  width: 283.8,
                  height: 364.89,
                  transform: "rotate(-0.53deg)",
                  zIndex: 5,
                  boxShadow: "6px 8px 24px rgba(0,0,0,0.55)",
                }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Madrugada-ElOYydir8rDVcatl0RpEvLQqjlzhb7.png"
                  alt="Person eating 24SIETE alfajor at night"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* ── 10. PHOTO CARD 3 — PARCIAL ───────────── */}
              <div
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 1314.07,
                  top: 338.23,
                  width: 283.66,
                  height: 363.4,
                  transform: "rotate(3.70deg)",
                  zIndex: 5,
                  boxShadow: "6px 8px 24px rgba(0,0,0,0.55)",
                }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chica_parcial-f0uRu4oysFTGMeuu2N0cvZgMnQRiqG.png"
                  alt="Student studying eating a 24SIETE alfajor"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* ── STICKER #MODO24SIETE (arrastrable) ─────────────── */}
              <img
                src="/assets/Stiker_modo24siete.png"
                alt="#MODO24SIETE sticker"
                draggable={false}
                onPointerDown={modoSticker.onPointerDown}
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 1480 + modoSticker.offset.x,
                  top: 660 + modoSticker.offset.y,
                  width: "390.3px",
                  height: "172.03px",
                  transform: `rotate(-10.27deg) scale(${modoSticker.isDragging ? 1.08 : 1})`,
                  transition: modoSticker.isDragging ? "none" : "transform 0.2s ease",
                  zIndex: modoSticker.isDragging ? 999 : 8,
                  opacity: 1,
                  cursor: modoSticker.isDragging ? "grabbing" : "grab",
                  touchAction: "none",
                  userSelect: "none",
                }}
              />

              {/* ── 11. GREEN LABEL — KIOSCO ─────────────── */}
              <div
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 807,
                  top: 307.13,
                  width: 120.75,
                  height: 60.57,
                  transform: "rotate(1.01deg)",
                  zIndex: 7,
                  background: "#39ff14",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "2px 3px 0px #000",
                  border: "2px solid #000",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 22,
                    letterSpacing: "0.02em",
                    color: "#000",
                    textTransform: "uppercase",
                  }}
                >
                  KIOSCO
                </span>
              </div>

              {/* ── 12. GREEN LABEL — MADRUGADA ──────────── */}
              <div
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 1060,
                  top: 312,
                  width: 182,
                  height: 60,
                  transform: "rotate(-0.8deg)",
                  zIndex: 7,
                  background: "#39ff14",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "2px 3px 0px #000",
                  border: "2px solid #000",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 20,
                    letterSpacing: "0.01em",
                    color: "#000",
                    textTransform: "uppercase",
                  }}
                >
                  MADRUGADA
                </span>
              </div>

              {/* ── 13. GREEN LABEL — PARCIAL ─────────────── */}
              <div
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 1415,
                  top: 319,
                  width: 120,
                  height: 58,
                  transform: "rotate(0.05deg)",
                  zIndex: 7,
                  background: "#39ff14",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "2px 3px 0px #000",
                  border: "2px solid #000",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 20,
                    letterSpacing: "-0.03em",
                    lineHeight: "63%",
                    color: "#000", 
                    textTransform: "uppercase",
                  }}
                >
                  PARCIAL...
                </span>
              </div>

              {/* ── 14. LOWER BULLET LIST ─────────────────── */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 770,
                  top: 720,
                  zIndex: 6,
                }}
              >
                {[
                  {
                    prefix: "70G",
                    suffix: " DE DECISIÓN",
                  },
                  {
                    full: "MUCHO DULCE DE LECHE.",
                  },
                  {
                    full: "CACAO SIN MIEDO.",
                  },
                  {
                    full: "RÍO NEGRO, ARGENTINA",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: "#39ff14",
                        flexShrink: 0,
                        boxShadow: "0 0 6px #39ff14",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                        fontWeight: 700,
                        fontSize: 17,
                        letterSpacing: "0.01em",
                        color: "#000",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {"prefix" in item ? (
                        <>
                          <span style={{ color: "#000000" }}>{item.prefix}</span>
                          <span style={{ color: "#000" }}>{item.suffix}</span>
                        </>
                      ) : (
                        <span style={{ color: "#000" }}>{item.full}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── 15. BOTTOM NAV + CTA ──────────────────── */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 100,
                  top: 778,
                  zIndex: 9,
                }}
              >
                <NavBar items={LANDING_NAV_ITEMS} activeKey={activeSection} ctaHref="/activate" />
              </div>

              {/* ── RIGHT SIDE EXPANSION ZONE (corrida más a la derecha) ───────────────── */}

              {/* ── NACIDOS EN RIO NEGRO (arriba del pin de ubicación) ─── */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2170,
                  top: 279,
                  width: 360,
                  zIndex: 8,
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 20,
                    letterSpacing: "0.04em",
                    color: "#e0e0e0",
                    textTransform: "uppercase",
                    display: "block",
                  }}
                >
                  NACIDOS EN
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 32,
                    letterSpacing: "0.02em",
                    color: "#39ff14",
                    textTransform: "uppercase",
                    textShadow: "0 0 14px rgba(57,255,20,0.4)",
                    display: "block",
                  }}
                >
                  RIO NEGRO
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.03em",
                    color: "#e0e0e0",
                    display: "block",
                    marginTop: 10,
                  }}
                >
                  -40.7342° -63.1256°
                </span>
              </div>

              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ICONO%20DE%20UBICACION%20MAPA%20ARGENTINA-zxvl7GYUooF1ZkJyy0XhaUpKq1HnQy.png"
                alt="Argentina location pin"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 2300,
                  top: 240,
                  width: 100,
                  height: 405,
                  objectFit: "contain",
                  transform: "rotate(-5deg)",
                  zIndex: 8,
                  filter: "drop-shadow(0 4px 10px rgba(0,255,0,0.3))",
                }}
              />

              <img
                src="/assets/redes.png"
                alt="Seguinos en redes - código QR de Instagram"
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2300,
                  top: 473,
                  width: 436,
                  height: 166.76,
                  objectFit: "contain",
                  zIndex: 8,
                }}
              />

              {/* ── DOBLE CAPA... (al lado derecho de redes.png) ─────────── */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2600,
                  top: 473,
                  width: 436,
                  height: 166.76,
                  zIndex: 8,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-grold-rounded), sans-serif",
                    fontWeight: 700,
                    fontSize: 44,
                    lineHeight: "105%",
                    letterSpacing: "0.01em",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    display: "block",
                  }}
                >
                  DOBLE CAPA...
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-grold-rounded), sans-serif",
                    fontWeight: 700,
                    fontSize: 44,
                    lineHeight: "105%",
                    letterSpacing: "0.01em",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    display: "block",
                  }}
                >
                  PORQUE SIMPLE
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-grold-rounded), sans-serif",
                    fontWeight: 700,
                    fontSize: 44,
                    lineHeight: "105%",
                    letterSpacing: "0.01em",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    display: "block",
                  }}
                >
                  NO ALCANZABA...
                </span>
              </div>

              {/* ── CAJA DE ALFAJORES (lado derecho) ─────────── */}
              <img
                src="/assets/Caja-N-con-alfajores.webp"
                alt="Caja de 24SIETE Alfajores Negros"
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2900,
                  top: 220,
                  width: 600,
                  height: 580.7,
                  objectFit: "contain",
                  zIndex: 4,
                  filter: "drop-shadow(6px 10px 24px rgba(0,0,0,0.6))",
                }}
              />

              <div
                id="faqs"
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2850,
                  top: 95,
                  zIndex: 7,
                  cursor: "pointer",
                  transition: "opacity 0.18s ease, transform 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.opacity = "0.82"
                  ;(e.currentTarget as HTMLDivElement).style.transform =
                    "rotate(1deg) scale(1.015)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.opacity = "1"
                  ;(e.currentTarget as HTMLDivElement).style.transform =
                    "rotate(0deg) scale(1)"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 70,
                    letterSpacing: "-0.03em",
                    lineHeight: "90%",
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    display: "block",
                    textTransform: "uppercase",
                    transform: "rotate(-97.5deg)",
                    position: "relative",
                  }}
                >
                  FAQS
                </span>
              </div>

              <img
                src="/assets/Flecha_FAQS.png"
                alt=""
                aria-hidden="true"
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2900.13,
                  top: 200.86,
                  width: 55.62,
                  height: 54.81,
                  zIndex: 7,
                }}
              />

              <img
                src="/assets/Brush_blanco_fotos.png"
                alt=""
                aria-hidden="true"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: "-1.66px",
                  top: "270.7px",
                  width: "2057.4px",
                  height: "626.39px",
                  transform: "rotate(1.01deg)",
                  transformOrigin: "top left",
                  opacity: 1,
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}