"use client"

import Link from "next/link"
import { useState } from "react"

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
    <div style={{ display: "flex", alignItems: "center", gap: 36 * scale, ...style }}>
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
              color: "#110f10",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
              opacity: 0.85,
              paddingBottom: 4,
              borderBottom: `2px solid ${isMarked ? "#39ff14" : "transparent"}`,
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
          background: "#39ff14",
          borderRadius: 10,
          border: "2.5px solid #110f10",
          boxShadow: "3px 3px 0px #110f10",
          padding: `${8 * scale}px ${22 * scale}px`,
          transform: "rotate(-1.8deg)",
          textDecoration: "none",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.transform = "rotate(-1.8deg) scale(1.04)"
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = "5px 5px 0px #110f10"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.transform = "rotate(-1.8deg) scale(1)"
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = "3px 3px 0px #110f10"
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
            fontWeight: 900,
            fontSize: 15 * scale,
            letterSpacing: "1.06em",
            color: "#110f10",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          ACTIVATE
        </span>
      </Link>
    </div>
  )
}
