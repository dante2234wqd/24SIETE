"use client"

import Image from "next/image"
import { FormEvent, useState } from "react"

type SubscribeFormClientProps = {
  mobile?: boolean
}

export default function SubscribeFormClient({
  mobile = false,
}: SubscribeFormClientProps) {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const handleEmailChange = (val: string) => {
    setEmail(val)
    setEmailError(val && !validateEmail(val) ? "Mail inválido — revisá que tenga @ y dominio" : "")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!nombre.trim()) {
      setError("El nombre es requerido.")
      return
    }

    if (!email.trim() || !validateEmail(email)) {
      setEmailError("Mail inválido — revisá que tenga @ y dominio")
      return
    }

    setSending(true)
    setError("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.ok) {
        setSubmitted(true)
        setNombre("")
        setApellido("")
        setEmail("")
        setEmailError("")
      } else {
        setError(data?.error || "Algo salió mal, intentá de nuevo.")
      }
    } catch {
      setError("Algo salió mal, intentá de nuevo.")
    } finally {
      setSending(false)
    }
  }

  if (mobile) {
    return (
      <div style={{ width: "100%" }} className="mobile-no-anim">
        {submitted ? (
          <div
            className="w-full flex items-center gap-3 px-5"
            style={{ height: 54, borderRadius: 999, backgroundColor: "#0FFF1E" }}
          >
            <Image src="/assets/check_mail.svg" alt="check" width={22} height={22} />
            <span
              style={{
                fontFamily: 'var(--font-grold-rounded), sans-serif',
                fontSize: 15,
                letterSpacing: "-0.03em",
                color: "#000",
                fontWeight: 500,
              }}
            >
              ¡Tu mail nos llegó con éxito!
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre *"
                className="flex-1 bg-white outline-none border-none"
                style={{
                  borderRadius: 999,
                  height: 48,
                  paddingLeft: 16,
                  fontFamily: 'var(--font-grold-rounded), sans-serif',
                  fontSize: 15,
                  letterSpacing: "-0.03em",
                  color: "#444",
                }}
              />
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido"
                className="flex-1 bg-white outline-none border-none"
                style={{
                  borderRadius: 999,
                  height: 48,
                  paddingLeft: 16,
                  fontFamily: 'var(--font-grold-rounded), sans-serif',
                  fontSize: 15,
                  letterSpacing: "-0.03em",
                  color: "#444",
                }}
              />
            </div>

            <div
              className="w-full bg-white flex items-center overflow-hidden"
              style={{ borderRadius: 999, height: 54, border: emailError ? "2px solid #ff4444" : "2px solid transparent" }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Y tu mail?... dejalo aca"
                className="flex-1 h-full bg-transparent outline-none border-none"
                style={{
                  paddingLeft: 18,
                  paddingRight: 8,
                  fontFamily: 'var(--font-grold-rounded), sans-serif',
                  fontSize: 16,
                  letterSpacing: "-0.03em",
                  color: "#787878",
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                disabled={sending}
                className="btn-enviar shrink-0 h-full border-none cursor-pointer flex items-center justify-center"
                style={{
                  width: 110,
                  borderRadius: 999,
                  backgroundColor: "#0FFF1E",
                  fontFamily: 'var(--font-grold-rounded), sans-serif',
                  fontSize: 15,
                  letterSpacing: "-0.03em",
                  color: "#000",
                  whiteSpace: "nowrap",
                  opacity: sending ? 0.7 : 1,
                }}
              >
                {sending ? "..." : "ENVIAR"}
              </button>
            </div>

            {emailError && (
              <p style={{ color: "#ff4444", fontSize: 12, fontFamily: 'var(--font-grold-rounded), sans-serif', margin: 0, paddingLeft: 16 }}>
                {emailError}
              </p>
            )}

            {error && (
              <p style={{ color: "#ff4444", fontSize: 12, fontFamily: 'var(--font-grold-rounded), sans-serif', margin: 0, paddingLeft: 16 }}>
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 620 }} className="w-full fade-up-soft fade-delay-1">
      {submitted ? (
        <div
          className="flex items-center gap-3 px-6"
          style={{
            maxWidth: 620,
            height: "clamp(52px, 5.5vw, 76px)",
            borderRadius: 999,
            backgroundColor: "#0FFF1E",
          }}
        >
          <Image src="/assets/check_mail.svg" alt="check" width={24} height={24} />
          <span
            style={{
              fontFamily: 'var(--font-grold-rounded), sans-serif',
              fontSize: "clamp(13px, 1.4vw, 20px)",
              letterSpacing: "-0.03em",
              color: "#000",
              fontWeight: 500,
            }}
          >
            ¡Tu mail nos llegó con éxito!
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: 620, width: "100%" }}>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre *"
              className="flex-1 bg-white outline-none border-none"
              style={{
                borderRadius: 999,
                height: "clamp(40px, 4vw, 56px)",
                paddingLeft: "clamp(14px, 1.5vw, 24px)",
                fontFamily: 'var(--font-grold-rounded), sans-serif',
                fontSize: "clamp(12px, 1.2vw, 18px)",
                letterSpacing: "-0.03em",
                color: "#444",
              }}
            />
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Apellido (opcional)"
              className="flex-1 bg-white outline-none border-none"
              style={{
                borderRadius: 999,
                height: "clamp(40px, 4vw, 56px)",
                paddingLeft: "clamp(14px, 1.5vw, 24px)",
                fontFamily: 'var(--font-grold-rounded), sans-serif',
                fontSize: "clamp(12px, 1.2vw, 18px)",
                letterSpacing: "-0.03em",
                color: "#444",
              }}
            />
          </div>

          <div
            className="w-full bg-white flex items-center overflow-hidden"
            style={{
              borderRadius: 999,
              height: "clamp(52px, 5.5vw, 76px)",
              border: emailError ? "2px solid #ff4444" : "2px solid transparent",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Y tu mail?... dejalo aca"
              className="flex-1 h-full bg-transparent outline-none border-none"
              style={{
                paddingLeft: "clamp(16px, 2vw, 32px)",
                paddingRight: 8,
                fontFamily: 'var(--font-grold-rounded), sans-serif',
                fontSize: "clamp(13px, 1.4vw, 22px)",
                letterSpacing: "-0.03em",
                color: "#787878",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              disabled={sending}
              className="btn-enviar shrink-0 h-full border-none cursor-pointer flex items-center justify-center"
              style={{
                width: "clamp(90px, 11vw, 175px)",
                borderRadius: 999,
                backgroundColor: "#0FFF1E",
                fontFamily: 'var(--font-grold-rounded), sans-serif',
                fontSize: "clamp(13px, 1.4vw, 22px)",
                letterSpacing: "-0.03em",
                color: "#000",
                whiteSpace: "nowrap",
                opacity: sending ? 0.7 : 1,
              }}
            >
              {sending ? "..." : "ENVIAR"}
            </button>
          </div>

          {emailError && (
            <p
              style={{
                color: "#ff4444",
                fontSize: "clamp(11px, 0.9vw, 13px)",
                fontFamily: 'var(--font-grold-rounded), sans-serif',
                marginTop: 6,
                paddingLeft: 16,
              }}
            >
              {emailError}
            </p>
          )}

          {error && (
            <p
              style={{
                color: "#ff4444",
                fontSize: "clamp(11px, 0.9vw, 13px)",
                fontFamily: 'var(--font-grold-rounded), sans-serif',
                marginTop: 6,
                paddingLeft: 16,
              }}
            >
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  )
}