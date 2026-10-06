"use client"

import Link from "next/link"
import { useState } from "react"
import PrivacyLink from "./privacy-link"

export type NavKey = "yo-soy-24siete" | "donde-estamos" | "faqs" | "activate"

export interface NavBarItem {
  label: string
  key: NavKey
  href: string
}

interface NavBarProps {
  items: NavBarItem[]
  activeKey: NavKey
  ctaHref?: string
  style?: React.CSSProperties
  scale?: number
}

export default function NavBar({ items, activeKey, ctaHref = "/activate", style, scale = 1 }: NavBarProps) {
  const [hoveredKey, setHoveredKey] = useState<NavKey | null>(null)

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 36 * scale, ...style }}>
      {items.map(({ label, key, href }) => {
        const isMarked = activeKey === key || hoveredKey === key
        return (
          <Link
            key={key}
            href={href}
            style={{
              fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
              fontWeight: 700,
              fontSize: 13 * scale,
              letterSpacing: "0.06em",
              color: "#1f140f",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
              opacity: 0.85,
              paddingBottom: 4,
              borderBottom: `2px solid ${isMarked ? "#42ab0c" : "transparent"}`,
              transition: "border-color 0.18s ease",
            }}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
          >
            {label}
          </Link>
        )
      })}

      <Link
        href={ctaHref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#42ab0c",
          borderRadius: 10,
          border: "2.5px solid #1f140f",
          boxShadow: "3px 3px 0px #1f140f",
          padding: `${8 * scale}px ${22 * scale}px`,
          transform: "rotate(-1.8deg)",
          textDecoration: "none",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.transform = "rotate(-1.8deg) scale(1.04)"
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = "5px 5px 0px #1f140f"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.transform = "rotate(-1.8deg) scale(1)"
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = "3px 3px 0px #1f140f"
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
            fontWeight: 900,
            fontSize: 15 * scale,
            letterSpacing: "1.06em",
            color: "#1f140f",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          ACTIVATE
        </span>
      </Link>

      {/* debajo de "YO SOY 24SIETE", alineado a su borde izquierdo; absoluto
          para no cambiar el alto de la barra ni mover ningún item */}
      <div style={{ position: "absolute", left: 0, top: "100%", marginTop: 8 * scale, display: "flex" }}>
        <PrivacyLink tone="dark" fontSize={10 * scale} />
      </div>
    </div>
  )
}
