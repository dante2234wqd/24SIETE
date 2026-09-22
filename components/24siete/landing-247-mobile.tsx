"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import MobileNavBar from "./mobile-nav-bar"
import type { NavBarItem } from "./nav-bar"
import { LottieOverlay } from "./hover-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useDraggableSticker } from "@/hooks/use-draggable-sticker"
import { INSTAGRAM_URL } from "./social-links"

// Coordenadas dadas por diseño para el hero (alfajor + estrellas + sticker)
// están medidas sobre un frame de referencia de 396px de ancho, re-ancladas
// para que el borde izquierdo del alfajor quede en X:0 (pegado al borde
// izquierdo real de la pantalla) en vez de sangrar por fuera del frame. El
// cluster ocupa localmente el rango X:[0, 341] / Y:[113, 477.18] — de ahí
// salen estas constantes para convertir cada elemento a porcentajes
// relativos al propio contenedor del hero.
const HERO_LOCAL_WIDTH = 341
const HERO_LOCAL_HEIGHT = 364.18 // 477.18 (piso del sticker) - 113 (techo de la estrella verde)
const HERO_LOCAL_TOP = 113
const BOX_OFFSET_Y = -144

function heroBox(x: number, y: number, w: number, h: number) {
  return {
    left: `${(x / HERO_LOCAL_WIDTH) * 100}%`,
    top: `${((y - HERO_LOCAL_TOP) / HERO_LOCAL_HEIGHT) * 100}%`,
    width: `${(w / HERO_LOCAL_WIDTH) * 100}%`,
    height: `${(h / HERO_LOCAL_HEIGHT) * 100}%`,
  }
}

const CajaAlfajor3D = dynamic(() => import("@/components/CajaAlfajor3D"), { ssr: false })

// ─────────────────────────────────────────────────
//  24SIETE — Mobile Landing
//  Layout de flujo normal (no stage escalado), pensado
//  para pantallas angostas. Reutiliza los mismos
//  assets que la versión horizontal de escritorio.
// ─────────────────────────────────────────────────

const LANDING_MOBILE_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "#" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

// foto del chico (180×251) y FAQS (88×253) escalan juntos para mantener su proporción
const FOTO_FAQS_SCALE = 1

const BULLETS = ["70G DE DECISIÓN", "MUCHO DULCE DE LECHE.", "CACAO SIN MIEDO.", "BUENOS AIRES, ARGENTINA"]

export default function Landing247Mobile() {
  const enter = useScrollReveal()
  const modoSticker = useDraggableSticker()

  const heroCard = enter("fade")
  const bulletsBox = enter()
  const dondeEstamosLink = enter("fade")
  const kioscoImg = enter("fade")
  const alfajoresImg = enter()
  const seguinosBox = enter()
  const mapaImg = enter("slide", { toOpacity: 0.72 })
  const nacidosEnBox = enter()
  const hablanosLink = enter()
  const faqsLink = enter("fade")
  const footerBox = enter("fade") // fade: la animación "slide" pisa el marginTop negativo

  // El QR de "Seguinos" se alinea con el inicio de la B de "BUENOS AIRES":
  // se mide el inline-block del texto (offsetLeft ignora los transforms de la animación).
  const buenosAiresRef = useRef<HTMLSpanElement>(null)
  const [qrOffset, setQrOffset] = useState(0)
  useEffect(() => {
    const el = buenosAiresRef.current
    const parent = el?.offsetParent as HTMLElement | null
    if (!el || !parent) return
    const measure = () => setQrOffset(el.offsetLeft + parent.offsetLeft)
    measure()
    document.fonts?.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  // HABLANOS toma el ancho exacto del título "¿Dónde estamos?"
  const dondeEstamosH2Ref = useRef<HTMLHeadingElement>(null)
  const [hablanosWidth, setHablanosWidth] = useState(240)
  useEffect(() => {
    const el = dondeEstamosH2Ref.current
    if (!el) return
    const measure = () => setHablanosWidth(el.offsetWidth)
    measure()
    document.fonts?.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

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
        overflowX: "clip", // "hidden" convertía este div en scroll container vertical (doble barra)
      }}
    >
      <MobileNavBar items={LANDING_MOBILE_NAV_ITEMS} activeKey="yo-soy-24siete" ctaHref="/activate" />

      <main
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "28px 20px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 56,
        }}
      >
        {/* ── HERO ─────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
          <div
            ref={heroCard.ref}
            style={{
              ...heroCard.style,
              position: "relative",
              width: "341px",
              maxWidth: "min(86.11vw, 341px)",
              aspectRatio: `${HERO_LOCAL_WIDTH} / ${HERO_LOCAL_HEIGHT}`,
              marginLeft: -60,
              flexShrink: 1,
            }}
          >
            <img
              src="/assets/alfajores_blanco_negro_trim.webp"
              alt="Alfajor 24SIETE"
              style={{
                position: "absolute",
                ...heroBox(-70, 151, 380, 309),
                maxWidth: "none",
                objectFit: "cover",
                objectPosition: "center top",
                zIndex: 1,
              }}
            />
            <img
              src="/assets/ASSETS_ESTRELLAS-02.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{ position: "absolute", ...heroBox(221, 113, 78, 89), objectFit: "contain", zIndex: 2 }}
            />
            <img
              src="/assets/ASSETS_ESTRELLAS-03.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{ position: "absolute", ...heroBox(269, 356, 54.18, 61.22), objectFit: "contain", zIndex: 2 }}
            />
            <img
              src="/assets/Stiker_modo24siete.png"
              alt="#MODO24SIETE sticker"
              draggable={false}
              onPointerDown={modoSticker.onPointerDown}
              style={{
                position: "absolute",
                ...heroBox(88, 384, 137.71, 93.18),
                objectFit: "contain",
                transform: `translate(${modoSticker.offset.x}px, ${modoSticker.offset.y}px) rotate(-6deg) scale(${modoSticker.isDragging ? 1.08 : 1})`,
                transition: modoSticker.isDragging ? "none" : "transform 0.2s ease",
                zIndex: modoSticker.isDragging ? 50 : 3,
                cursor: modoSticker.isDragging ? "grabbing" : "grab",
                touchAction: "none",
                userSelect: "none",
              }}
            />
          </div>

          <div
            ref={bulletsBox.ref}
            style={{
              ...bulletsBox.style,
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              flex: 1,
              minWidth: 76,
              marginLeft: -18,
            }}
          >
            {BULLETS.map((text) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 5,
                    height: 5,
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
                    fontSize: 9.5,
                    letterSpacing: "0.01em",
                    color: "#fff",
                    textTransform: "uppercase",
                    minWidth: 0,
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── DONDE ESTAMOS? ──────────────────────── */}
        <section style={{ display: "flex", justifyContent: "flex-start" }}>
          <Link
            href="/donde-estamos"
            ref={dondeEstamosLink.ref}
            style={{
              ...dondeEstamosLink.style,
              position: "relative",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            <h2
              ref={dondeEstamosH2Ref}
              style={{
                fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 8.5vw, 2.4rem)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color: "#fff",
                textTransform: "uppercase",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              ¿Dónde estamos?
            </h2>

            {/* iconos animados: en desktop aparecen al hover, en mobile van
                siempre visibles (no hay cursor que los dispare) */}
            <LottieOverlay src="/lottie/lottie.json" hovered style={{ top: -12, left: 4, width: 18, height: 18, transform: "rotate(-12deg)" }} />
            <LottieOverlay src="/lottie/lottie.json" hovered style={{ top: -15, left: 106, width: 17, height: 17, transform: "rotate(9deg)" }} />
            <LottieOverlay src="/lottie/lottie.json" hovered style={{ top: 18, left: 177, width: 20, height: 20, transform: "rotate(-8deg)" }} />
          </Link>
        </section>

        {/* ── FOTOS: KIOSCO / MADRUGADA / PARCIAL ──── */}
        <section style={{ display: "flex", justifyContent: "center", marginTop: -32 }}>
          <img
            ref={kioscoImg.ref}
            src="/assets/KIOSCO_MADRUGADA_PARCIAL_MOBILE.png"
            alt="Kiosco, madrugada y parcial: 24SIETE en todos lados"
            style={{ ...kioscoImg.style, width: "100%", objectFit: "contain" }}
          />
        </section>

        {/* ── PAQUETES (der.) / MAPA BUENOS AIRES (izq.) / SEGUINOS + DOBLE CAPA ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Paquetes de alfajores blanco y negro, alineados a la derecha */}
          <div style={{ position: "relative", display: "flex", justifyContent: "flex-end" }}>
            <img
              src="/assets/ASSETS_ESTRELLAS-02.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                position: "absolute",
                left: "4%",
                top: -14,
                width: "18%",
                maxWidth: 70,
                objectFit: "contain",
                zIndex: 2,
              }}
            />
            <img
              ref={alfajoresImg.ref}
              src="/assets/alfajores-blanco-negro.webp"
              alt="Paquetes de alfajores 24SIETE blanco y negro"
              style={{
                ...alfajoresImg.style,
                position: "relative",
                width: "76.8%",
                maxWidth: 304,
                aspectRatio: "304 / 254",
                objectFit: "contain",
                marginRight: -28,
                zIndex: 1,
              }}
            />
          </div>

          {/* Mapa de Buenos Aires, alineado a la izquierda, pegado a los paquetes */}
          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: -175 }}>
            <div style={{ position: "relative", width: "81.3%", maxWidth: 322, aspectRatio: "322 / 298" }}>
              <img
                ref={mapaImg.ref}
                src="/assets/Mapa%20de%20buenos%20aires%202.png"
                alt="Mapa de Buenos Aires con nuestros puntos de venta"
                style={{ ...mapaImg.style, width: "100%", height: "100%", objectFit: "contain" }}
              />
              <div
                ref={nacidosEnBox.ref}
                style={{
                  ...nacidosEnBox.style,
                  position: "absolute",
                  top: "38%",
                  left: 0,
                  right: "30%",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 14,
                    letterSpacing: "0.03em",
                    color: "#e0e0e0",
                    textTransform: "uppercase",
                    display: "block",
                  }}
                >
                  NACIDOS EN
                </span>
                <span style={{ display: "block" }}>
                  <span
                    ref={buenosAiresRef}
                    style={{
                      fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                      fontWeight: 900,
                      fontSize: 21,
                      letterSpacing: "0.02em",
                      color: "#39ff14",
                      textTransform: "uppercase",
                      textShadow: "0 0 10px rgba(57,255,20,0.4)",
                      display: "inline-block",
                    }}
                  >
                    BUENOS AIRES
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "0.02em",
                    color: "#e0e0e0",
                    display: "block",
                    marginTop: 6,
                  }}
                >
                  -34.6037° -58.3816°
                </span>
              </div>
              <img
                src="/assets/ASSETS_ESTRELLAS-03.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                style={{
                  position: "absolute",
                  right: -18,
                  bottom: -18,
                  width: "19%",
                  maxWidth: 56,
                  objectFit: "contain",
                  zIndex: 2,
                }}
              />
            </div>
          </div>

          {/* Seguinos (QR de Instagram) — todo el bloque es un link a Instagram */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div ref={seguinosBox.ref} style={{ ...seguinosBox.style, flexShrink: 0, marginLeft: Math.max(37, qrOffset - 5) }}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Seguinos en Instagram" style={{ display: "block" }}>
                <img
                  src="/assets/mobile_qr_seguinos_v2.png"
                  alt="Seguinos en Instagram - código QR"
                  draggable={false}
                  style={{ width: 316, height: "auto", objectFit: "contain", display: "block" }}
                />
              </a>
            </div>
          </div>
        </section>

        {/* ── HABLANOS ─────────────────────────────── */}
        {/* mismo arte y mismos íconos animados que desktop (520×147), con el ancho del
            título "¿Dónde estamos?" y alineado a su borde izquierdo */}
        <section style={{ display: "flex", justifyContent: "flex-start", marginTop: -16 }}>
          <Link
            href="/activate"
            ref={hablanosLink.ref}
            style={{
              ...hablanosLink.style,
              position: "relative",
              display: "block",
              width: hablanosWidth,
              aspectRatio: "520 / 147",
              textDecoration: "none",
            }}
          >
            <img
              src="/assets/HABLANOS.png"
              alt="Hablanos"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
            {[
              { src: "/lottie/mirarconlente.json", top: 18, left: 24, size: 36, rot: -10 },
              { src: "/lottie/mirarconlente.json", top: 8, left: 224, size: 30, rot: 9 },
              { src: "/lottie/mirarconlente.json", top: 92, left: 128, size: 28, rot: -6 },
              { src: "/lottie/ojos.json", top: 20, left: 340, size: 32, rot: 10 },
              { src: "/lottie/ojos.json", top: 90, left: 440, size: 36, rot: -8 },
              { src: "/lottie/ojos.json", top: 98, left: 258, size: 26, rot: 14 },
            ].map((l, i) => {
              const k = hablanosWidth / 520
              return (
                <LottieOverlay
                  key={i}
                  src={l.src}
                  hovered
                  style={{ top: l.top * k, left: l.left * k, width: l.size * k, height: l.size * k, transform: `rotate(${l.rot}deg)` }}
                />
              )
            })}
          </Link>
        </section>

        {/* ── FOTO (izq., espejada) + FAQS (der.) ───── */}
        <Link
          href="/faqs"
          ref={faqsLink.ref}
          style={{
            ...faqsLink.style,
            position: "relative",
            zIndex: 2, // por encima del visor 3D, que sube y se superpone con esta zona
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 14,
            textDecoration: "none",
            marginLeft: -40,
          }}
        >
          <img
            src="/assets/foto_chico_alfajor.png"
            alt="Persona comiendo alfajor 24SIETE"
            style={{ width: 180 * FOTO_FAQS_SCALE, height: 251 * FOTO_FAQS_SCALE, flexShrink: 0, objectFit: "contain" }}
          />
          {/* mismos íconos animados (carafeliz) que desktop, escalados de 120×247 a 88×253 */}
          <div style={{ position: "relative", width: 88 * FOTO_FAQS_SCALE, height: 253 * FOTO_FAQS_SCALE, flexShrink: 0 }}>
            <img
              src="/assets/faqs_flecha_,mobile.png?v=2"
              alt="FAQS"
              style={{ width: "100%", height: "100%", objectFit: "contain", transform: "rotate(9.45deg)", display: "block" }}
            />
            {[
              { top: 14, left: 16, size: 20, rot: -10 },
              { top: 78, left: 70, size: 18, rot: 8 },
              { top: 142, left: 18, size: 16, rot: -14 },
              { top: 206, left: 66, size: 19, rot: 12 },
            ].map((l, i) => {
              const kx = (88 * FOTO_FAQS_SCALE) / 120
              const ky = (253 * FOTO_FAQS_SCALE) / 247
              return (
                <LottieOverlay
                  key={i}
                  src="/lottie/carafeliz.json"
                  hovered
                  style={{ top: l.top * ky, left: l.left * kx, width: l.size * kx, height: l.size * kx, transform: `rotate(${l.rot}deg)` }}
                />
              )
            })}
          </div>
        </Link>

        {/* ── FOOTER: CAJA — visor 3D interactivo ──── */}
        {/* el marginTop va en este wrapper, que useScrollReveal no toca: el hook
            fuerza marginTop:0 en el elemento que anima al revelarlo */}
        <div style={{ marginTop: BOX_OFFSET_Y, marginBottom: -110 }}>
          <div ref={footerBox.ref} style={{ ...footerBox.style, display: "flex", justifyContent: "center" }}>
            <div style={{ width: "150%", maxWidth: 900, flexShrink: 0, aspectRatio: "398 / 403" }}>
              <CajaAlfajor3D />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
