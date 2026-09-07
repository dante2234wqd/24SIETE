"use client"

import { useEffect, useMemo, useState } from "react"
import NavBar, { type NavBarItem } from "./nav-bar"
import LogoMusicButton from "./logo-music-button"

// ─────────────────────────────────────────────────
//  24SIETE — Activate (Hablanos)
//  Stage fijo 1920×1080, escalado para entrar siempre
//  en pantalla sin necesidad de scroll.
// ─────────────────────────────────────────────────

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

const HABLANOS_ICON_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HABLANOS%201-ZwLdgrogKIGt37GTm3IKYkYnOrgNjq.png"

const ACTIVATE_NAV_ITEMS: NavBarItem[] = [
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
        fontSize: 15,
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
  color: "#110f10",
  outline: "none",
  boxSizing: "border-box",
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
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {options.map((opt) => {
        const active = selected === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            style={{
              border: "2px solid #110f10",
              borderRadius: 10,
              padding: "9px 18px",
              backgroundColor: active ? "#0FFF1E" : "#fff",
              fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#110f10",
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

export default function Activate() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [tipo, setTipo] = useState<string | null>(null)
  const [zona, setZona] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

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
        {/* Logo (también botón de música) */}
        <LogoMusicButton
          style={{ ...enter(), position: "absolute", left: 70, top: 40, width: 76, height: 78, zIndex: 4 }}
        />

        {/* HABLANOS: ícono + título, mismo estilo que en la home */}
        <div style={{ position: "absolute", left: 660, top: 70, display: "flex", alignItems: "center", gap: 20, zIndex: 4 }}>
          <img
            src={HABLANOS_ICON_URL}
            alt="Hablanos icon"
            style={{
              ...enter(),
              width: 96,
              height: 96,
              objectFit: "contain",
              flexShrink: 0,
              filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.5))",
            }}
          />
          <span
            style={{
              ...enter(),
              fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 64,
              letterSpacing: "0.01em",
              lineHeight: "90%",
              color: "#ffffff",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            HABLANOS
          </span>
        </div>

        {/* Formulario / Confirmación de envío */}
        {submitted ? (
          <div
            style={{
              position: "absolute",
              left: 660,
              top: 300,
              width: 640,
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <h1
              style={{
                ...enter(),
                fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                fontWeight: 900,
                fontSize: 56,
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
                ...enter(),
                fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
                fontSize: 18,
                lineHeight: "160%",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <p style={{ margin: 0 }}>Gracias por escribirnos.</p>
              <p style={{ margin: 0 }}>
                El equipo de <strong>24SIETE</strong> te va a responder pronto.
              </p>
              <p style={{ margin: 0 }}>Mientras tanto...</p>
              <p style={{ margin: 0, fontWeight: 700, color: "#39ff14" }}>SEGUI EN MODO 24SIETE.</p>
            </div>

            <div style={{ ...enter(), marginTop: 6 }}>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#39ff14",
                  borderRadius: 10,
                  border: "2.5px solid #110f10",
                  boxShadow: "3px 3px 0px #110f10",
                  padding: "12px 46px",
                  transform: "rotate(-1.8deg)",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 16,
                    letterSpacing: "0.1em",
                    color: "#110f10",
                    textTransform: "uppercase",
                  }}
                >
                  VOLVER
                </span>
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            style={{
              position: "absolute",
              left: 660,
              top: 220,
              width: 420,
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <div style={enter()}>
              <FieldLabel>¿Cómo te llamás?</FieldLabel>
              <input type="text" placeholder="Para saber con quién hablamos." style={inputStyle} />
            </div>

            <div style={enter()}>
              <FieldLabel>Numero de whatsapp</FieldLabel>
              <input type="tel" placeholder="Dejanos tu número y nos contactamos" style={inputStyle} />
            </div>

            <div style={enter()}>
              <FieldLabel>¿Qué sos?</FieldLabel>
              <ToggleGroup options={TIPOS} selected={tipo} onSelect={setTipo} />
            </div>

            <div style={enter()}>
              <FieldLabel>Zona (opcional)</FieldLabel>
              <ToggleGroup options={ZONAS} selected={zona} onSelect={setZona} />
            </div>

            <div style={enter()}>
              <FieldLabel>Mensaje</FieldLabel>
              <textarea
                placeholder="Escribí cualquier consulta que nos quieras hacer..."
                rows={4}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <div style={{ ...enter(), display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 6 }}>
              <button
                type="submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#39ff14",
                  borderRadius: 10,
                  border: "2.5px solid #110f10",
                  boxShadow: "3px 3px 0px #110f10",
                  padding: "12px 46px",
                  transform: "rotate(-1.8deg)",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 16,
                    letterSpacing: "0.1em",
                    color: "#110f10",
                    textTransform: "uppercase",
                  }}
                >
                  ENVIAR
                </span>
              </button>
              <span
                style={{
                  fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Respondemos 24SIETE (o casi)...
              </span>
            </div>
          </form>
        )}

        {/* Bottom nav */}
        <div style={{ ...enter(), position: "absolute", left: 200, top: 986, zIndex: 7 }}>
          <NavBar items={ACTIVATE_NAV_ITEMS} activeKey="activate" ctaHref="/activate" />
        </div>
      </div>
    </div>
  )
}
