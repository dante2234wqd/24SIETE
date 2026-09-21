"use client"

import { useState, type FormEvent } from "react"

// ─────────────────────────────────────────────────
//  Formulario de contacto (Activate / Hablanos)
//  Reglas de validación + estado, compartidos por la
//  versión desktop y la mobile para que valgan igual.
//
//  Para conectarlo a n8n: definí NEXT_PUBLIC_CONTACT_WEBHOOK_URL con la URL
//  del webhook y el formulario le hace POST (JSON) al enviar. Sin esa
//  variable no se envía nada y solo se muestra la confirmación.
// ─────────────────────────────────────────────────

export const TIPOS = ["Kiosco", "Distribuidor", "Colaborador"]
export const ZONAS = ["CABA", "GBA", "INTERIOR"]

// límites de cada campo (ajustables acá)
export const LIMITS = {
  nombreMin: 2,
  nombreMax: 60,
  whatsappMinDigits: 8,
  whatsappMaxDigits: 15, // máximo del estándar internacional E.164
  mensajeMin: 10,
  mensajeMax: 600,
}

export type ContactField = "nombre" | "whatsapp" | "tipo" | "zona" | "mensaje"

export interface ContactValues {
  nombre: string
  whatsapp: string
  tipo: string | null
  zona: string | null
  mensaje: string
  /** honeypot: campo oculto que las personas no ven; si viene con algo, es un bot */
  website: string
}

export type ContactErrors = Partial<Record<ContactField, string>>

const INITIAL: ContactValues = { nombre: "", whatsapp: "", tipo: null, zona: null, mensaje: "", website: "" }

// orden en que se enfoca el primer campo con error
const FIELD_ORDER: ContactField[] = ["nombre", "whatsapp", "tipo", "zona", "mensaje"]

const countLetters = (s: string) => (s.match(/\p{L}/gu) ?? []).length

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {}

  // ── Nombre: solo letras (con tildes/ñ), espacios, apóstrofe, punto y guion
  const nombre = v.nombre.replace(/\s+/g, " ").trim()
  if (!nombre) errors.nombre = "Contanos cómo te llamás."
  else if (nombre.length < LIMITS.nombreMin) errors.nombre = "El nombre es muy corto."
  else if (nombre.length > LIMITS.nombreMax) errors.nombre = `Máximo ${LIMITS.nombreMax} caracteres.`
  else if (!/^[\p{L}\p{M}][\p{L}\p{M}'’ .-]*$/u.test(nombre)) errors.nombre = "Usá solo letras (sin números ni símbolos)."
  else if (countLetters(nombre) < 2 || /(.)\1{3,}/u.test(nombre)) errors.nombre = "Escribí un nombre válido."

  // ── WhatsApp: números (con +, espacios, guiones o paréntesis), 8 a 15 dígitos
  const whatsapp = v.whatsapp.trim()
  if (!whatsapp) errors.whatsapp = "Dejanos tu número para contactarte."
  else if (!/^\+?[\d\s()-]+$/.test(whatsapp)) errors.whatsapp = "Usá solo números (podés incluir +, espacios o guiones)."
  else {
    const digits = whatsapp.replace(/\D/g, "")
    if (digits.length < LIMITS.whatsappMinDigits || digits.length > LIMITS.whatsappMaxDigits)
      errors.whatsapp = `El número debe tener entre ${LIMITS.whatsappMinDigits} y ${LIMITS.whatsappMaxDigits} dígitos.`
    else if (/^(\d)\1+$/.test(digits)) errors.whatsapp = "Ese número no parece válido."
  }

  // ── Tipo: obligatorio
  if (!v.tipo || !TIPOS.includes(v.tipo)) errors.tipo = "Elegí una opción."

  // ── Zona: opcional (pero si viene, tiene que ser una de las opciones)
  if (v.zona && !ZONAS.includes(v.zona)) errors.zona = "Elegí una zona válida."

  // ── Mensaje: largo mínimo/máximo, sin links, con texto real
  const mensaje = v.mensaje.trim()
  if (!mensaje) errors.mensaje = "Escribinos tu consulta."
  else if (mensaje.length < LIMITS.mensajeMin) errors.mensaje = `Contanos un poco más (mínimo ${LIMITS.mensajeMin} caracteres).`
  else if (mensaje.length > LIMITS.mensajeMax) errors.mensaje = `Máximo ${LIMITS.mensajeMax} caracteres.`
  else if (/(https?:\/\/|www\.)/i.test(mensaje)) errors.mensaje = "Por seguridad, no aceptamos links en el mensaje."
  else if (countLetters(mensaje) < 5 || /(.)\1{7,}/u.test(mensaje)) errors.mensaje = "Escribí un mensaje válido."

  return errors
}

export interface ContactPayload {
  nombre: string
  whatsapp: string
  tipo: string
  zona: string
  mensaje: string
  origen: string
  enviadoEn: string
}

const WEBHOOK_URL = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL

async function sendContact(payload: ContactPayload) {
  if (!WEBHOOK_URL) return // sin webhook configurado: no se envía nada
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`webhook ${res.status}`)
}

/** idPrefix: distinto en desktop y mobile (ambos están siempre en el DOM) para que no se dupliquen los ids. */
export function useContactForm(idPrefix = "contact") {
  const [values, setValues] = useState<ContactValues>(INITIAL)
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [sendError, setSendError] = useState<string | null>(null)

  const allErrors = validateContact(values)
  // un error se muestra cuando el campo ya se tocó o cuando se intentó enviar
  const errors: ContactErrors = {}
  for (const f of FIELD_ORDER) if (allErrors[f] && (touched[f] || attempted)) errors[f] = allErrors[f]

  const setField = <K extends keyof ContactValues>(field: K, value: ContactValues[K]) =>
    setValues((cur) => ({ ...cur, [field]: value }))

  const touch = (field: ContactField) => setTouched((cur) => ({ ...cur, [field]: true }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === "sending") return
    setAttempted(true)
    setSendError(null)

    const firstInvalid = FIELD_ORDER.find((f) => allErrors[f])
    if (firstInvalid) {
      // lleva el foco al primer campo con error
      document.getElementById(`${idPrefix}-${firstInvalid}`)?.focus()
      return
    }

    // honeypot: un bot completó el campo oculto → se simula el éxito sin enviar nada
    if (values.website) {
      setStatus("sent")
      return
    }

    setStatus("sending")
    try {
      await sendContact({
        nombre: values.nombre.replace(/\s+/g, " ").trim(),
        whatsapp: values.whatsapp.trim(),
        tipo: values.tipo ?? "",
        zona: values.zona ?? "",
        mensaje: values.mensaje.trim(),
        origen: "web-activate",
        enviadoEn: new Date().toISOString(),
      })
      setStatus("sent")
    } catch {
      setStatus("idle")
      setSendError("No pudimos enviar tu mensaje. Probá de nuevo en un momento.")
    }
  }

  const reset = () => {
    setValues(INITIAL)
    setTouched({})
    setAttempted(false)
    setSendError(null)
    setStatus("idle")
  }

  return { values, errors, setField, touch, submit, reset, status, sendError, submitted: status === "sent" }
}
