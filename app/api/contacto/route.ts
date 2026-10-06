import { NextResponse } from "next/server"
import { normalizeEmail, normalizeNombre, normalizeTelefono, validateContact } from "@/lib/contact-validation"

// Recibe el formulario de Hablanos, repite las validaciones del cliente y lo
// reenvía al webhook de n8n. Las variables N8N_* son solo de servidor (sin
// NEXT_PUBLIC_), así que nunca llegan al navegador.

const str = (v: unknown) => (typeof v === "string" ? v : "")

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    const json = await req.json()
    body = json && typeof json === "object" ? json : {}
  } catch {
    return NextResponse.json({ ok: false, errores: {} }, { status: 400 })
  }

  // honeypot: si un bot completó el campo oculto, se responde OK sin reenviar nada
  if (str(body.website).trim()) return NextResponse.json({ ok: true })

  const data = {
    nombre: normalizeNombre(str(body.nombre)),
    email: normalizeEmail(str(body.email)),
    // llega como "+54XXXXXXXXXX": se vuelve a normalizar y validar acá
    telefono: normalizeTelefono(str(body.telefono)),
    tipo: str(body.tipo) || null,
    zona: str(body.zona) || null,
    mensaje: str(body.mensaje).trim(),
  }

  const errores = validateContact(data)
  if (Object.keys(errores).length > 0) return NextResponse.json({ ok: false, errores }, { status: 400 })

  const url = process.env.N8N_WEBHOOK_URL
  const secret = process.env.N8N_WEBHOOK_SECRET
  if (!url || !secret) {
    console.error("Contacto: faltan N8N_WEBHOOK_URL / N8N_WEBHOOK_SECRET")
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-webhook-secret": secret },
      body: JSON.stringify({
        nombre: data.nombre,
        email: data.email,
        telefono: `+54${data.telefono}`,
        tipo: data.tipo,
        zona: data.zona,
        mensaje: data.mensaje,
        aceptaWhatsapp: body.aceptaWhatsapp === true,
        origen: "web-activate",
        enviadoEn: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000), // si n8n no responde en 10 s → 502
    })
    if (!res.ok) throw new Error(`n8n ${res.status}`)
  } catch (err) {
    console.error("Contacto: error reenviando a n8n:", err)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
