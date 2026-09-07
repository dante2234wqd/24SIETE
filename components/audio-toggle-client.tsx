"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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

export default function AudioToggleClient() {
  const [audioOn, setAudioOn] = useState(false)
  const [greeting, setGreeting] = useState("")
  const [pillVisible, setPillVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setGreeting(getTimeGreeting())

    if (audioRef.current) {
      audioRef.current.volume = 0.4
    }

    const t = window.setTimeout(() => setPillVisible(true), 500)
    return () => window.clearTimeout(t)
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audioOn) {
      audio.pause()
      setAudioOn(false)
      return
    }

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

  return (
    <>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={toggleAudio}
          aria-label={audioOn ? "Pausar música" : "Activar música"}
          className="logo-btn relative shrink-0 cursor-pointer bg-transparent border-none p-0"
          style={{ width: "clamp(48px, 6vw, 90px)", height: "clamp(48px, 6vw, 90px)" }}
        >
          <Image
            src="/assets/favicon-03.svg"
            alt="Logo 24SIETE"
            fill
            sizes="90px"
            className="object-contain"
            priority
          />
        </button>

        <div className="audio-pill-wrap">
          {greeting && (
            <div
              className={`audio-pill flex items-center gap-2 px-3 py-1.5 rounded-full bg-white ${
                pillVisible ? "audio-pill-visible" : "audio-pill-hidden"
              }`}
              style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.3)" }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0FFF1E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>

              <span
                style={{
                  fontFamily: 'var(--font-grold-rounded), sans-serif',
                  fontSize: "clamp(11px, 0.9vw, 13px)",
                  color: "#111",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.02em",
                }}
              >
                {greeting}
              </span>
            </div>
          )}
        </div>

        <div
          className={`flex items-end gap-[3px] ${audioOn ? "bars-active" : "bars-paused"}`}
          style={{
            height: "clamp(14px, 1.6vw, 22px)",
            opacity: audioOn ? 1 : 0.28,
            transition: "opacity 0.4s ease",
          }}
        >
          <span className="bar bar1" style={{ height: "100%" }} />
          <span className="bar bar2" style={{ height: "70%" }} />
          <span className="bar bar3" style={{ height: "90%" }} />
          <span className="bar bar4" style={{ height: "55%" }} />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={getAudioSrc()}
        loop
        preload="none"
        style={{ display: "none" }}
        onError={(e) => console.warn("Audio load error:", e)}
      />
    </>
  )
}