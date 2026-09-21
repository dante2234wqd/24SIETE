"use client"

// Piezas de UI compartidas por el formulario de Activate (desktop y mobile):
// mensaje de error bajo cada campo, borde de campo inválido y el campo trampa
// (honeypot) que solo completan los bots.

export const invalidFieldStyle: React.CSSProperties = {
  boxShadow: "0 0 0 2px #ff5a5a",
}

export function FieldError({ id, message, fontSize = 12 }: { id: string; message?: string; fontSize?: number }) {
  if (!message) return null
  return (
    <p
      id={id}
      role="alert"
      style={{
        margin: "6px 0 0",
        fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
        fontWeight: 700,
        fontSize,
        lineHeight: 1.3,
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

export function CharCount({ current, max }: { current: number; max: number }) {
  return (
    <span
      style={{
        display: "block",
        textAlign: "right",
        marginTop: 4,
        fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
        fontSize: 11,
        color: current > max ? "#ff8a8a" : "rgba(255,255,255,0.6)",
      }}
    >
      {current}/{max}
    </span>
  )
}
