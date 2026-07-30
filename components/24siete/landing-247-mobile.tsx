"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import MobileNavBar from "./mobile-nav-bar"
import type { NavBarItem } from "./nav-bar"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useDraggableSticker } from "@/hooks/use-draggable-sticker"

const CajaAlfajor3D = dynamic(() => import("@/components/CajaAlfajor3D"), { ssr: false })

// ─────────────────────────────────────────────────
//  24SIETE — Mobile Landing
//  Layout de flujo normal (no stage escalado), pensado
//  para pantallas angostas. Reutiliza los mismos
//  assets que la versión horizontal de escritorio.
// ─────────────────────────────────────────────────

const HABLANOS_ICON_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HABLANOS%201-ZwLdgrogKIGt37GTm3IKYkYnOrgNjq.png"

const LANDING_MOBILE_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "#" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

const BULLETS = ["70G DE DECISIÓN", "MUCHO DULCE DE LECHE.", "CACAO SIN MIEDO.", "RÍO NEGRO, ARGENTINA"]

export default function Landing247Mobile() {
  const enter = useScrollReveal()
  const activeSticker = useDraggableSticker()
  const modoSticker = useDraggableSticker()

  const heroCard = enter("fade")
  const bulletsBox = enter()
  const dondeEstamosLink = enter("fade")
  const kioscoImg = enter("fade")
  const modoSection = enter("fade")
  const alfajoresImg = enter()
  const seguinosBox = enter()
  const dobleCapaBox = enter()
  const mapaImg = enter("slide", { toOpacity: 0.72 })
  const nacidosEnBox = enter()
  const hablanosLink = enter()
  const faqsLink = enter("fade")
  const footerBox = enter()

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        backgroundImage: "url(/assets/fondo%20mobile.png)",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        overflowX: "hidden",
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
              width: "82%",
              maxWidth: 320,
              flexShrink: 0,
              marginLeft: -40,
            }}
          >
            <img
              src="/assets/image_alfajores_mobile.png"
              alt="Stack de alfajores 24SIETE"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
            <img
              src="/assets/Stiker_24SIETE.png"
              alt="Sticker 24SIETE - ¿Estás active o estás mirando?"
              draggable={false}
              onPointerDown={activeSticker.onPointerDown}
              style={{
                position: "absolute",
                top: "-10%",
                right: "-22%",
                width: "48%",
                transform: `translate(${activeSticker.offset.x}px, ${activeSticker.offset.y}px) rotate(-10deg) scale(${activeSticker.isDragging ? 1.08 : 1})`,
                transition: activeSticker.isDragging ? "none" : "transform 0.2s ease",
                zIndex: activeSticker.isDragging ? 50 : 2,
                cursor: activeSticker.isDragging ? "grabbing" : "grab",
                touchAction: "none",
                userSelect: "none",
              }}
            />
          </div>

          <div
            ref={bulletsBox.ref}
            style={{
              ...bulletsBox.style,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              flex: 1,
              minWidth: 0,
            }}
          >
            {BULLETS.map((text) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
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
                    fontSize: 10.5,
                    letterSpacing: "0.01em",
                    color: "#fff",
                    textTransform: "uppercase",
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
            style={{ ...dondeEstamosLink.style, display: "inline-block", textDecoration: "none", marginLeft: -40 }}
          >
            <img
              src="/assets/donde_estamos_mobile.png"
              alt="¿Dónde estamos?"
              style={{ width: "140%", maxWidth: 390, display: "block" }}
            />
          </Link>
        </section>

        {/* ── FOTOS: KIOSCO / MADRUGADA / PARCIAL ──── */}
        <section style={{ display: "flex", justifyContent: "center" }}>
          <img
            ref={kioscoImg.ref}
            src="/assets/kiosco_madrugada_parcial_mobile.png"
            alt="Kiosco, madrugada y parcial: 24SIETE en todos lados"
            style={{ ...kioscoImg.style, width: "100%", objectFit: "contain" }}
          />
        </section>

        {/* ── #MODO24SIETE ─────────────────────────── */}
        <div
          ref={modoSection.ref}
          style={{
            ...modoSection.style,
            display: "flex",
            justifyContent: "flex-end",
            marginTop: -130,
            marginRight: -3,
            position: "relative",
            zIndex: 2,
          }}
        >
          <img
            src="/assets/Stiker_modo24siete.png"
            alt="#MODO24SIETE sticker"
            draggable={false}
            onPointerDown={modoSticker.onPointerDown}
            style={{
              width: "58%",
              maxWidth: 140,
              position: "relative",
              transform: `translate(${modoSticker.offset.x}px, ${modoSticker.offset.y}px) rotate(-6deg) scale(${modoSticker.isDragging ? 1.08 : 1})`,
              transition: modoSticker.isDragging ? "none" : "transform 0.2s ease",
              zIndex: modoSticker.isDragging ? 50 : 1,
              cursor: modoSticker.isDragging ? "grabbing" : "grab",
              touchAction: "none",
              userSelect: "none",
            }}
          />
        </div>

        {/* ── PAQUETES + SEGUINOS  |  MAPA + NACIDOS EN RIO NEGRO ── */}
        <section style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "42%" }}>
            <img
              ref={alfajoresImg.ref}
              src="/assets/ALFAJORES.webp"
              alt="Paquetes de alfajores 24SIETE"
              style={{
                ...alfajoresImg.style,
                width: "128%",
                maxWidth: 220,
                objectFit: "contain",
                position: "relative",
                zIndex: 2,
              }}
            />

            <div ref={seguinosBox.ref} style={{ ...seguinosBox.style, display: "flex", alignItems: "center" }}>
              <img
                src="/assets/seguinos_mobile.png"
                alt="Seguinos en Instagram"
                style={{ width: "60%", maxWidth: 105, objectFit: "contain" }}
              />
            </div>

            <div ref={dobleCapaBox.ref} style={{ ...dobleCapaBox.style, display: "flex", flexDirection: "column" }}>
              {["DOBLE CAPA...", "PORQUE SIMPLE", "NO ALCANZABA..."].map((line) => (
                <span
                  key={line}
                  style={{
                    fontFamily: "var(--font-grold-rounded), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1rem, 5.5vw, 1.25rem)",
                    lineHeight: "112%",
                    letterSpacing: "0.01em",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    display: "block",
                  }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", width: "58%" }}>
            <img
              ref={mapaImg.ref}
              src="/assets/Mapa_argentina1.webp"
              alt="Mapa de Argentina"
              style={{ ...mapaImg.style, width: "100%" }}
            />
            <div
              ref={nacidosEnBox.ref}
              style={{
                ...nacidosEnBox.style,
                position: "absolute",
                top: "40%",
                left: -95,
                right: 0,
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
              <span
                style={{
                  fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                  fontWeight: 900,
                  fontSize: 21,
                  letterSpacing: "0.02em",
                  color: "#39ff14",
                  textTransform: "uppercase",
                  textShadow: "0 0 10px rgba(57,255,20,0.4)",
                  display: "block",
                }}
              >
                RIO NEGRO
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
                -40.7342° -63.1256°
              </span>
            </div>
          </div>
        </section>

        {/* ── HABLANOS ─────────────────────────────── */}
        <Link
          href="/activate"
          ref={hablanosLink.ref}
          style={{
            ...hablanosLink.style,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            textDecoration: "none",
          }}
        >
          <img
            src={HABLANOS_ICON_URL}
            alt="Contact us icon"
            style={{ width: 96, height: 96, objectFit: "contain", filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.5))" }}
          />
          <span
            style={{
              fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.3rem, 16.5vw, 4.2rem)",
              letterSpacing: "0.01em",
              lineHeight: "90%",
              color: "#ffffff",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            HABLANOS
          </span>
        </Link>

        {/* ── FAQS ─────────────────────────────────── */}
        <Link
          href="/faqs"
          ref={faqsLink.ref}
          style={{
            ...faqsLink.style,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 14,
            textDecoration: "none",
            marginRight: -40,
          }}
        >
          <img
            src="/assets/faqs_flecha_,mobile.png?v=2"
            alt="FAQS"
            style={{ width: "26%", maxWidth: 110, objectFit: "contain" }}
          />
          <img
            src="/assets/chico_comiendo_alfajor_mobile.png"
            alt="Persona comiendo alfajor 24SIETE"
            style={{ width: "64%", maxWidth: 250, objectFit: "contain" }}
          />
        </Link>

        {/* ── FOOTER: CAJA — visor 3D interactivo ──── */}
        <div
          ref={footerBox.ref}
          style={{ ...footerBox.style, display: "flex", justifyContent: "flex-end", marginRight: -40, marginBottom: -64 }}
        >
          <div style={{ width: "105%", maxWidth: 420, aspectRatio: "368 / 373" }}>
            <CajaAlfajor3D />
          </div>
        </div>
      </main>
    </div>
  )
}
