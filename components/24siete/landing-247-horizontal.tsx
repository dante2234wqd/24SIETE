"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import NavBar, { type NavBarItem, type NavKey } from "./nav-bar"
import LogoMusicButton from "./logo-music-button"
import HoverTitle from "./hover-title"

const CajaAlfajor3D = dynamic(() => import("@/components/CajaAlfajor3D"), { ssr: false })

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
        background: "#110f10",
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
                src="/assets/fondo_nuevo.webp"
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
                  backgroundColor: "#110f10",
                  zIndex: 1,
                }}
              />

              {/* ── 1B. TEXTURA (lado izquierdo, detrás del hero) ── */}
              <img
                src="/assets/textura.png"
                alt=""
                aria-hidden="true"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: -380,
                  top: 90,
                  width: 950,
                  height: 534,
                  objectFit: "contain",
                  opacity: 0.5,
                  zIndex: 2,
                  pointerEvents: "none",
                  transform: "rotate(-90deg)",
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
              <HoverTitle
                href="/activate"
                style={{
                  ...enter(),
                  left: 2173.34,
                  top: 684,
                  width: 520,
                  height: 147,
                  zIndex: 8,
                }}
                lotties={[
                  { src: "/lottie/mirarconlente.json", style: { top: 18, left: 24, width: 36, height: 36, transform: "rotate(-10deg)" } },
                  { src: "/lottie/mirarconlente.json", style: { top: 8, left: 224, width: 30, height: 30, transform: "rotate(9deg)" } },
                  { src: "/lottie/mirarconlente.json", style: { top: 92, left: 128, width: 28, height: 28, transform: "rotate(-6deg)" } },
                  { src: "/lottie/ojos.json", style: { top: 20, left: 340, width: 32, height: 32, transform: "rotate(10deg)" } },
                  { src: "/lottie/ojos.json", style: { top: 90, left: 440, width: 36, height: 36, transform: "rotate(-8deg)" } },
                  { src: "/lottie/ojos.json", style: { top: 98, left: 258, width: 26, height: 26, transform: "rotate(14deg)" } },
                ]}
              >
                <img
                  src="/assets/HABLANOS.png"
                  alt="Hablanos"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </HoverTitle>

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

              {/* ── 6. MAIN TITLE "DONDE ESTAMOS?" ────────── */}
              <HoverTitle
                href="/donde-estamos"
                style={{
                  ...enter("fade"),
                  left: 770,
                  top: 90,
                  width: 750,
                  height: 150,
                  transform: "rotate(1.68deg)",
                  zIndex: 7,
                }}
                lotties={[
                  { src: "/lottie/lottie.json", style: { top: 20, left: 60, width: 34, height: 34, transform: "rotate(-12deg)" } },
                  { src: "/lottie/lottie.json", style: { top: 12, left: 320, width: 30, height: 30, transform: "rotate(9deg)" } },
                  { src: "/lottie/lottie.json", style: { top: 45, left: 560, width: 38, height: 38, transform: "rotate(-8deg)" } },
                  { src: "/lottie/lottie.json", style: { top: 8, left: 668, width: 40, height: 40, transform: "rotate(6deg)" } },
                  { src: "/lottie/lottie.json", style: { top: 100, left: 420, width: 28, height: 28, transform: "rotate(15deg)" } },
                ]}
              >
                <img
                  src="/assets/DONDE ESTAMOS.png"
                  alt="¿Dónde estamos?"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </HoverTitle>

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
                  boxShadow: "2px 3px 0px #110f10",
                  border: "2px solid #110f10",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 22,
                    letterSpacing: "0.02em",
                    color: "#110f10",
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
                  boxShadow: "2px 3px 0px #110f10",
                  border: "2px solid #110f10",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 20,
                    letterSpacing: "0.01em",
                    color: "#110f10",
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
                  boxShadow: "2px 3px 0px #110f10",
                  border: "2px solid #110f10",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 20,
                    letterSpacing: "-0.03em",
                    lineHeight: "63%",
                    color: "#110f10", 
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
                        color: "#110f10",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {"prefix" in item ? (
                        <>
                          <span style={{ color: "#110f10" }}>{item.prefix}</span>
                          <span style={{ color: "#110f10" }}>{item.suffix}</span>
                        </>
                      ) : (
                        <span style={{ color: "#110f10" }}>{item.full}</span>
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

              {/* ── NACIDOS EN BUENOS AIRES (arriba del pin de ubicación) ─── */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2318,
                  top: 173,
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
                  BUENOS AIRES
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
                  -34.6037° -58.3816°
                </span>
              </div>

              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ICONO%20DE%20UBICACION%20MAPA%20ARGENTINA-zxvl7GYUooF1ZkJyy0XhaUpKq1HnQy.png"
                alt="Argentina location pin"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: 2448,
                  top: 134,
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

              {/* ── CAJA DE ALFAJORES (lado derecho) — visor 3D interactivo ─────────── */}
              {/* left al máximo posible pegado al borde derecho del stage sin que
                  el overflow:hidden del stage (3359px de ancho) lo corte */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2953,
                  top: 220,
                  width: 600,
                  height: 620.7,
                  zIndex: 4,
                }}
              >
                <CajaAlfajor3D />
              </div>

              <HoverTitle
                href="/faqs"
                style={{
                  ...enter(),
                  left: 2860,
                  top: 35,
                  width: 120,
                  height: 247,
                  zIndex: 7,
                }}
                lotties={[
                  { src: "/lottie/carafeliz.json", style: { top: 14, left: 16, width: 20, height: 20, transform: "rotate(-10deg)" } },
                  { src: "/lottie/carafeliz.json", style: { top: 78, left: 70, width: 18, height: 18, transform: "rotate(8deg)" } },
                  { src: "/lottie/carafeliz.json", style: { top: 142, left: 18, width: 16, height: 16, transform: "rotate(-14deg)" } },
                  { src: "/lottie/carafeliz.json", style: { top: 206, left: 66, width: 19, height: 19, transform: "rotate(12deg)" } },
                ]}
              >
                <img
                  src="/assets/FAQS.png"
                  alt="FAQS"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </HoverTitle>

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