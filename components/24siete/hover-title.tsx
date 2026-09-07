"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { useEffect, useState, type CSSProperties, type ReactNode } from "react"

// lottie-react usa APIs de navegador (canvas/SVG) — se carga solo en cliente
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

// Cache a nivel de módulo para no re-descargar el mismo JSON si el título
// se hoverea varias veces o si dos HoverTitle comparten una animación.
const lottieDataCache = new Map<string, Promise<unknown>>()
function useLottieData(src: string) {
  const [data, setData] = useState<unknown>(null)
  useEffect(() => {
    let cancelled = false
    if (!lottieDataCache.has(src)) {
      lottieDataCache.set(
        src,
        fetch(src).then((r) => r.json()),
      )
    }
    lottieDataCache.get(src)!.then((json) => {
      if (!cancelled) setData(json)
    })
    return () => {
      cancelled = true
    }
  }, [src])
  return data
}

interface HoverTitleLottie {
  src: string
  style?: CSSProperties
}

// El wrapper externo posiciona/rota el ícono (según `style`, p.ej. rotate());
// el interno maneja únicamente la animación de entrada (fade + scale) para
// que ambas cosas no se pisen en la misma propiedad `transform`.
function LottieOverlay({ src, style, hovered }: { src: string; style?: CSSProperties; hovered: boolean }) {
  const data = useLottieData(src)
  return (
    <div aria-hidden="true" style={{ position: "absolute", pointerEvents: "none", zIndex: 2, ...style }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.5)",
          transition: "opacity 0.5s cubic-bezier(0.65, 0, 0.35, 1), transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {data ? <Lottie animationData={data} loop autoplay style={{ width: "100%", height: "100%" }} /> : null}
      </div>
    </div>
  )
}

interface HoverTitleProps {
  href: string
  children: ReactNode
  style?: CSSProperties
  gifSrc?: string
  gifStyle?: CSSProperties
  lotties?: HoverTitleLottie[]
  perspective?: number
}

// Título que "gira" (flip 3D) al pasar el cursor, igual que el hover de
// títulos de vicio.com: dos copias idénticas del contenido, una detrás de
// la otra dentro de un contenedor con perspective + transform-style:
// preserve-3d. Al hacer hover, el conjunto rota 180° en X — como ambas caras
// muestran lo mismo, se ve como un "roll" continuo en vez de un flip-card
// que cambia de contenido. Opcionalmente, junto al título aparecen (fade +
// scale) uno o más emojis animados (Lottie), chicos, al estilo vicio.com
// (pointer-events: none para no interferir con el click).
export default function HoverTitle({
  href,
  children,
  style,
  gifSrc,
  gifStyle,
  lotties,
  perspective = 800,
}: HoverTitleProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        display: "block",
        textDecoration: "none",
        ...style,
      }}
    >
      <div style={{ width: "100%", height: "100%", perspective }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)",
            transform: hovered ? "rotateX(-180deg)" : "rotateX(0deg)",
          }}
        >
          <div style={{ width: "100%", height: "100%", backfaceVisibility: "hidden" }}>{children}</div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {gifSrc && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            pointerEvents: "none",
            backgroundImage: `url(${gifSrc})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.8)",
            transition:
              "opacity 0.5s cubic-bezier(0.65, 0, 0.35, 1), transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)",
            ...gifStyle,
          }}
        />
      )}

      {lotties?.map((l, i) => (
        <LottieOverlay key={l.src + i} src={l.src} style={l.style} hovered={hovered} />
      ))}
    </Link>
  )
}