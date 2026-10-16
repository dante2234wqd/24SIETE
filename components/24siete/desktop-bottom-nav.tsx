"use client"

import { useEffect, useRef, useState } from "react"
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
// misma altura que la barra de la home (landing-247-horizontal.tsx: top 760 de 873)
export const NAV_TOP = 760

// Pincelada blanca de estas páginas (BRUSH_NUEVO.png, 2065x354): 6% más ancha
// que la ventana y corrida a la izquierda (ver faqs.tsx / donde-estamos.tsx /
// activate.tsx). A diferencia de la home, escala con el ANCHO: en ventanas más
// cuadradas (4:3, 5:4) queda más baja y a la altura de la home el texto del
// menú caía sobre el negro. Por eso la barra usa la altura de la home salvo que
// eso la saque del blanco, y en ese caso baja solo lo justo.
const BRUSH_BLEED = 0.06
const BRUSH_ASPECT = 354 / 2065
// dónde empieza el blanco opaco (fracción del alto de la imagen), por franjas
// del 5% de su ancho: medido en el PNG (el peor caso de cada franja)
const BRUSH_WHITE_TOP = [1, 0.573, 0.551, 0.534, 0.517, 0.466, 0.455, 0.455, 0.455, 0.46, 0.469, 0.48, 0.497, 0.568, 0.582, 0.59, 0.605, 0.62, 0.65, 0.7]
const ON_WHITE_MARGIN = 4 // px (en unidades de 873 de alto) entre el borde del blanco y el texto

/** top de la barra en px de pantalla: el de la home, o lo justo para quedar sobre el blanco */
export function bottomNavTop(w: number, h: number, navWidthPx: number): number {
  const s = h / HOME_STAGE_HEIGHT
  const left = 100 * s
  const brushW = w * (1 + BRUSH_BLEED)
  const brushH = brushW * BRUSH_ASPECT
  const brushTop = h - brushH
  let needed = 0
  for (let i = 0; i <= 24; i++) {
    const x = left + (navWidthPx * i) / 24
    const f = (x + w * BRUSH_BLEED) / brushW
    const band = BRUSH_WHITE_TOP[Math.min(BRUSH_WHITE_TOP.length - 1, Math.max(0, Math.floor(f * 20)))]
    needed = Math.max(needed, brushTop + band * brushH)
  }
  return Math.max(NAV_TOP * s, needed + ON_WHITE_MARGIN * s)
}

export default function DesktopBottomNav({
  items,
  activeKey,
  ctaHref = "/activate",
}: {
  items: NavBarItem[]
  activeKey: NavKey
  ctaHref?: string
}) {
  const [viewport, setViewport] = useState({ w: 0, h: 0 })
  const [navWidth, setNavWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // ancho real del menú (cambia con la escala y cuando cargan las tipografías)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setNavWidth(el.offsetWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const scale = viewport.h ? viewport.h / HOME_STAGE_HEIGHT : 1
  const top = viewport.h ? bottomNavTop(viewport.w, viewport.h, navWidth) : NAV_TOP

  return (
    <div ref={ref} style={{ position: "absolute", left: 100 * scale, top, zIndex: 9 }}>
      <NavBar items={items} activeKey={activeKey} ctaHref={ctaHref} scale={scale * NAV_SCALE_BOOST} />
    </div>
  )
}
