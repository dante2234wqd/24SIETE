import { NextResponse } from "next/server"

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyb8QOIAd5TUxyb4tBusbGh-UY8DT-M8JUKfWxa8BBQKYQDias0uRbzJeTkU6aYtcAtJg/exec"

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    promise
      .then((value) => {
        clearTimeout(timer)
        resolve(value)
      })
      .catch((err) => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

export async function POST(req: Request) {
  try {
    const { nombre, apellido, email } = await req.json()

    if (!nombre || !String(nombre).trim()) {
      return NextResponse.json({ error: "Nombre requerido" }, { status: 400 })
    }

    const emailStr = String(email || "").trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailStr || !emailRegex.test(emailStr)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const nombreCompleto = [String(nombre).trim(), String(apellido || "").trim()]
      .filter(Boolean)
      .join(" ")

    const fecha = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    const resendRes = await withTimeout(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "24SIETE <hola@24sietealfajor.com.ar>",
          to: ["info@24sietealfajor.com.ar"],
          subject: `Nuevo registro — ${nombreCompleto}`.trim(),
          html: `
            <div style="margin:0; padding:32px 16px; background:#f4f4f5;">
              <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:14px; box-shadow:0 1px 6px rgba(0,0,0,0.06); overflow:hidden; font-family:Arial, Helvetica, sans-serif; color:#111827;">
                
                <div style="height:4px; background:#0FFF1E;"></div>

                <div style="padding:28px 28px 20px 28px;">
                  <div style="font-size:28px; line-height:1.2; font-weight:700; color:#111827; margin:0 0 8px 0;">
                    Nuevo registro
                  </div>

                  <div style="font-size:14px; line-height:1.5; color:#6b7280; margin:0;">
                    ${fecha} hs
                  </div>
                </div>

                <div style="padding:0 28px;">
                  <div style="height:1px; background:#e5e7eb;"></div>
                </div>

                <div style="padding:24px 28px 24px 28px;">
                  
                  <div style="margin:0 0 20px 0;">
                    <div style="font-size:13px; line-height:1.4; color:#6b7280; margin:0 0 6px 0;">
                      Nombre completo
                    </div>
                    <div style="font-size:22px; line-height:1.3; font-weight:700; color:#111827; margin:0;">
                      ${nombreCompleto}
                    </div>
                  </div>

                  <div style="margin:0;">
                    <div style="font-size:13px; line-height:1.4; color:#6b7280; margin:0 0 6px 0;">
                      Email
                    </div>
                    <div style="margin:0;">
                      <a href="mailto:${emailStr}" style="font-size:18px; line-height:1.4; font-weight:600; color:#111827; text-decoration:none;">
                        ${emailStr}
                      </a>
                    </div>
                  </div>

                </div>

                <div style="padding:0 28px;">
                  <div style="height:1px; background:#e5e7eb;"></div>
                </div>

                <div style="padding:18px 28px 24px 28px;">
                  <div style="font-size:12px; line-height:1.6; color:#6b7280;">
                    <div><strong style="color:#374151;">Origen:</strong> formulario web 24SIETE</div>
                    <div><strong style="color:#374151;">Dominio:</strong> alfajor24siete.com.ar</div>
                  </div>
                </div>

              </div>
            </div>
          `,
        }),
      }),
      5000
    )

    if (!resendRes.ok) {
      const err = await resendRes.json().catch(() => null)
      console.error("Resend error:", err)
      return NextResponse.json({ error: "Error al enviar el mail" }, { status: 500 })
    }

    withTimeout(
      fetch(SHEETS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email: emailStr,
        }),
      }),
      2500
    ).catch(async (err) => {
      console.error("Sheets async error:", err)
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Subscribe error:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}