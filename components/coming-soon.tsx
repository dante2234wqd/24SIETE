"use client"

import Image from "next/image"
import { FormEvent, useEffect, useRef, useState } from "react"

function getTimeGreeting(): string {
  const h = new Date().getHours()
  if (h >= 0 && h < 6) return "Activá el audio y conocé 24SIETE para la madrugada"
  if (h >= 6 && h < 12) return "Activá el audio y conocé 24SIETE para arrancar el día"
  if (h >= 12 && h < 19) return "Activá el audio y conocé 24SIETE para la tarde"
  return "Activá el audio y conocé 24SIETE para la noche"
}

function getAudioSrc(): string {
  const h = new Date().getHours()
  if (h >= 0 && h < 6) return "/audio/madrugada.mp3"
  if (h >= 6 && h < 12) return "/audio/manana.mp3"
  if (h >= 12 && h < 19) return "/audio/tarde.mp3"
  return "/audio/noche.mp3"
}

export default function ComingSoon() {
  const [nombre,      setNombre]      = useState("")
  const [apellido,    setApellido]    = useState("")
  const [email,       setEmail]       = useState("")
  const [emailError,  setEmailError]  = useState("")
  const [mounted,     setMounted]     = useState(false)
  const [audioOn,     setAudioOn]     = useState(false)
  const [greeting,    setGreeting]    = useState("")
  const [pillVisible, setPillVisible] = useState(false)
  const [sending,     setSending]     = useState(false)
  const [submitted,   setSubmitted]   = useState(false)
  const [error,       setError]       = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const t  = setTimeout(() => setMounted(true), 60)
    setGreeting(getTimeGreeting())
    if (audioRef.current) audioRef.current.volume = 0.4
    const t2 = setTimeout(() => setPillVisible(true), 800)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audioOn) {
      audio.pause()
      setAudioOn(false)
    } else {
      const p = audio.play()
      if (p !== undefined) {
        p.then(() => setAudioOn(true)).catch((err) => {
          console.warn("Audio play blocked:", err)
          setAudioOn(false)
        })
      } else {
        setAudioOn(true)
      }
    }
  }

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const handleEmailChange = (val: string) => {
    setEmail(val)
    setEmailError(val && !validateEmail(val) ? "Mail inválido — revisá que tenga @ y dominio" : "")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!nombre.trim()) { setError("El nombre es requerido."); return }
    if (!email.trim() || !validateEmail(email)) { setEmailError("Mail inválido — revisá que tenga @ y dominio"); return }
    setSending(true)
    setError("")
    try {
      const res  = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.ok) {
        setSubmitted(true)
        setNombre(""); setApellido(""); setEmail(""); setEmailError("")
      } else {
        setError(data?.error || "Algo salió mal, intentá de nuevo.")
      }
    } catch {
      setError("Algo salió mal, intentá de nuevo.")
    } finally {
      setSending(false)
    }
  }

  const anim = (delay: number, extraY = 22): React.CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? "translateY(0px)" : `translateY(${extraY}px)`,
    transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  })

  return (
    <>
      <style>{`
        .dot { color: #0FFF1E; display: inline-block; }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: translateY(0px); }
          50% { opacity: 0.15; transform: translateY(-3px); }
        }
        .dot1 { animation: dotPulse 1.6s ease-in-out infinite 0s; }
        .dot2 { animation: dotPulse 1.6s ease-in-out infinite 0.27s; }
        .dot3 { animation: dotPulse 1.6s ease-in-out infinite 0.54s; }
        @keyframes barBounce {
          0%, 100% { transform: scaleY(0.25); }
          50% { transform: scaleY(1); }
        }
        .bar { display: inline-block; width: 3px; border-radius: 3px; background: #0FFF1E; transform-origin: bottom; }
        .bars-active .bar1 { animation: barBounce 0.65s ease-in-out infinite 0s; }
        .bars-active .bar2 { animation: barBounce 0.65s ease-in-out infinite 0.16s; }
        .bars-active .bar3 { animation: barBounce 0.65s ease-in-out infinite 0.32s; }
        .bars-active .bar4 { animation: barBounce 0.65s ease-in-out infinite 0.48s; }
        .bars-paused .bar { transform: scaleY(0.45); }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.88) translateY(18px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .product-anim { animation: scaleIn 0.75s cubic-bezier(0.22,1,0.36,1) 480ms both; }
        .logo-btn { transition: transform 0.22s ease, filter 0.22s ease; }
        .logo-btn:hover  { transform: scale(1.07); filter: drop-shadow(0 0 10px rgba(15,255,30,0.55)); }
        .logo-btn:active { transform: scale(0.96); }
        .audio-pill { position: relative; transition: opacity 0.45s ease, transform 0.45s ease; }
        .audio-pill::before {
          content: ''; position: absolute; left: -7px; top: 50%; transform: translateY(-50%);
          border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-right: 7px solid white;
        }
        .audio-pill-visible { opacity: 1; transform: translateX(0) scale(1); }
        .audio-pill-hidden  { opacity: 0; transform: translateX(-8px) scale(0.95); pointer-events: none; }
        .social-icon { transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .social-icon:hover, .social-icon:focus-visible {
          background-color: #0FFF1E !important;
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 6px 20px rgba(15,255,30,0.35);
          outline: none;
        }
        .social-label { transition: color 0.2s ease; cursor: default; }
        .social-label:hover { color: #0FFF1E; }
        .btn-enviar { transition: background-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease; }
        .btn-enviar:hover  { background-color: #00e619 !important; transform: scale(1.03); box-shadow: 0 4px 18px rgba(15,255,30,0.4); }
        .btn-enviar:active { transform: scale(0.97); }
      `}</style>

      <main className="relative w-full min-h-[100dvh] overflow-x-hidden bg-black text-white">

        <Image
          src="/assets/background_proximamente.webp"
          alt="Background 24SIETE"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />

        <div className="relative z-10 w-full max-w-[1512px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col py-5 md:py-6 min-h-[100dvh]">

          {/* Header */}
          <div className="flex items-center gap-3 shrink-0" style={anim(0, 12)}>
            <button
              onClick={toggleAudio}
              aria-label={audioOn ? "Pausar música" : "Activar música"}
              className="logo-btn relative shrink-0 cursor-pointer bg-transparent border-none p-0"
              style={{ width: "clamp(48px, 6vw, 90px)", height: "clamp(48px, 6vw, 90px)" }}
            >
              <Image src="/assets/logo_24SIETE.svg" alt="Logo 24SIETE" fill className="object-contain" />
            </button>

            {greeting && (
              <div
                className={`audio-pill flex items-center gap-2 px-3 py-1.5 rounded-full bg-white ${pillVisible ? "audio-pill-visible" : "audio-pill-hidden"}`}
                style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.3)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0FFF1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                </svg>
                <span style={{ fontFamily: '"Grold Rounded", sans-serif', fontSize: "clamp(11px, 0.9vw, 13px)", color: "#111", whiteSpace: "nowrap", letterSpacing: "-0.02em" }}>
                  {greeting}
                </span>
              </div>
            )}

            <div
              className={`flex items-end gap-[3px] ${audioOn ? "bars-active" : "bars-paused"}`}
              style={{ height: "clamp(14px, 1.6vw, 22px)", opacity: mounted ? (audioOn ? 1 : 0.28) : 0, transition: "opacity 0.4s ease" }}
            >
              <span className="bar bar1" style={{ height: "100%" }} />
              <span className="bar bar2" style={{ height: "70%" }} />
              <span className="bar bar3" style={{ height: "90%" }} />
              <span className="bar bar4" style={{ height: "55%" }} />
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex flex-1 items-center">
            <div className="w-full grid md:grid-cols-[1fr_auto] gap-6 md:gap-4 items-center">
              <div className="flex flex-col items-start gap-4 md:gap-5">

                <div style={anim(130)}>
                  <h1 className="text-white" style={{ fontFamily: '"Cubano", "Arial Black", Impact, sans-serif', fontWeight: 400, fontSize: "clamp(36px, 5.5vw, 86px)", lineHeight: "108%", letterSpacing: "-0.03em", margin: 0 }}>
                    CUANDO LO PRUEBES<span className="dot dot1">.</span><span className="dot dot2">.</span><span className="dot dot3">.</span>
                    <br />LO VAS A ENTENDER.
                  </h1>
                </div>

                <div style={anim(230)}>
                  <p style={{ fontFamily: '"Grold Rounded", sans-serif', fontWeight: 400, fontSize: "clamp(15px, 1.8vw, 32px)", lineHeight: "106%", letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
                    Dejanos tu mail y enterate primero<br />
                    cuando llegue{" "}<span style={{ color: "#0FFF1E", fontFamily: '"Cubano", "Arial Black", Impact, sans-serif' }}>24SIETE.</span>
                  </p>
                </div>

                <div style={{ ...anim(330), maxWidth: 620 }} className="w-full">
                  {submitted ? (
                    <div className="flex items-center gap-3 px-6" style={{ maxWidth: 620, height: "clamp(52px, 5.5vw, 76px)", borderRadius: 999, backgroundColor: "#0FFF1E" }}>
                      <Image src="/assets/check_mail.svg" alt="check" width={24} height={24} />
                      <span style={{ fontFamily: '"Grold Rounded", sans-serif', fontSize: "clamp(13px, 1.4vw, 20px)", letterSpacing: "-0.03em", color: "#000", fontWeight: 500 }}>
                        ¡Tu mail nos llegó con éxito!
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ maxWidth: 620, width: "100%" }}>
                      <div className="flex gap-2 mb-2">
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre *" className="flex-1 bg-white outline-none border-none"
                          style={{ borderRadius: 999, height: "clamp(40px, 4vw, 56px)", paddingLeft: "clamp(14px, 1.5vw, 24px)", fontFamily: '"Grold Rounded", sans-serif', fontSize: "clamp(12px, 1.2vw, 18px)", letterSpacing: "-0.03em", color: "#444" }}
                        />
                        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido (opcional)" className="flex-1 bg-white outline-none border-none"
                          style={{ borderRadius: 999, height: "clamp(40px, 4vw, 56px)", paddingLeft: "clamp(14px, 1.5vw, 24px)", fontFamily: '"Grold Rounded", sans-serif', fontSize: "clamp(12px, 1.2vw, 18px)", letterSpacing: "-0.03em", color: "#444" }}
                        />
                      </div>
                      <div className="w-full bg-white flex items-center overflow-hidden" style={{ borderRadius: 999, height: "clamp(52px, 5.5vw, 76px)", border: emailError ? "2px solid #ff4444" : "2px solid transparent" }}>
                        <input type="email" value={email} onChange={(e) => handleEmailChange(e.target.value)} placeholder="Y tu mail?... dejalo aca" className="flex-1 h-full bg-transparent outline-none border-none"
                          style={{ paddingLeft: "clamp(16px, 2vw, 32px)", paddingRight: 8, fontFamily: '"Grold Rounded", sans-serif', fontSize: "clamp(13px, 1.4vw, 22px)", letterSpacing: "-0.03em", color: "#787878", minWidth: 0 }}
                        />
                        <button type="submit" disabled={sending} className="btn-enviar shrink-0 h-full border-none cursor-pointer flex items-center justify-center"
                          style={{ width: "clamp(90px, 11vw, 175px)", borderRadius: 999, backgroundColor: "#0FFF1E", fontFamily: '"Grold Rounded", sans-serif', fontSize: "clamp(13px, 1.4vw, 22px)", letterSpacing: "-0.03em", color: "#000", whiteSpace: "nowrap", opacity: sending ? 0.7 : 1 }}>
                          {sending ? "..." : "ENVIAR"}
                        </button>
                      </div>
                      {emailError && <p style={{ color: "#ff4444", fontSize: "clamp(11px, 0.9vw, 13px)", fontFamily: '"Grold Rounded", sans-serif', marginTop: 6, paddingLeft: 16 }}>{emailError}</p>}
                      {error     && <p style={{ color: "#ff4444", fontSize: "clamp(11px, 0.9vw, 13px)", fontFamily: '"Grold Rounded", sans-serif', marginTop: 6, paddingLeft: 16 }}>{error}</p>}
                    </form>
                  )}
                </div>

                <div style={anim(430)} className="flex flex-col items-start gap-2">
                  <span className="social-label" style={{ fontFamily: '"Grold Rounded", sans-serif', fontSize: "clamp(14px, 1.3vw, 22px)", letterSpacing: "-0.03em", color: "#fff" }}>Seguinos...</span>
                  <div className="flex items-center gap-3">
                    <a href="https://www.tiktok.com/@24sietealfajores" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-icon flex items-center justify-center rounded-full bg-white" style={{ width: "clamp(36px, 3.2vw, 50px)", height: "clamp(36px, 3.2vw, 50px)" }}>
                      <Image src="/assets/logo_tiktok.svg" alt="TikTok" width={20} height={20} />
                    </a>
                    <a href="https://www.instagram.com/24sietealfajores/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon flex items-center justify-center rounded-full bg-white" style={{ width: "clamp(36px, 3.2vw, 50px)", height: "clamp(36px, 3.2vw, 50px)" }}>
                      <Image src="/assets/logo_instagram.svg" alt="Instagram" width={20} height={20} />
                    </a>
                    <a href="https://www.youtube.com/@24SieteAlfajores" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon flex items-center justify-center rounded-full bg-white" style={{ width: "clamp(36px, 3.2vw, 50px)", height: "clamp(36px, 3.2vw, 50px)" }}>
                      <Image src="/assets/logo_youtube.svg" alt="YouTube" width={20} height={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="product-anim" style={{ width: "clamp(280px, 28vw, 490px)", height: "clamp(280px, 28vw, 590px)", position: "relative", flexShrink: 0 }}>
                <div className="absolute z-20 flex items-center justify-center"
                  style={{ top: "8%", left: "10%", transform: "rotate(-3deg)", backgroundColor: "#0FFF1E", borderRadius: 8, border: "2px solid #000", boxShadow: "3px 3px 0px #000", padding: "clamp(6px, 0.6vw, 12px) clamp(12px, 1.2vw, 20px)" }}>
                  <span style={{ fontFamily: '"Grold Rounded", sans-serif', fontWeight: 450, fontSize: "clamp(13px, 1.2vw, 22px)", letterSpacing: "-0.04em", color: "#000", whiteSpace: "nowrap" }}>Proximamente...</span>
                </div>
                <Image src="/assets/PRODUCTO.webp" alt="Alfajor 24SIETE" fill priority sizes="(max-width: 768px) 72vw, 35vw" className="object-contain object-bottom" />
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="flex md:hidden flex-col items-center gap-5 pt-5 pb-16">

            <div style={anim(90, 14)}>
              <div className="inline-flex items-center justify-center px-5 py-2"
                style={{ transform: "rotate(-3deg)", backgroundColor: "#0FFF1E", borderRadius: 8, border: "2px solid #000", boxShadow: "3px 3px 0px #000" }}>
                <span style={{ fontFamily: '"Grold Rounded", sans-serif', fontWeight: 450, fontSize: 17, letterSpacing: "-0.04em", color: "#000", whiteSpace: "nowrap" }}>Proximamente...</span>
              </div>
            </div>

            <div style={anim(160, 20)} className="w-full">
              <h1 className="text-white text-left" style={{ fontFamily: '"Cubano", "Arial Black", Impact, sans-serif', fontWeight: 400, fontSize: "clamp(34px, 9vw, 54px)", lineHeight: "105%", letterSpacing: "-0.03em", margin: 0, paddingLeft: "4vw" }}>
                CUANDO LO PRUEBES<span className="dot dot1">.</span><span className="dot dot2">.</span><span className="dot dot3">.</span>
                <br />LO VAS A ENTENDER.
              </h1>
            </div>

            <div style={{ ...anim(250, 10), width: "min(72vw, 280px)", height: "min(72vw, 280px)", position: "relative" }}>
              <Image src="/assets/PRODUCTO.webp" alt="Alfajor 24SIETE" fill priority sizes="72vw" className="object-contain" />
            </div>

            <div style={anim(330, 14)} className="w-full text-center">
              <p style={{ fontFamily: '"Grold Rounded", sans-serif', fontWeight: 400, fontSize: "clamp(15px, 4.5vw, 20px)", lineHeight: "110%", letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
                Dejanos tu mail y enterate primero<br />
                cuando llegue{" "}<span style={{ color: "#0FFF1E", fontFamily: '"Cubano", "Arial Black", Impact, sans-serif' }}>24SIETE.</span>
              </p>
            </div>

            <div style={{ ...anim(410, 14), width: "100%" }}>
              {submitted ? (
                <div className="w-full flex items-center gap-3 px-5" style={{ height: 54, borderRadius: 999, backgroundColor: "#0FFF1E" }}>
                  <Image src="/assets/check_mail.svg" alt="check" width={22} height={22} />
                  <span style={{ fontFamily: '"Grold Rounded", sans-serif', fontSize: 15, letterSpacing: "-0.03em", color: "#000", fontWeight: 500 }}>¡Tu mail nos llegó con éxito!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="flex gap-2">
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre *" className="flex-1 bg-white outline-none border-none"
                      style={{ borderRadius: 999, height: 48, paddingLeft: 16, fontFamily: '"Grold Rounded", sans-serif', fontSize: 15, letterSpacing: "-0.03em", color: "#444" }}
                    />
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" className="flex-1 bg-white outline-none border-none"
                      style={{ borderRadius: 999, height: 48, paddingLeft: 16, fontFamily: '"Grold Rounded", sans-serif', fontSize: 15, letterSpacing: "-0.03em", color: "#444" }}
                    />
                  </div>
                  <div className="w-full bg-white flex items-center overflow-hidden" style={{ borderRadius: 999, height: 54, border: emailError ? "2px solid #ff4444" : "2px solid transparent" }}>
                    <input type="email" value={email} onChange={(e) => handleEmailChange(e.target.value)} placeholder="Y tu mail?... dejalo aca" className="flex-1 h-full bg-transparent outline-none border-none"
                      style={{ paddingLeft: 18, paddingRight: 8, fontFamily: '"Grold Rounded", sans-serif', fontSize: 16, letterSpacing: "-0.03em", color: "#787878", minWidth: 0 }}
                    />
                    <button type="submit" disabled={sending} className="btn-enviar shrink-0 h-full border-none cursor-pointer flex items-center justify-center"
                      style={{ width: 110, borderRadius: 999, backgroundColor: "#0FFF1E", fontFamily: '"Grold Rounded", sans-serif', fontSize: 15, letterSpacing: "-0.03em", color: "#000", whiteSpace: "nowrap", opacity: sending ? 0.7 : 1 }}>
                      {sending ? "..." : "ENVIAR"}
                    </button>
                  </div>
                  {emailError && <p style={{ color: "#ff4444", fontSize: 12, fontFamily: '"Grold Rounded", sans-serif', margin: 0, paddingLeft: 16 }}>{emailError}</p>}
                  {error     && <p style={{ color: "#ff4444", fontSize: 12, fontFamily: '"Grold Rounded", sans-serif', margin: 0, paddingLeft: 16 }}>{error}</p>}
                </form>
              )}
            </div>

            <div style={anim(490, 10)} className="flex flex-col items-center gap-2">
              <span className="social-label" style={{ fontFamily: '"Grold Rounded", sans-serif', fontSize: 18, letterSpacing: "-0.03em", color: "#fff" }}>Seguinos...</span>
              <div className="flex items-center gap-4">
                <a href="https://www.tiktok.com/@24sietealfajores" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-icon flex items-center justify-center rounded-full bg-white" style={{ width: 44, height: 44 }}>
                  <Image src="/assets/logo_tiktok.svg" alt="TikTok" width={20} height={20} />
                </a>
                <a href="https://www.instagram.com/24sietealfajores/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon flex items-center justify-center rounded-full bg-white" style={{ width: 44, height: 44 }}>
                  <Image src="/assets/logo_instagram.svg" alt="Instagram" width={20} height={20} />
                </a>
                <a href="https://www.youtube.com/@24SieteAlfajores" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon flex items-center justify-center rounded-full bg-white" style={{ width: 44, height: 44 }}>
                  <Image src="/assets/logo_youtube.svg" alt="YouTube" width={20} height={20} />
                </a>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="shrink-0 mt-auto pt-5 pb-4 text-center w-full" style={anim(570, 6)}>
            <span style={{ fontFamily: '"Grold Rounded", sans-serif', fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
              © 2026 24SIETE. Todos los derechos reservados.
            </span>
          </div>

        </div>

        <audio ref={audioRef} src={getAudioSrc()} loop preload="none" style={{ display: "none" }} onError={(e) => console.warn("Audio load error:", e)} />
      </main>
    </>
  )
}
