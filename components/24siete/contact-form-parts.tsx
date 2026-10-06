"use client"

// Piezas de UI compartidas por el formulario de Activate (desktop y mobile):
// mensaje de error bajo cada campo, borde de campo inválido y el campo trampa
// (honeypot) que solo completan los bots.

export const invalidFieldStyle: React.CSSProperties = {
  boxShadow: "0 0 0 2px #ff5a5a",
}

/**
 * `overlap`: el gap (px) que hay debajo del campo en el formulario. Si se pasa,
 * el error se dibuja dentro de ese gap (con margen negativo) en vez de sumar
 * alto: así el formulario no crece hacia la barra de navegación al aparecer
 * los errores. Solo empuja si el mensaje ocupa más de una línea.
 */
export function FieldError({
  id,
  message,
  fontSize = 12,
  overlap,
  hint,
  offset = 0,
}: {
  id: string
  message?: string
  fontSize?: number
  overlap?: number
  /** texto de ayuda que se muestra (en gris, con el mismo id) mientras no hay error */
  hint?: string
  /** px extra arriba (p. ej. los grupos de botones, cuyo borde rojo sobresale 4px) */
  offset?: number
}) {
  if (overlap !== undefined) {
    return (
      <div style={{ minHeight: overlap, marginBottom: -overlap, paddingTop: offset }}>
        <FieldError id={id} message={message} fontSize={fontSize} hint={hint} />
      </div>
    )
  }
  if (!message && hint) {
    return (
      <p
        id={id}
        style={{
          margin: "2px 0 0",
          fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
          fontSize,
          lineHeight: 1.2,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {hint}
      </p>
    )
  }
  if (!message) return null
  return (
    <p
      id={id}
      role="alert"
      style={{
        margin: "2px 0 0",
        fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
        fontWeight: 700,
        fontSize,
        lineHeight: 1.2,
        color: "#ff8a8a",
      }}
    >
      {message}
    </p>
  )
}

/** Campo oculto para personas (fuera de pantalla, sin foco, sin autocompletar). */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  )
}

/**
 * Teléfono con "+54" fijo pegado a la izquierda. Usa el mismo `inputStyle`
 * que el resto de los campos; el borde rojo de error envuelve a los dos.
 */
export function PhoneInput({
  id,
  value,
  onChange,
  onBlur,
  invalid,
  describedBy,
  inputStyle,
}: {
  id: string
  value: string
  onChange: (raw: string) => void
  onBlur: () => void
  invalid?: boolean
  describedBy?: string
  inputStyle: React.CSSProperties
}) {
  const r = inputStyle.borderRadius
  return (
    <div style={{ display: "flex", borderRadius: r, ...(invalid ? invalidFieldStyle : null) }}>
      <span
        id={`${id}-prefix`}
        style={{
          ...inputStyle,
          width: "auto",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 14,
          paddingRight: 14,
          lineHeight: 1,
          fontWeight: 700,
          borderRight: "1px solid rgba(17,15,16,0.15)",
          borderRadius: `${r}px 0 0 ${r}px`,
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {/* el "+" de Grold es chico y queda bajo: se dibuja con Arial para que quede centrado */}
        <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>+</span>54
      </span>
      <input
        id={id}
        type="text"
        name="telefono"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="11 2345 6789"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!invalid}
        aria-describedby={[`${id}-prefix`, describedBy].filter(Boolean).join(" ")}
        style={{ ...inputStyle, minWidth: 0, paddingLeft: 12, borderRadius: `0 ${r}px ${r}px 0` }}
      />
    </div>
  )
}

export function WhatsappCheckbox({
  id,
  checked,
  onChange,
  fontSize,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  fontSize: number
}) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
        fontSize,
        color: "#fff",
        cursor: "pointer",
      }}
    >
      <input
        id={id}
        type="checkbox"
        name="aceptaWhatsapp"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: 16, height: 16, margin: 0, flexShrink: 0, accentColor: "#39ff14", cursor: "pointer" }}
      />
      Acepto que 24SIETE me contacte por WhatsApp.
    </label>
  )
}

export function CharCount({ current, max }: { current: number; max: number }) {
  return (
    <span
      style={{
        display: "block",
        textAlign: "right",
        marginTop: 4,
        marginLeft: "auto",
        flexShrink: 0,
        fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
        fontSize: 11,
        color: current > max ? "#ff8a8a" : "rgba(255,255,255,0.6)",
      }}
    >
      {current}/{max}
    </span>
  )
}
