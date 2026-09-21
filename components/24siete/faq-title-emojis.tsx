"use client"

import { LottieOverlay } from "./hover-title"

// Emojis animados (carafeliz) del título de FAQS: los mismos del título FAQS
// de la home. Van siempre visibles (no dependen del hover), tanto en mobile
// como en desktop. Se posicionan en % sobre el texto del cartel de pincelada, que debe
// ser `position: relative`; `size` es el lado base en px (más grande en desktop).
// el texto ocupa distinto ancho del cartel en cada layout, por eso hay dos juegos de posiciones:
// van sobre los bordes de las letras (esquinas y huecos) para no taparlas.
const POSITIONS = {
  desktop: [
    { top: "12%", left: "19%", k: 1.0, rot: -10 },
    { top: "6%", left: "47%", k: 0.9, rot: 8 },
    { top: "68%", left: "33%", k: 0.8, rot: -14 },
    { top: "60%", left: "50%", k: 0.95, rot: 12 },
  ],
  mobile: [
    { top: "12%", left: "13%", k: 1.0, rot: -10 },
    { top: "4%", left: "57%", k: 0.9, rot: 8 },
    { top: "68%", left: "30%", k: 0.8, rot: -14 },
    { top: "62%", left: "56%", k: 0.95, rot: 12 },
  ],
}

export default function FaqTitleEmojis({ size = 20, layout = "desktop" }: { size?: number; layout?: "desktop" | "mobile" }) {
  return (
    <>
      {POSITIONS[layout].map((e, i) => (
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
