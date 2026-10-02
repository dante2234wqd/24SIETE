"use client"

import Link from "next/link"
import { useState } from "react"

// Link chico (tipo texto legal) a la política de privacidad. Lo usan la barra
// de navegación de desktop (sobre el blanco de la pincelada → tone "dark") y
// el menú desplegable de mobile (sobre el fondo oscuro → tone "light").
export default function PrivacyLink({
  tone,
  fontSize,
  onClick,
}: {
  tone: "dark" | "light"
  fontSize: number
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href="/privacidad"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
        fontWeight: 700,
        fontSize,
        lineHeight: 1.2,
        color: tone === "dark" ? "rgba(17,15,16,0.65)" : "rgba(255,255,255,0.65)",
        textDecoration: hovered ? "underline" : "none",
        textUnderlineOffset: 3,
        whiteSpace: "nowrap",
      }}
    >
      Política de privacidad
    </Link>
  )
}
