"use client"

import { useEffect, useState } from "react"
import NavBar, { type NavBarItem, type NavKey } from "./nav-bar"

// Barra de navegación inferior de desktop, para "¿Dónde estamos?", FAQs y
// Hablanos. Va FUERA del stage propio de cada página (que escala por
// min(ancho, alto) y puede dejar franjas arriba/abajo según el aspect ratio
// de la ventana): si la barra vivía adentro de ese stage, esas franjas la
// dejaban "flotando" lejos del fondo blanco real. Acá se ancla directo al
// viewport, con la MISMA fórmula de escala que el logo (ver desktop-logo.tsx)
// y las mismas coordenadas que usa la barra de la home — así las cuatro
// páginas quedan consistentes entre sí.
const HOME_STAGE_HEIGHT = 873
const NAV_SCALE_BOOST = 1.12 // un poco más grande que el tamaño "base" de la home

export default function DesktopBottomNav({
  items,
  activeKey,
  ctaHref = "/activate",
}: {
  items: NavBarItem[]
  activeKey: NavKey
  ctaHref?: string
}) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => setScale(window.innerHeight / HOME_STAGE_HEIGHT)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <div style={{ position: "absolute", left: 100 * scale, top: 800 * scale, zIndex: 9 }}>
      <NavBar items={items} activeKey={activeKey} ctaHref={ctaHref} scale={scale * NAV_SCALE_BOOST} />
    </div>
  )
}
