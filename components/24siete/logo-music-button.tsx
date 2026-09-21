"use client"

import Link from "next/link"
import { useMusic } from "./music-provider"

const LOGO_URL = "/assets/favicon-03.svg"

interface LogoMusicButtonProps {
  // estilo del contenedor: reemplaza el `style` que antes tenía el <img> del
  // logo (posición, tamaño, animación de entrada, z-index, etc.)
  style?: React.CSSProperties
  // dónde flota la pastilla respecto al logo: "right" cuando hay lugar al
  // costado, "bottom" cuando el logo está pegado a otro elemento (título)
  badgePosition?: "right" | "bottom"
  // pastilla más chica, pensada para la nav bar mobile
  compact?: boolean
  // escala de la pastilla (para cuando el logo se dibuja fuera del stage escalado)
  scale?: number
}

// El logo es un link a la home. La música se activa/pausa desde la pastilla
// ("ACTIVÁ LA MÚSICA"), que es un botón aparte.
export default function LogoMusicButton({ style, badgePosition = "right", compact = false, scale = 1 }: LogoMusicButtonProps) {
  const { isPlaying, toggle } = useMusic()

  const label = isPlaying ? "🔊 SONANDO" : "🎵 ACTIVÁ LA MÚSICA"

  const gap = (compact ? 6 : 10) * scale
  const badgeStyle: React.CSSProperties =
    badgePosition === "right"
      ? { left: "100%", top: "50%", marginLeft: gap, transform: "translateY(-50%)" }
      : { left: "50%", top: "100%", marginTop: gap, transform: "translateX(-50%)" }

  return (
    <div style={{ position: "relative", ...style }}>
      <Link
        href="/landing"
        aria-label="24SIETE — ir al inicio"
        style={{ display: "block", width: "100%", height: "100%", cursor: "pointer" }}
      >
        <img
          src={LOGO_URL}
          alt="24SIETE"
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      </Link>

      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pausar la música" : "Activar la música"}
        aria-pressed={isPlaying}
        style={{
          position: "absolute",
          ...badgeStyle,
          whiteSpace: "nowrap",
          background: "#39ff14",
          border: `${(compact ? 1.5 : 2) * scale}px solid #110f10`,
          borderRadius: 999,
          padding: compact ? "3px 8px" : `${5 * scale}px ${12 * scale}px`,
          fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
          fontWeight: 900,
          fontSize: compact ? "clamp(7.5px, 2.4vw, 9px)" : 12 * scale,
          letterSpacing: "0.02em",
          color: "#110f10",
          textTransform: "uppercase",
          boxShadow: `${(compact ? 1.5 : 2) * scale}px ${(compact ? 1.5 : 2) * scale}px 0 #110f10`,
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        {label}
      </button>
    </div>
  )
}
