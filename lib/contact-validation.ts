// ─────────────────────────────────────────────────
//  Formulario de contacto (Activate / Hablanos)
//  Reglas de validación compartidas: las usa el hook del
//  cliente (para mostrar errores) y la API route
//  /api/contacto (para no confiar en lo que llega del
//  navegador). Sin "use client" a propósito.
// ─────────────────────────────────────────────────

export const TIPOS = ["Kiosco", "Distribuidor", "Mayorista"]
export const ZONAS = ["CABA", "GBA", "INTERIOR"]

// límites de cada campo (ajustables acá)
export const LIMITS = {
  nombreMin: 2,
  nombreMax: 60,
  telefonoDigits: 10, // código de área + número, sin 0 ni 15
  mensajeMax: 500,
}

export type ContactField = "nombre" | "email" | "telefono" | "tipo" | "zona" | "mensaje"

export type ContactErrors = Partial<Record<ContactField, string>>

export interface ContactData {
  nombre: string
  email: string
  /** solo dígitos, sin +54 (código de área + número) */
  telefono: string
  tipo: string | null
  zona: string | null
  mensaje: string
}

export const normalizeNombre = (s: string) => s.replace(/\s+/g, " ").trim()

/** email sin espacios y en minúscula */
export const normalizeEmail = (s: string) => s.replace(/\s+/g, "").toLowerCase()

/**
 * Deja solo los dígitos del número nacional:
 * - ignora todo lo que no sea dígito
 * - si pegaron el número completo (54 / 549 adelante), saca ese prefijo
 * - saca el 0 inicial
 */
export function normalizeTelefono(raw: string): string {
  let d = raw.replace(/\D/g, "")
  // solo cuando sobran dígitos: así no se come un "54" a medio escribir
  if (d.length > LIMITS.telefonoDigits) {
    if (d.startsWith("549")) d = d.slice(3)
    else if (d.startsWith("54")) d = d.slice(2)
  }
  return d.replace(/^0+/, "").slice(0, 15)
}

/** "1123456789" → "11 2345 6789" · "3511234567" → "351 123 4567" (solo para mostrar) */
export function formatTelefono(digits: string): string {
  const sizes = digits.startsWith("11") ? [2, 4] : [3, 3]
  const parts: string[] = []
  let i = 0
  for (const size of sizes) {
    if (i >= digits.length) break
    parts.push(digits.slice(i, i + size))
    i += size
  }
  if (i < digits.length) parts.push(digits.slice(i))
  return parts.join(" ")
}

export function validateContact(v: ContactData): ContactErrors {
  const errors: ContactErrors = {}

  // ── Nombre: 2 a 60, solo letras (con tildes y ñ), espacios, apóstrofo y guion
  const nombre = normalizeNombre(v.nombre)
  if (
    nombre.length < LIMITS.nombreMin ||
    nombre.length > LIMITS.nombreMax ||
    !/^\p{L}[\p{L}\p{M}'’ -]*$/u.test(nombre)
  )
    errors.nombre = "Ingresá tu nombre."

  // ── Email: obligatorio, formato válido (usuario@dominio.ext)
  const email = normalizeEmail(v.email)
  if (email.length > 254 || !/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/.test(email))
    errors.email = "Ingresá un email válido."

  // ── Teléfono: exactamente 10 dígitos
  if (!new RegExp(`^\\d{${LIMITS.telefonoDigits}}$`).test(v.telefono))
    errors.telefono = "Revisá el número: código de área + número, sin 0 ni 15 (10 dígitos en total)."

  // ── Tipo: obligatorio
  if (!v.tipo || !TIPOS.includes(v.tipo)) errors.tipo = "Elegí una opción."

  // ── Zona: obligatoria
  if (!v.zona || !ZONAS.includes(v.zona)) errors.zona = "Elegí una zona."

  // ── Mensaje: opcional, hasta 500 caracteres
  if (v.mensaje.trim().length > LIMITS.mensajeMax) errors.mensaje = `Máximo ${LIMITS.mensajeMax} caracteres.`

  return errors
}
