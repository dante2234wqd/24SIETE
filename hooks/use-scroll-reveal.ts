"use client"

import { useEffect, useRef } from "react"

// revela cada elemento animado a medida que entra en el viewport (en vez de
// animar todo de una sola vez al montar la página). El observer se crea una
// sola vez y queda observando indefinidamente, así también revela elementos
// que se montan más tarde (por ej. un formulario que reaparece tras un
// submit), no sólo los que existen en el primer render.
export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const toOpacityByEl = useRef(new WeakMap<Element, number>())

  if (!observerRef.current && typeof IntersectionObserver !== "undefined") {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const toOpacity = toOpacityByEl.current.get(el) ?? 1
          el.style.opacity = String(toOpacity)
          el.style.marginTop = "0px"
          observerRef.current?.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )
  }

  useEffect(() => {
    return () => observerRef.current?.disconnect()
  }, [])

  let index = 0
  function enter(variant: "slide" | "fade" = "slide", opts?: { step?: number; toOpacity?: number }) {
    const step = opts?.step ?? 0.06
    const delay = index * step
    index += 1
    const toOpacity = opts?.toOpacity ?? 1

    const style: React.CSSProperties = {
      opacity: 0,
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay.toFixed(2)}s, margin-top 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay.toFixed(2)}s`,
    }
    if (variant === "slide") style.marginTop = 26

    return {
      style,
      ref: (el: HTMLElement | null) => {
        if (el && observerRef.current) {
          toOpacityByEl.current.set(el, toOpacity)
          observerRef.current.observe(el)
        }
      },
    }
  }

  return enter
}
