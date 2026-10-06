"use client"

import { useState, type FormEvent } from "react"
import {
  normalizeEmail,
  normalizeNombre,
  normalizeTelefono,
  validateContact,
  type ContactData,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact-validation"

// ─────────────────────────────────────────────────
//  Formulario de contacto (Activate / Hablanos)
//  Estado compartido por la versión desktop y la mobile.
//  Las reglas viven en lib/contact-validation.ts (las mismas
//  que repite la API route) y el envío va a /api/contacto,
//  que es la que reenvía a n8n.
// ─────────────────────────────────────────────────

export { TIPOS, ZONAS, LIMITS, formatTelefono } from "@/lib/contact-validation"
export type { ContactField, ContactErrors } from "@/lib/contact-validation"

export interface ContactValues extends ContactData {
  aceptaWhatsapp: boolean
  /** honeypot: campo oculto que las personas no ven; si viene con algo, es un bot */
  website: string
}

const INITIAL: ContactValues = {
  nombre: "",
  email: "",
  telefono: "",
  tipo: null,
  zona: null,
  mensaje: "",
  aceptaWhatsapp: false,
  website: "",
}

// orden en que se enfoca el primer campo con error
const FIELD_ORDER: ContactField[] = ["nombre", "email", "telefono", "tipo", "zona", "mensaje"]

async function sendContact(values: ContactValues): Promise<{ ok: true } | { ok: false; errores?: ContactErrors }> {
  const res = await fetch("/api/contacto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: normalizeNombre(values.nombre),
      email: normalizeEmail(values.email),
      telefono: `+54${values.telefono}`,
      tipo: values.tipo,
      zona: values.zona,
      mensaje: values.mensaje.trim(),
      aceptaWhatsapp: values.aceptaWhatsapp,
      website: values.website,
    }),
  })
  const data = await res.json().catch(() => null)
  if (res.ok && data?.ok) return { ok: true }
  return { ok: false, errores: data?.errores }
}

/** idPrefix: distinto en desktop y mobile (ambos están siempre en el DOM) para que no se dupliquen los ids. */
export function useContactForm(idPrefix = "contact") {
  const [values, setValues] = useState<ContactValues>(INITIAL)
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [sendError, setSendError] = useState<string | null>(null)
  // errores que devolvió la API (400); se borran al editar ese campo
  const [serverErrors, setServerErrors] = useState<ContactErrors>({})

  const allErrors = validateContact(values)
  // un error se muestra cuando el campo ya se tocó o cuando se intentó enviar
  const errors: ContactErrors = {}
  for (const f of FIELD_ORDER) {
    if (allErrors[f] && (touched[f] || attempted)) errors[f] = allErrors[f]
    else if (serverErrors[f]) errors[f] = serverErrors[f]
  }

  const setField = <K extends keyof ContactValues>(field: K, value: ContactValues[K]) => {
    setValues((cur) => ({ ...cur, [field]: value }))
    setServerErrors((cur) => (field in cur ? { ...cur, [field]: undefined } : cur))
  }

  /** teléfono: se guardan solo los dígitos nacionales (sin 0, sin 54/549) */
  const setTelefono = (raw: string) => setField("telefono", normalizeTelefono(raw))

  /** email: se guarda sin espacios y en minúscula mientras se escribe */
  const setEmail = (raw: string) => setField("email", normalizeEmail(raw))

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

    // el honeypot (website) se manda igual: la API responde OK sin reenviarlo a n8n
    setStatus("sending")
    try {
      const result = await sendContact(values)
      if (!result.ok) {
        // falla: se conserva lo que escribió
        setStatus("idle")
        if (result.errores && Object.keys(result.errores).length > 0) {
          setServerErrors(result.errores)
          setSendError("Revisá los datos marcados.")
        } else {
          setSendError("No pudimos enviar tu mensaje. Probá de nuevo en un momento.")
        }
        return
      }
      // éxito: se limpia el formulario y se muestra la confirmación
      setValues(INITIAL)
      setTouched({})
      setAttempted(false)
      setServerErrors({})
      setStatus("sent")
    } catch {
      setStatus("idle")
      setSendError("No pudimos enviar tu mensaje. Probá de nuevo en un momento.")
    }
  }

  // "VOLVER" desde la confirmación: el formulario ya quedó limpio al enviar
  const reset = () => {
    setSendError(null)
    setStatus("idle")
  }

  return {
    values,
    errors,
    setField,
    setTelefono,
    setEmail,
    touch,
    submit,
    reset,
    status,
    sendError,
    submitted: status === "sent",
  }
}
