"use client"

import { LottieOverlay } from "./hover-title"

// Emojis animados del título "¿Dónde estamos?" (lottie.json) para ponerle a otros
// títulos. Van siempre visibles (no dependen del hover), en desktop y en mobile.
// Se posicionan en % sobre el contenedor, que debe ser `position: relative` y
// del tamaño del texto; `size` es el lado base en px.
const POSITIONS = [
  { top: "-28%", left: "2%", k: 1.0, rot: -12 },
  { top: "-34%", left: "44%", k: 0.9, rot: 9 },
  { top: "62%", left: "24%", k: 0.8, rot: 15 },
  { top: "-6%", left: "90%", k: 1.05, rot: -8 },
  { top: "58%", left: "66%", k: 0.85, rot: 6 },
]

export default function TitleEmojis({ size = 30 }: { size?: number }) {
  return (
    <>
      {POSITIONS.map((p, i) => (
        <LottieOverlay
          key={i}
          src="/lottie/lottie.json"
          hovered
          style={{ top: p.top, left: p.left, width: size * p.k, height: size * p.k, transform: `rotate(${p.rot}deg)`, zIndex: 3 }}
        />
      ))}
    </>
  )
}
