"use client"

import { useMusic } from "./music-provider"

const LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_24SIETE-763F9MXWDBGbgG9D9rB5eXlsyu8VUo.svg"

interface LogoMusicButtonProps {
  // estilo del contenedor: reemplaza el `style` que antes tenía el <img> del
  // logo (posición, tamaño, animación de entrada, z-index, etc.)
  style?: React.CSSProperties
  // dónde flota la pastilla respecto al logo: "right" cuando hay lugar al
  // costado, "bottom" cuando el logo está pegado a otro elemento (título)
  badgePosition?: "right" | "bottom"
  // pastilla más chica, pensada para la nav bar mobile
  compact?: boolean
}

export default function LogoMusicButton({ style, badgePosition = "right", compact = false }: LogoMusicButtonProps) {
  const { isPlaying, toggle } = useMusic()

  const label = isPlaying ? (compact ? "🔊 ON" : "🔊 SONANDO") : compact ? "🎵 MÚSICA" : "🎵 ACTIVÁ LA MÚSICA"

  const badgeStyle: React.CSSProperties =
    badgePosition === "right"
      ? { left: "100%", top: "50%", marginLeft: compact ? 6 : 10, transform: "translateY(-50%)" }
      : { left: "50%", top: "100%", marginTop: compact ? 6 : 10, transform: "translateX(-50%)" }

  return (
    <div style={{ position: "relative", ...style }}>
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pausar la música" : "Activar la música"}
        aria-pressed={isPlaying}
        style={{
          all: "unset",
          display: "block",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      >
        <img
          src={LOGO_URL}
          alt="24SIETE logo — activar/pausar música"
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      </button>

      <span
        style={{
          position: "absolute",
          ...badgeStyle,
          whiteSpace: "nowrap",
          background: "#39ff14",
          border: compact ? "1.5px solid #000" : "2px solid #000",
          borderRadius: 999,
          padding: compact ? "3px 8px" : "5px 12px",
          fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
          fontWeight: 900,
          fontSize: compact ? 9 : 12,
          letterSpacing: "0.02em",
          color: "#000",
          textTransform: "uppercase",
          boxShadow: compact ? "1.5px 1.5px 0 #000" : "2px 2px 0 #000",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {label}
      </span>
    </div>
  )
}
