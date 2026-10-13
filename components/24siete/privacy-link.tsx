"use client"

import Link from "next/link"
import { useState } from "react"

// Línea legal chica: datos de la empresa + link a la política de privacidad.
// La usan la barra de navegación de desktop (sobre el blanco de la pincelada →
// tone "dark") y el menú desplegable de mobile (sobre el fondo oscuro → tone
// "light"). Solo "Política de privacidad" es el enlace.
export default function PrivacyLink({
  tone,
  fontSize,
  onClick,
  wrap = false,
}: {
  tone: "dark" | "light"
  fontSize: number
  onClick?: () => void
  /** permite que el texto ocupe varias líneas (mobile); en desktop va en una sola */
  wrap?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      data-legal
      style={{
        fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
        fontWeight: 700,
        fontSize,
        lineHeight: 1.2,
        color: tone === "dark" ? "rgba(31,20,15,0.65)" : "rgba(255,255,255,0.65)",
        whiteSpace: wrap ? "normal" : "nowrap",
        // en bloque para que mande su propio interlineado (1.2) y no el del contenedor
        display: "block",
      }}
    >
      24SIETE es una marca de CABLIER SA · Suipacha 976, piso 8, CABA ·{" "}
      <Link
        href="/privacidad"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          color: "inherit",
          textDecoration: hovered ? "underline" : "none",
          textUnderlineOffset: 3,
          whiteSpace: "nowrap",
        }}
      >
        Política de privacidad
      </Link>
    </span>
  )
}
