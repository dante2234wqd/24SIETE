"use client"

import MobileNavBar from "./mobile-nav-bar"
import type { NavBarItem } from "./nav-bar"
import TitleEmojis from "./title-emojis"
import { CharCount, FieldError, Honeypot, invalidFieldStyle } from "./contact-form-parts"
import { LIMITS, TIPOS, ZONAS, useContactForm } from "@/hooks/use-contact-form"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// ─────────────────────────────────────────────────
//  24SIETE — Mobile Hablanos (Activate)
//  Layout de flujo normal (no stage escalado), pensado
//  para pantallas angostas. Reutiliza los mismos
//  campos y estilos que la versión de escritorio.
//  A diferencia de desktop, la confirmación de envío
//  no incluye ninguna mascota/personaje.
// ─────────────────────────────────────────────────

const ACTIVATE_MOBILE_NAV_ITEMS: NavBarItem[] = [
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
        fontSize: 12.5,
        color: "#fff",
        marginBottom: 5,
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
  borderRadius: 8,
  padding: "8px 12px",
  fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
  fontSize: 13,
  color: "#110f10",
  outline: "none",
  boxSizing: "border-box",
}

const submitButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#39ff14",
  borderRadius: 10,
  border: "2.5px solid #110f10",
  boxShadow: "3px 3px 0px #110f10",
  padding: "9px 34px",
  transform: "rotate(-1.8deg)",
  cursor: "pointer",
}

const submitButtonTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
  fontWeight: 900,
  fontSize: 14,
  letterSpacing: "0.1em",
  color: "#110f10",
  textTransform: "uppercase",
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
      style={{ display: "flex", gap: 8, flexWrap: "wrap", outline: "none", ...(invalid ? { borderRadius: 10, boxShadow: "0 0 0 2px #ff5a5a", padding: 4, margin: -4 } : null) }}
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
              borderRadius: 8,
              padding: "6px 12px",
              backgroundColor: active ? "#0FFF1E" : "#fff",
              fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
              fontWeight: 700,
              fontSize: 12,
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
  const ID = "contact-m"
  const form = useContactForm(ID)
  const { values, errors, submitted } = form

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
        backgroundColor: "#110f10",
        backgroundImage: "url(/assets/textura_puntos_mobile.png), url(/assets/fondo_mobile.png)",
        backgroundSize: "100% auto, cover",
        backgroundPosition: "top center, top center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundAttachment: "scroll, fixed",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MobileNavBar items={ACTIVATE_MOBILE_NAV_ITEMS} activeKey="activate" ctaHref="/activate" />

      <main
        style={{
          maxWidth: 480,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
          // título + formulario centrados en la altura visible (debajo de la barra de navegación)
          flex: 1,
          justifyContent: "center",
          padding: "96px 20px 56px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* ── HABLANOS: título con los emojis animados de "¿Dónde estamos?" (siempre visibles); se oculta al enviar ── */}
        {!submitted && (
          <div ref={headerReveal.ref} style={{ ...headerReveal.style, display: "flex", alignItems: "center" }}>
            <span
              style={{
                position: "relative",
                display: "inline-block",
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
              <TitleEmojis size={24} />
            </span>
          </div>
        )}

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
              <button type="button" onClick={form.reset} style={submitButtonStyle}>
                <span style={submitButtonTextStyle}>VOLVER</span>
              </button>
            </div>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={form.submit}
            style={{ display: "flex", flexDirection: "column", gap: 15 }}
          >
            <div ref={nombreReveal.ref} style={nombreReveal.style}>
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
              <FieldError id={`${ID}-nombre-error`} message={errors.nombre} />
            </div>

            <div ref={whatsappReveal.ref} style={whatsappReveal.style}>
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
              <FieldError id={`${ID}-whatsapp-error`} message={errors.whatsapp} />
            </div>

            <div ref={tipoReveal.ref} style={tipoReveal.style}>
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
              <FieldError id={`${ID}-tipo-error`} message={errors.tipo} />
            </div>

            <div ref={zonaReveal.ref} style={zonaReveal.style}>
              <FieldLabel>Zona (opcional)</FieldLabel>
              {/* opcional: tocar la zona elegida de nuevo la desmarca */}
              <ToggleGroup
                id={`${ID}-zona`}
                options={ZONAS}
                selected={values.zona}
                onSelect={(v) => form.setField("zona", values.zona === v ? null : v)}
              />
            </div>

            <div ref={mensajeReveal.ref} style={mensajeReveal.style}>
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
              <FieldError id={`${ID}-mensaje-error`} message={errors.mensaje} />
            </div>

            <div
              ref={submitReveal.ref}
              style={{ ...submitReveal.style, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 2 }}
            >
              <Honeypot value={values.website} onChange={(v) => form.setField("website", v)} />
              <button
                type="submit"
                disabled={form.status === "sending"}
                style={{ ...submitButtonStyle, opacity: form.status === "sending" ? 0.7 : 1 }}
              >
                <span style={submitButtonTextStyle}>{form.status === "sending" ? "ENVIANDO..." : "ENVIAR"}</span>
              </button>
              <FieldError id={`${ID}-send-error`} message={form.sendError ?? undefined} />
              <span style={{ fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                Respondemos 24SIETE (o casi)...
              </span>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
