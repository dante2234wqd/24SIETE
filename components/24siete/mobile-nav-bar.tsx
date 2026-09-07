"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { NavBarItem, NavKey } from "./nav-bar"
import LogoMusicButton from "./logo-music-button"

interface MobileNavBarProps {
  items: NavBarItem[]
  activeKey: NavKey
  ctaHref?: string
}

export const MOBILE_NAV_BAR_HEIGHT = 64

function ActivateButton({ href, onClick, small }: { href: string; onClick?: () => void; small?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#39ff14",
        borderRadius: 8,
        border: "2px solid #110f10",
        boxShadow: "2px 2px 0px #110f10",
        padding: small ? "7px 14px" : "9px 18px",
        transform: "rotate(-1.8deg)",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
          fontWeight: 900,
          fontSize: small ? 12 : 13,
          letterSpacing: "0.06em",
          color: "#110f10",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        ACTIVATE
      </span>
    </Link>
  )
}

export default function MobileNavBar({ items, activeKey, ctaHref = "/activate" }: MobileNavBarProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header
        style={{
          animation: "stage-fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) backwards",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: MOBILE_NAV_BAR_HEIGHT,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 100,
          boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
              width: 30,
              height: 30,
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <span style={{ display: "block", width: 26, height: 3, background: "#110f10", borderRadius: 2 }} />
            <span style={{ display: "block", width: 26, height: 3, background: "#110f10", borderRadius: 2 }} />
            <span style={{ display: "block", width: 26, height: 3, background: "#110f10", borderRadius: 2 }} />
          </button>

          <LogoMusicButton style={{ width: 34, height: 34 }} compact />
        </div>

        <ActivateButton href={ctaHref} small />
      </header>

      {/* espaciador para que el contenido no quede debajo de la barra fija */}
      <div style={{ height: MOBILE_NAV_BAR_HEIGHT }} />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "#110f10",
          display: "flex",
          flexDirection: "column",
          padding: "16px 20px",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: MOBILE_NAV_BAR_HEIGHT - 16,
          }}
        >
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#e5e5e5",
              border: "none",
              cursor: "pointer",
              fontSize: 20,
              lineHeight: 1,
              color: "#110f10",
            }}
          >
            ✕
          </button>

          <ActivateButton href={ctaHref} onClick={() => setOpen(false)} small />
        </div>

        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 22,
          }}
        >
          {[...items, { label: "ACTIVATE", key: "activate" as NavKey, href: ctaHref }].map(({ label, key, href }) => {
            const isMarked = activeKey === key
            return (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.1rem, 11vw, 3rem)",
                  lineHeight: 1.05,
                  letterSpacing: "0.01em",
                  color: isMarked ? "#39ff14" : "#fff",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
