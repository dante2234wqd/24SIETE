"use client"

import { useState } from "react"
import MobileNavBar from "./mobile-nav-bar"
import type { NavBarItem } from "./nav-bar"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// ─────────────────────────────────────────────────
//  24SIETE — Mobile Hablanos (Activate)
//  Layout de flujo normal (no stage escalado), pensado
//  para pantallas angostas. Reutiliza los mismos
//  campos y estilos que la versión de escritorio.
//  A diferencia de desktop, la confirmación de envío
//  no incluye ninguna mascota/personaje.
// ─────────────────────────────────────────────────

const HABLANOS_ICON_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HABLANOS%201-ZwLdgrogKIGt37GTm3IKYkYnOrgNjq.png"

const ACTIVATE_MOBILE_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

const TIPOS = ["Kiosco", "Distribuidor", "Colaborador"]
const ZONAS = ["CABA", "GBA", "INTERIOR"]

function FieldLabel({ children }: { children: string }) {
  return (
    <label
      style={{
        display: "block",
        fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
        fontWeight: 700,
        fontSize: 14,
        color: "#fff",
        marginBottom: 8,
      }}
    >
      {children}
    </label>
  )
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 16px",
  fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
  fontSize: 14,
  color: "#101010",
  outline: "none",
  boxSizing: "border-box",
}

const submitButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#39ff14",
  borderRadius: 10,
  border: "2.5px solid #000",
  boxShadow: "3px 3px 0px #000",
  padding: "12px 46px",
  transform: "rotate(-1.8deg)",
  cursor: "pointer",
}

const submitButtonTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
  fontWeight: 900,
  fontSize: 16,
  letterSpacing: "0.1em",
  color: "#000",
  textTransform: "uppercase",
}

function ToggleGroup({
  options,
  selected,
  onSelect,
}: {
  options: string[]
  selected: string | null
  onSelect: (v: string) => void
}) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {options.map((opt) => {
        const active = selected === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            style={{
              border: "2px solid #101010",
              borderRadius: 10,
              padding: "9px 16px",
              backgroundColor: active ? "#0FFF1E" : "#fff",
              fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: "#101010",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// la confirmación de envío monta sus propios nodos recién al enviar el
// formulario: usa una animación disparada al montar (no scroll-reveal, que
// sólo observa lo que ya existe en el primer render de la página).
let mountDelay = 0
function mountEnter(variant: "slide" | "fade" = "slide", opts?: { step?: number }): React.CSSProperties {
  const step = opts?.step ?? 0.06
  const delay = mountDelay
  mountDelay += step
  const name = variant === "slide" ? "stage-slide-in" : "stage-fade-in"
  return {
    animation: `${name} 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay.toFixed(2)}s backwards`,
  }
}

export default function ActivateMobile() {
  const enter = useScrollReveal()
  const [tipo, setTipo] = useState<string | null>(null)
  const [zona, setZona] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const headerReveal = enter("fade")
  const nombreReveal = enter()
  const whatsappReveal = enter()
  const tipoReveal = enter()
  const zonaReveal = enter()
  const mensajeReveal = enter()
  const submitReveal = enter()

  mountDelay = 0

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
      <MobileNavBar items={ACTIVATE_MOBILE_NAV_ITEMS} activeKey="activate" ctaHref="/activate" />

      <main
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "28px 20px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* ── HABLANOS: ícono + título ─────────────── */}
        <div ref={headerReveal.ref} style={{ ...headerReveal.style, display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src={HABLANOS_ICON_URL}
            alt="Hablanos icon"
            style={{ width: 56, height: 56, objectFit: "contain", flexShrink: 0, filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.5))" }}
          />
          <span
            style={{
              fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 13vw, 3.2rem)",
              letterSpacing: "0.01em",
              lineHeight: "90%",
              color: "#ffffff",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            HABLANOS
          </span>
        </div>

        {submitted ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <h1
              style={{
                ...mountEnter("fade"),
                fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 11vw, 2.7rem)",
                letterSpacing: "0.02em",
                lineHeight: "100%",
                color: "#ffffff",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              MENSAJE ENVIADO
            </h1>

            <div
              style={{
                ...mountEnter(),
                fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
                fontSize: 16,
                lineHeight: "150%",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <p style={{ margin: 0 }}>Gracias por escribirnos.</p>
              <p style={{ margin: 0 }}>
                El equipo de <strong>24SIETE</strong> te va a responder pronto.
              </p>
              <p style={{ margin: 0 }}>Mientras tanto...</p>
              <p style={{ margin: 0, fontWeight: 700, color: "#39ff14" }}>SEGUI EN MODO 24SIETE.</p>
            </div>

            <div style={{ ...mountEnter(), display: "flex", justifyContent: "center", marginTop: 6 }}>
              <button type="button" onClick={() => setSubmitted(false)} style={submitButtonStyle}>
                <span style={submitButtonTextStyle}>VOLVER</span>
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            style={{ display: "flex", flexDirection: "column", gap: 22 }}
          >
            <div ref={nombreReveal.ref} style={nombreReveal.style}>
              <FieldLabel>¿Cómo te llamás?</FieldLabel>
              <input type="text" placeholder="Para saber con quién hablamos." style={inputStyle} />
            </div>

            <div ref={whatsappReveal.ref} style={whatsappReveal.style}>
              <FieldLabel>Numero de whatsapp</FieldLabel>
              <input type="tel" placeholder="Dejanos tu número y nos contactamos" style={inputStyle} />
            </div>

            <div ref={tipoReveal.ref} style={tipoReveal.style}>
              <FieldLabel>¿Qué sos?</FieldLabel>
              <ToggleGroup options={TIPOS} selected={tipo} onSelect={setTipo} />
            </div>

            <div ref={zonaReveal.ref} style={zonaReveal.style}>
              <FieldLabel>Zona (opcional)</FieldLabel>
              <ToggleGroup options={ZONAS} selected={zona} onSelect={setZona} />
            </div>

            <div ref={mensajeReveal.ref} style={mensajeReveal.style}>
              <FieldLabel>Mensaje</FieldLabel>
              <textarea
                placeholder="Escribí cualquier consulta que nos quieras hacer..."
                rows={4}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <div
              ref={submitReveal.ref}
              style={{ ...submitReveal.style, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 6 }}
            >
              <button type="submit" style={submitButtonStyle}>
                <span style={submitButtonTextStyle}>ENVIAR</span>
              </button>
              <span style={{ fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                Respondemos 24SIETE (o casi)...
              </span>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
