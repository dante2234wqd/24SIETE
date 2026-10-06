"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const CajaAlfajor3D = dynamic(() => import("@/components/CajaAlfajor3D"), { ssr: false })

// Contenedor con scroll más cercano (sin contar <body>/<html>, que scrollean
// con la ventana). En la landing desktop es el div con scroll horizontal: hay
// que pasarlo como `root` porque el rootMargin de un IntersectionObserver solo
// agranda el área del root, no la de los contenedores con scroll intermedios.
function scrollParent(el: HTMLElement): HTMLElement | null {
  for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
    const { overflowX, overflowY } = getComputedStyle(p)
    if (/(auto|scroll)/.test(overflowX + overflowY)) return p
  }
  return null
}

// Monta el visor 3D (y recién ahí descarga three.js + Cajas12.glb) cuando está
// a menos de media pantalla de entrar en vista. Ocupa el 100% de su contenedor,
// igual que el visor, así que no cambia el layout.
export default function CajaAlfajor3DLazy() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") return setShow(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { root: scrollParent(el), rootMargin: "50%" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      {show ? <CajaAlfajor3D /> : null}
    </div>
  )
}
