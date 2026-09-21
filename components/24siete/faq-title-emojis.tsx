"use client"

import { LottieOverlay } from "./hover-title"

// Emojis animados (carafeliz) del título de FAQS: los mismos del título FAQS
// de la home. Van siempre visibles (no dependen del hover), tanto en mobile
// como en desktop. Se posicionan en % sobre el bloque de texto del título, que debe
// ser `position: relative`; `size` es el lado base en px (más grande en desktop).
// posiciones (en % del bloque de texto) sobre los bordes de las letras, para no taparlas
const POSITIONS = [
  { top: "-14%", left: "3%", k: 1.0, rot: -10 },
  { top: "-20%", left: "50%", k: 0.9, rot: 8 },
  { top: "92%", left: "18%", k: 0.8, rot: -14 },
  { top: "84%", left: "82%", k: 0.95, rot: 12 },
]

export default function FaqTitleEmojis({ size = 20 }: { size?: number }) {
  return (
    <>
      {POSITIONS.map((e, i) => (
        <LottieOverlay
          key={i}
          src="/lottie/carafeliz.json"
          hovered
          style={{ top: e.top, left: e.left, width: size * e.k, height: size * e.k, transform: `rotate(${e.rot}deg)`, zIndex: 3 }}
        />
      ))}
    </>
  )
}
