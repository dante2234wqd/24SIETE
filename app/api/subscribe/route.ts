import { NextResponse } from "next/server"

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyb8QOIAd5TUxyb4tBusbGh-UY8DT-M8JUKfWxa8BBQKYQDias0uRbzJeTkU6aYtcAtJg/exec"

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

    const fecha = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
    })

    const resendPromise = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "24SIETE <hola@24sietealfajor.com.ar>",
        to: ["info@24sietealfajor.com.ar"],
        subject: `Nuevo registro — ${nombre} ${apellido || ""}`.trim(),
        html: `
          <div style="font-family: sans-serif; padding: 24px; background: #0a0a0a; color: #fff; border-radius: 8px;">
            <h2 style="color: #0FFF1E; margin: 0 0 16px;">Nuevo registro 🎯</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style="color: #888; padding: 6px 12px 6px 0; font-size: 13px;">Nombre</td>
                <td style="color: #fff; font-size: 16px;">${nombre}</td>
              </tr>
              ${
                apellido
                  ? `<tr>
                <td style="color: #888; padding: 6px 12px 6px 0; font-size: 13px;">Apellido</td>
                <td style="color: #fff; font-size: 16px;">${apellido}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="color: #888; padding: 6px 12px 6px 0; font-size: 13px;">Email</td>
                <td style="color: #0FFF1E; font-size: 16px;">${emailStr}</td>
              </tr>
              <tr>
                <td style="color: #888; padding: 6px 12px 6px 0; font-size: 13px;">Fecha</td>
                <td style="color: #fff; font-size: 14px;">${fecha}</td>
              </tr>
            </table>
            <p style="margin: 20px 0 0; color: #555; font-size: 12px;">Recibido desde alfajor24siete.com.ar</p>
          </div>
        `,
      }),
    })

    const sheetsPromise = fetch(SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        email: emailStr,
      }),
    })

    const [resendRes, sheetsRes] = await Promise.all([resendPromise, sheetsPromise])

    if (!resendRes.ok) {
      const err = await resendRes.json().catch(() => null)
      console.error("Resend error:", err)
      return NextResponse.json({ error: "Error al enviar el mail" }, { status: 500 })
    }

    if (!sheetsRes.ok) {
      const errText = await sheetsRes.text().catch(() => "")
      console.error("Sheets error:", errText)
      return NextResponse.json({ error: "Error al guardar en Google Sheets" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Subscribe error:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}