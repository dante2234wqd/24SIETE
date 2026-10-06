"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { type NavBarItem } from "./nav-bar"
import TitleEmojis from "./title-emojis"
import DesktopLogo from "./desktop-logo"
import DesktopBottomNav from "./desktop-bottom-nav"
import { CharCount, FieldError, Honeypot, PhoneInput, WhatsappCheckbox, invalidFieldStyle } from "./contact-form-parts"
import { LIMITS, TIPOS, ZONAS, formatTelefono, useContactForm } from "@/hooks/use-contact-form"

// ─────────────────────────────────────────────────
//  24SIETE — Activate (Hablanos)
//  Stage fijo 1920×1080, escalado para entrar siempre
//  en pantalla sin necesidad de scroll.
// ─────────────────────────────────────────────────

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

// pincelada del footer (BRUSH_NUEVO.png): proporción y altura (en fracción de
// la imagen) donde empieza el blanco sobre la columna del formulario
const BRUSH_ASPECT_W = 2065
const BRUSH_ASPECT_H = 354
const BRUSH_WHITE_START = 0.44 // medido en el PNG: 0.444 en toda la franja del formulario
const BRUSH_MARGIN = 10 // px de pantalla libres entre el formulario y el blanco
// px del stage que pueden subir: el título hasta 60 (arranca en top 100 y los
// cohetes sobresalen por arriba) y el formulario 50 más, achicando el espacio
// entre el título y el formulario
const TITLE_MAX_LIFT = 60
const MAX_LIFT = TITLE_MAX_LIFT + 50

const ACTIVATE_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

function FieldLabel({ children, htmlFor, id }: { children: string; htmlFor?: string; id?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      id={id}
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
      aria-labelledby={`${id}-label`}
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

  // La pincelada del footer escala con el ANCHO y el stage con min(ancho, alto):
  // en ventanas más anchas que 16:9 (o cuando aparecen los errores y el form
  // crece) el final del formulario puede quedar debajo del blanco. En ese caso
  // 1) se sube título + formulario lo justo (hasta MAX_LIFT) y, si con eso no
  // alcanza, 2) se achica el stage lo necesario para que entre.
  const formRef = useRef<HTMLFormElement>(null)
  const [formBottom, setFormBottom] = useState(0) // coords del stage (sin escalar)
  // se re-mide cada vez que el form cambia de alto (p. ej. cuando terminan de
  // cargar las tipografías, o al aparecer errores); medirlo solo en el primer
  // render lo tomaba con la fuente de reemplazo, más alto, y lo achicaba de más
  // hasta la primera tecla
  useLayoutEffect(() => {
    const f = formRef.current
    if (!f) return setFormBottom(0)
    const update = () => setFormBottom(f.offsetTop + f.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(f)
    return () => ro.disconnect()
  }, [submitted])

  const { scale, lift } = useMemo(() => {
    const { width: w, height: h } = viewport
    if (!w || !h) return { scale: 1, lift: 0 }
    let s = Math.min(w / STAGE_WIDTH, h / STAGE_HEIGHT)
    if (!formBottom) return { scale: s, lift: 0 }

    const brushHeight = w * (BRUSH_ASPECT_H / BRUSH_ASPECT_W)
    const safeBottom = h - brushHeight * (1 - BRUSH_WHITE_START) - BRUSH_MARGIN
    // el stage está centrado en vertical: su borde de arriba en pantalla es (h - 1080·s) / 2
    const overflow = ((h - STAGE_HEIGHT * s) / 2 + formBottom * s - safeBottom) / s
    if (overflow > MAX_LIFT) {
      // con el lift máximo sigue sin entrar: se despeja s de
      // h/2 + (formBottom - MAX_LIFT - 540)·s = safeBottom
      const k = formBottom - MAX_LIFT - STAGE_HEIGHT / 2
      if (k > 0) s = Math.min(s, (safeBottom - h / 2) / k)
      return { scale: s, lift: MAX_LIFT }
    }
    return { scale: s, lift: Math.max(0, Math.ceil(overflow)) }
  }, [viewport, formBottom])
  // `translate` (y no `transform`) para no pisar la animación de entrada
  const liftStyle = (px: number): React.CSSProperties => ({ translate: `0 ${-px}px`, transition: "translate 0.2s ease" })

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
        src="/assets/BRUSH_NUEVO.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          ...enter("fade"),
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          aspectRatio: "2065 / 354",
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
        <div style={{ ...enter(), ...liftStyle(Math.min(lift, TITLE_MAX_LIFT)), position: "absolute", left: 660, top: 100, zIndex: 4 }}>
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
            ref={formRef}
            noValidate
            onSubmit={form.submit}
            style={{
              ...liftStyle(lift),
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
              <FieldLabel htmlFor={`${ID}-nombre`}>¿Cómo te llamás?</FieldLabel>
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
              <FieldError id={`${ID}-nombre-error`} message={errors.nombre} fontSize={13} overlap={18} />
            </div>

            <div style={enter()}>
              <FieldLabel htmlFor={`${ID}-email`}>Tu email</FieldLabel>
              <input
                id={`${ID}-email`}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                maxLength={254}
                placeholder="Para mandarte la info."
                value={values.email}
                onChange={(e) => form.setEmail(e.target.value)}
                onBlur={() => form.touch("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${ID}-email-error` : undefined}
                style={{ ...inputStyle, ...(errors.email ? invalidFieldStyle : null) }}
              />
              <FieldError id={`${ID}-email-error`} message={errors.email} fontSize={13} overlap={18} />
            </div>

            <div style={enter()}>
              <FieldLabel htmlFor={`${ID}-telefono`}>Numero de whatsapp</FieldLabel>
              <PhoneInput
                id={`${ID}-telefono`}
                inputStyle={inputStyle}
                value={formatTelefono(values.telefono)}
                onChange={form.setTelefono}
                onBlur={() => form.touch("telefono")}
                invalid={!!errors.telefono}
                describedBy={`${ID}-telefono-desc`}
              />
              {/* ayuda en gris; si hay error, el error la reemplaza en el mismo lugar */}
              <FieldError
                id={`${ID}-telefono-desc`}
                message={errors.telefono}
                hint="Código de área + número, sin 0 ni 15."
                fontSize={13}
                overlap={18}
              />
            </div>

            <div style={enter()}>
              <FieldLabel id={`${ID}-tipo-label`}>¿Qué sos?</FieldLabel>
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
              <FieldError id={`${ID}-tipo-error`} message={errors.tipo} fontSize={13} overlap={18} offset={4} />
            </div>

            <div style={enter()}>
              <FieldLabel id={`${ID}-zona-label`}>Zona</FieldLabel>
              <ToggleGroup
                id={`${ID}-zona`}
                options={ZONAS}
                selected={values.zona}
                onSelect={(v) => {
                  form.setField("zona", v)
                  form.touch("zona")
                }}
                invalid={!!errors.zona}
                describedBy={errors.zona ? `${ID}-zona-error` : undefined}
              />
              <FieldError id={`${ID}-zona-error`} message={errors.zona} fontSize={13} overlap={18} offset={4} />
            </div>

            <div style={enter()}>
              <FieldLabel htmlFor={`${ID}-mensaje`}>Mensaje (opcional)</FieldLabel>
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
                // verticalAlign:top + margen fijo: alineada a la línea de base dejaba debajo
                // un espacio que dependía de la fuente heredada (7px con la anterior); así
                // queda en 7px exactos sin importar la fuente
                style={{ ...inputStyle, resize: "none", verticalAlign: "top", marginBottom: 7, ...(errors.mensaje ? invalidFieldStyle : null) }}
              />
              {/* error pegado a la caja, en la misma línea que el contador */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <FieldError id={`${ID}-mensaje-error`} message={errors.mensaje} fontSize={13} />
                <CharCount current={values.mensaje.length} max={LIMITS.mensajeMax} />
              </div>
            </div>

            <div style={enter()}>
              <WhatsappCheckbox
                id={`${ID}-acepta-whatsapp`}
                checked={values.aceptaWhatsapp}
                onChange={(v) => form.setField("aceptaWhatsapp", v)}
                fontSize={14}
              />
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
