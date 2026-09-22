"use client"

import { useEffect, useMemo, useState } from "react"
import { type NavBarItem } from "./nav-bar"
import TitleEmojis from "./title-emojis"
import DesktopLogo from "./desktop-logo"
import DesktopBottomNav from "./desktop-bottom-nav"
import { CharCount, FieldError, Honeypot, invalidFieldStyle } from "./contact-form-parts"
import { LIMITS, TIPOS, ZONAS, useContactForm } from "@/hooks/use-contact-form"

// ─────────────────────────────────────────────────
//  24SIETE — Activate (Hablanos)
//  Stage fijo 1920×1080, escalado para entrar siempre
//  en pantalla sin necesidad de scroll.
// ─────────────────────────────────────────────────

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

const ACTIVATE_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

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
  id,
  options,
  selected,
  onSelect,
  invalid,
  describedBy,
}: {
  id: string
  options: string[]
  selected: string | null
  onSelect: (v: string) => void
  invalid?: boolean
  describedBy?: string
}) {
  return (
    <div
      id={id}
      tabIndex={-1}
      role="group"
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      style={{ display: "flex", gap: 12, flexWrap: "wrap", outline: "none", ...(invalid ? { borderRadius: 12, boxShadow: "0 0 0 2px #ff5a5a", padding: 4, margin: -4 } : null) }}
    >
      {options.map((opt) => {
        const active = selected === opt
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
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
  const ID = "contact-d"
  const form = useContactForm(ID)
  const { values, errors, submitted } = form

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

      <DesktopLogo />
      <DesktopBottomNav items={ACTIVATE_NAV_ITEMS} activeKey="activate" ctaHref="/activate" />

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
        {/* HABLANOS: título con los emojis animados de "¿Dónde estamos?" (siempre visibles) */}
        {!submitted && (
        <div style={{ ...enter(), position: "absolute", left: 660, top: 100, zIndex: 4 }}>
          <span
            style={{
              position: "relative",
              display: "inline-block",
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
            <TitleEmojis size={34} />
          </span>
        </div>
        )}

        {/* Formulario / Confirmación de envío */}
        {submitted ? (
          <div
            style={{
              position: "absolute",
              left: 660,
              top: 230,
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
                onClick={form.reset}
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
            noValidate
            onSubmit={form.submit}
            style={{
              position: "absolute",
              left: 660,
              top: 235,
              width: 420,
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div style={enter()}>
              <FieldLabel>¿Cómo te llamás?</FieldLabel>
              <input
                id={`${ID}-nombre`}
                type="text"
                name="nombre"
                autoComplete="name"
                maxLength={LIMITS.nombreMax}
                placeholder="Para saber con quién hablamos."
                value={values.nombre}
                onChange={(e) => form.setField("nombre", e.target.value)}
                onBlur={() => form.touch("nombre")}
                aria-invalid={!!errors.nombre}
                aria-describedby={errors.nombre ? `${ID}-nombre-error` : undefined}
                style={{ ...inputStyle, ...(errors.nombre ? invalidFieldStyle : null) }}
              />
              <FieldError id={`${ID}-nombre-error`} message={errors.nombre} fontSize={13} />
            </div>

            <div style={enter()}>
              <FieldLabel>Numero de whatsapp</FieldLabel>
              <input
                id={`${ID}-whatsapp`}
                type="tel"
                name="whatsapp"
                inputMode="tel"
                autoComplete="tel"
                maxLength={20}
                placeholder="Dejanos tu número y nos contactamos"
                value={values.whatsapp}
                onChange={(e) => form.setField("whatsapp", e.target.value)}
                onBlur={() => form.touch("whatsapp")}
                aria-invalid={!!errors.whatsapp}
                aria-describedby={errors.whatsapp ? `${ID}-whatsapp-error` : undefined}
                style={{ ...inputStyle, ...(errors.whatsapp ? invalidFieldStyle : null) }}
              />
              <FieldError id={`${ID}-whatsapp-error`} message={errors.whatsapp} fontSize={13} />
            </div>

            <div style={enter()}>
              <FieldLabel>¿Qué sos?</FieldLabel>
              <ToggleGroup
                id={`${ID}-tipo`}
                options={TIPOS}
                selected={values.tipo}
                onSelect={(v) => {
                  form.setField("tipo", v)
                  form.touch("tipo")
                }}
                invalid={!!errors.tipo}
                describedBy={errors.tipo ? `${ID}-tipo-error` : undefined}
              />
              <FieldError id={`${ID}-tipo-error`} message={errors.tipo} fontSize={13} />
            </div>

            <div style={enter()}>
              <FieldLabel>Zona (opcional)</FieldLabel>
              {/* opcional: tocar la zona elegida de nuevo la desmarca */}
              <ToggleGroup
                id={`${ID}-zona`}
                options={ZONAS}
                selected={values.zona}
                onSelect={(v) => form.setField("zona", values.zona === v ? null : v)}
              />
            </div>

            <div style={enter()}>
              <FieldLabel>Mensaje</FieldLabel>
              <textarea
                id={`${ID}-mensaje`}
                name="mensaje"
                maxLength={LIMITS.mensajeMax}
                placeholder="Escribí cualquier consulta que nos quieras hacer..."
                rows={3}
                value={values.mensaje}
                onChange={(e) => form.setField("mensaje", e.target.value)}
                onBlur={() => form.touch("mensaje")}
                aria-invalid={!!errors.mensaje}
                aria-describedby={errors.mensaje ? `${ID}-mensaje-error` : undefined}
                style={{ ...inputStyle, resize: "none", ...(errors.mensaje ? invalidFieldStyle : null) }}
              />
              <CharCount current={values.mensaje.length} max={LIMITS.mensajeMax} />
              <FieldError id={`${ID}-mensaje-error`} message={errors.mensaje} fontSize={13} />
            </div>

            <div style={{ ...enter(), display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 6 }}>
              <Honeypot value={values.website} onChange={(v) => form.setField("website", v)} />
              <button
                type="submit"
                disabled={form.status === "sending"}
                style={{
                  opacity: form.status === "sending" ? 0.7 : 1,
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
                  {form.status === "sending" ? "ENVIANDO..." : "ENVIAR"}
                </span>
              </button>
              <FieldError id={`${ID}-send-error`} message={form.sendError ?? undefined} fontSize={13} />
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

      </div>
    </div>
  )
}
