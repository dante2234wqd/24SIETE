import { NextResponse } from "next/server"
 
export async function POST(req: Request) {
  try {
    const { email } = await req.json()
 
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }
 
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "24SIETE <hola@24sietealfajor.com.ar>",
        to:   ["info@24sietealfajor.com.ar"],
        subject: "Nuevo registro — 24SIETE",
        html: `
          <div style="font-family: sans-serif; padding: 24px; background: #0a0a0a; color: #fff; border-radius: 8px;">
            <h2 style="color: #0FFF1E; margin: 0 0 12px;">Nuevo mail registrado 🎯</h2>
            <p style="margin: 0; font-size: 18px;">${email}</p>
            <p style="margin: 16px 0 0; color: #666; font-size: 13px;">Recibido desde alfajor24siete.com.ar</p>
          </div>
        `,
      }),
    })
 
    if (!res.ok) {
      const err = await res.json()
      console.error("Resend error:", err)
      return NextResponse.json({ error: "Error al enviar" }, { status: 500 })
    }
 
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Subscribe error:", err)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
 