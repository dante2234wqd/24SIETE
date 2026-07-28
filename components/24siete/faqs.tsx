"use client"

import { useEffect, useMemo, useState } from "react"
import NavBar, { type NavBarItem } from "./nav-bar"
import { useDraggableSticker } from "@/hooks/use-draggable-sticker"
import LogoMusicButton from "./logo-music-button"

// ─────────────────────────────────────────────────
//  24SIETE — FAQS
//  Stage fijo 1920×1080, escalado para entrar siempre
//  en pantalla sin necesidad de scroll.
// ─────────────────────────────────────────────────

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

const BACKGROUND_URL = "/assets/fondo%20donde%20estamos.png"
const BRUSH_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brush_blanco_donde%20estamos-yZAFCxUsKMT38Rwe1RoDyS835o3dTd.png"

const FAQS_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

const QUESTIONS: { id: string; text: string; answerSrc?: string; answerW?: number; answerH?: number }[] = [
  { id: "q1", text: "01. ¿DÓNDE LO CONSIGO?", answerSrc: "/assets/pregunta1.png", answerW: 556, answerH: 317 },
  { id: "q2", text: "02. ¿LO PUEDO VENDER EN MI KIOSCO?", answerSrc: "/assets/pregunta2.png", answerW: 556, answerH: 317 },
  { id: "q3", text: "03. ¿QUÉ TIENE DE DISTINTO?", answerSrc: "/assets/pregunta3.png", answerW: 556, answerH: 317 },
  { id: "q4", text: "04. ¿TIENE VARIOS SABORES?", answerSrc: "/assets/pregunta4.png", answerW: 556, answerH: 317 },
  { id: "q5", text: "05. TENGO UNA IDEA O QUIERO COLABORAR", answerSrc: "/assets/pregunta5.png", answerW: 556, answerH: 317 },
  { id: "q6", text: "06. ¿24SIETE TIENE REDES?", answerSrc: "/assets/pregunta6.png", answerW: 556, answerH: 317 },
]

const HOVER_GREEN = "#0FFF1E"

function QuestionPill({
  text,
  active,
  onEnter,
  onLeave,
  onClick,
}: {
  text: string
  active: boolean
  onEnter: () => void
  onLeave: () => void
  onClick: () => void
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        width: 430,
        height: 76,
        border: "3px solid #39ff14",
        borderRadius: 16,
        backgroundColor: active ? HOVER_GREEN : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 22px",
        cursor: "pointer",
        transition: "background-color 0.15s ease",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
          fontWeight: 700,
          fontSize: 19,
          lineHeight: "118%",
          color: "#101010",
        }}
      >
        {text}
      </span>
    </div>
  )
}

export default function Faqs() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)

    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const scale = useMemo(() => {
    if (!viewport.width || !viewport.height) return 1
    return Math.min(viewport.width / STAGE_WIDTH, viewport.height / STAGE_HEIGHT)
  }, [viewport])

  const selectedAnswer = QUESTIONS.find((q) => q.id === selectedId && q.answerSrc)
  const mascotSticker = useDraggableSticker(scale)

  let enterDelay = 0
  const enter = (
    variant: "slide" | "fade" = "slide",
    opts?: { step?: number; toOpacity?: number },
  ): React.CSSProperties => {
    const step = opts?.step ?? 0.055
    const delay = enterDelay
    enterDelay += step
    const name = variant === "slide" ? "stage-slide-in" : "stage-fade-in"
    return {
      animation: `${name} 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay.toFixed(2)}s backwards`,
      ["--enter-to-opacity" as unknown as string]: opts?.toOpacity ?? 1,
    } as React.CSSProperties
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        backgroundImage: `url(${BACKGROUND_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Fondo pincelada blanca detrás de la barra de navegación: fuera del stage escalado para poder ocupar el 100% del ancho real del viewport */}
      <img
        src="/assets/fondo%20menu%20navegacionv3.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          ...enter("fade"),
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: `${(283 / STAGE_HEIGHT) * 100}%`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          flexShrink: 0,
          transform: `scale(${scale})`,
          color: "#fff",
        }}
      >
        {/* Logo + título */}
        <div style={{ position: "absolute", left: 200, top: 60, display: "flex", alignItems: "center", gap: 28, zIndex: 4 }}>
          <LogoMusicButton style={{ ...enter(), width: 74, height: 76, flexShrink: 0 }} badgePosition="bottom" />

          <div style={{ position: "relative", width: 560, height: 150 }}>
            <img
              src={BRUSH_URL}
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                ...enter("fade"),
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
                transform: "rotate(-1.2deg)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                ...enter(),
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "16%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', 'Oswald', sans-serif",
                  fontWeight: 900,
                  fontSize: 36,
                  lineHeight: "98%",
                  letterSpacing: "-0.02em",
                  color: "#101010",
                  textTransform: "uppercase",
                }}
              >
                PREGUNTAS QUE SE
                <br />
                HACEN A LAS 3 AM
              </span>
            </div>
          </div>
        </div>

        {/* Grilla de preguntas */}
        <div
          style={{
            ...enter(),
            position: "absolute",
            left: 200,
            top: 340,
            display: "grid",
            gridTemplateColumns: "repeat(3, 430px)",
            gap: 34,
            zIndex: 4,
          }}
        >
          {QUESTIONS.map((q) => (
            <QuestionPill
              key={q.id}
              text={q.text}
              active={hoveredId === q.id || selectedId === q.id}
              onEnter={() => setHoveredId(q.id)}
              onLeave={() => setHoveredId(null)}
              onClick={() => setSelectedId(q.id)}
            />
          ))}
        </div>

        {/* Mascota + tagline, o el personaje respondiendo la pregunta seleccionada */}
        {selectedAnswer ? (
          <img
            src={selectedAnswer.answerSrc}
            alt="Respuesta"
            draggable={false}
            style={{
              ...enter("fade"),
              position: "absolute",
              left: 1010,
              top: 700,
              width: 870,
              height: 370,
              objectFit: "contain",
              zIndex: 4,
            }}
          />
        ) : (
          <img
            src="/assets/Stiker_24SIETE.png"
            alt="¿Estás active o estás mirando?"
            draggable={false}
            onPointerDown={mascotSticker.onPointerDown}
            style={{
              ...enter(),
              position: "absolute",
              left: 200 + mascotSticker.offset.x,
              top: 570 + mascotSticker.offset.y,
              width: 300,
              height: 300,
              objectFit: "contain",
              zIndex: mascotSticker.isDragging ? 999 : 4,
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
              transform: `scale(${mascotSticker.isDragging ? 1.06 : 1})`,
              transition: mascotSticker.isDragging ? "none" : "transform 0.2s ease",
              cursor: mascotSticker.isDragging ? "grabbing" : "grab",
              touchAction: "none",
              userSelect: "none",
            }}
          />
        )}

        {/* Bottom nav */}
        <div style={{ ...enter(), position: "absolute", left: 200, top: 986, zIndex: 7 }}>
          <NavBar items={FAQS_NAV_ITEMS} activeKey="faqs" ctaHref="/activate" />
        </div>
      </div>
    </div>
  )
}
