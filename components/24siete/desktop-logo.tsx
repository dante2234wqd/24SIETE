"use client"

import { useEffect, useState } from "react"
import LogoMusicButton from "./logo-music-button"

// Logo fijo de la esquina superior izquierda en desktop: misma posición y
// tamaño que en la home (left 56, top 34, 81×83 sobre el stage de 873 de alto,
// que la home escala por altura de ventana). Va FUERA del stage escalado de
// cada página, en px reales, así queda idéntico en la home, ¿Dónde estamos?,
// FAQs y Hablanos. Clic en el logo = ir a la home.
const HOME_STAGE_HEIGHT = 873

export default function DesktopLogo({ style }: { style?: React.CSSProperties }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => setScale(window.innerHeight / HOME_STAGE_HEIGHT)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <LogoMusicButton
      scale={scale}
      style={{
        position: "absolute",
        left: 56 * scale,
        top: 34 * scale,
        width: 81 * scale,
        height: 83 * scale,
        zIndex: 10,
        ...style,
      }}
    />
  )
}
