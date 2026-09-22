"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import NavBar, { type NavBarItem, type NavKey } from "./nav-bar"
import LogoMusicButton from "./logo-music-button"
import HoverTitle from "./hover-title"
import { INSTAGRAM_URL } from "./social-links"

const CajaAlfajor3D = dynamic(() => import("@/components/CajaAlfajor3D"), { ssr: false })

// ─────────────────────────────────────────────────
//  24SIETE — Horizontal Editorial Landing Stage
//  Stage base: 3359px × 873px
//  Escalado por altura para experiencia inmersiva
// ─────────────────────────────────────────────────

const STAGE_WIDTH = 3359
const STAGE_HEIGHT = 873

// tamaño fijo en px reales del visor 3D de la caja (no crece en pantallas altas)
const BOX_VIEWER_PX = 520

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
      className="overflow-x-auto overflow-y-hidden hide-scrollbar"
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
                src="/assets/alfajores_home_v2.webp"
                alt="Stack de alfajores 24SIETE blanco y negro"
                style={{
                  ...enter(),
                  position: "absolute",
                  left: -13,
                  top: 50,
                  width: 1276,
                  height: 830,
                  objectFit: "contain",
                  objectPosition: "left center",
                  zIndex: 6,
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

              {/* ── 4. FLOATING STICKER (movido junto a la foto de la chica) ─── */}
              <img
                src="/assets/alfajores-blanco-negro.webp"
                alt="Paquetes de alfajores 24SIETE blanco y negro"
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

              {/* ── 4B. MAPA DE BUENOS AIRES (mismo que en mobile) agregado al lado del paquete/pulseras ─── */}
              <img
                src="/assets/Mapa%20de%20buenos%20aires%202.png"
                alt="Mapa de la provincia de Buenos Aires"
                style={{
                  ...enter("slide", { toOpacity: 0.72 }),
                  position: "absolute",
                  left: 2200,
                  top: 10,
                  width: 450,
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

              {/* ── 8. FOTO MOMENTOS (kiosco / madrugada / parcial) ─── */}
              <img
                src="/assets/FOTO_MOMENTOS.png"
                alt="Momentos 24SIETE: kiosco, madrugada y parcial"
                style={{
                  ...enter("fade"),
                  position: "absolute",
                  left: -12.6,
                  top: 297.31,
                  width: 2052,
                  height: 576,
                  objectFit: "contain",
                  zIndex: 5,
                }}
              />

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

              {/* ── 14. LOWER BULLET LIST (corrido a la derecha para no quedar debajo del botón ACTIVATE de la nav) ── */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 880,
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
                    full: "BUENOS AIRES, ARGENTINA",
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

              {/* ── 15. BOTTOM NAV + CTA (misma posición/tamaño que en dónde estamos, FAQs y hablanos — ver desktop-bottom-nav.tsx) ── */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 100,
                  top: 760,
                  zIndex: 9,
                }}
              >
                <NavBar items={LANDING_NAV_ITEMS} activeKey={activeSection} ctaHref="/activate" scale={1.12} />
              </div>

              {/* ── RIGHT SIDE EXPANSION ZONE (corrida más a la derecha) ───────────────── */}

              {/* ── NACIDOS EN BUENOS AIRES (arriba del pin de ubicación) ─── */}
              <div
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2250,
                  top: 300,
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

              {/* ── SEGUINOS / QR (agrandado: antes compartía este espacio con el texto "doble capa...", que sacamos) ── */}
              {/* todo el bloque es un link a Instagram, no solo el QR */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguinos en Instagram"
                style={{
                  ...enter(),
                  position: "absolute",
                  left: 2400,
                  top: 431,
                  width: 484,
                  height: 250.14,
                  zIndex: 8,
                  display: "block",
                  cursor: "pointer",
                }}
              >
                <img
                  src="/assets/qr_instagram.png"
                  alt="Seguinos en redes - código QR de Instagram"
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "left center",
                    display: "block",
                  }}
                />
              </a>

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

          {/* ── CAJA DE ALFAJORES (lado derecho) — visor 3D interactivo ─────────── */}
          {/* Vive FUERA del transform:scale del stage (y de su overflow:hidden a
              3359px), como hermano de ese div, adentro del mismo contenedor que ya
              scrollea horizontalmente. left/top se escalan a mano (stageValue*scale)
              para que la posición siga acompañando al resto del contenido, pero el
              tamaño queda FIJO en px reales (BOX_VIEWER_PX): antes, al vivir dentro
              del transform, el visor 3D medía su propio contenedor ya escalado y
              aplicaba la escala una segunda vez al pintarse — en pantallas altas
              terminaba mucho más grande de lo pensado y se cortaba contra el borde
              del stage. Acá ni crece con la altura de pantalla ni puede cortarse. */}
          <div
            style={{
              ...enter(),
              position: "absolute",
              left: 2900 * scale,
              top: 142 * scale,
              width: BOX_VIEWER_PX,
              height: BOX_VIEWER_PX,
              zIndex: 4,
            }}
          >
            <CajaAlfajor3D />
          </div>
        </div>
      </div>
    </div>
  )
}