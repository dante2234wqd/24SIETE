"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

// 24SIETE = siempre hay una banda para el momento del día en el que estás.
// Elegimos el track según la hora local apenas arranca el audio.
function trackForNow(): string {
  const hour = new Date().getHours()
  if (hour < 6) return "/audio/madrugada.mp3"
  if (hour < 12) return "/audio/manana.mp3"
  if (hour < 19) return "/audio/tarde.mp3"
  return "/audio/noche.mp3"
}

interface MusicContextValue {
  isPlaying: boolean
  toggle: () => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

// Vive en el layout raíz para que el audio y el estado de play/pause
// persistan al navegar entre páginas (el provider no se remonta).
export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // El Audio se crea recién en el primer play: crearlo al montar (new Audio(src)
  // arranca con preload="auto") hacía que el mp3 (~1,4 MB) se descargara en
  // todas las páginas aunque nadie tocara "Activá la música".
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = () => {
    let audio = audioRef.current
    if (!audio) {
      audio = new Audio(trackForNow())
      audio.loop = true
      audio.volume = 0.5
      audioRef.current = audio
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  return <MusicContext.Provider value={{ isPlaying, toggle }}>{children}</MusicContext.Provider>
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error("useMusic debe usarse dentro de MusicProvider")
  return ctx
}
