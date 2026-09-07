"use client"

import { useState } from "react"
import MobileNavBar from "./mobile-nav-bar"
import type { NavBarItem } from "./nav-bar"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useDraggableSticker } from "@/hooks/use-draggable-sticker"

// ─────────────────────────────────────────────────
//  24SIETE — Mobile FAQS
//  Layout de flujo normal (no stage escalado), pensado
//  para pantallas angostas. Reutiliza el mismo título,
//  preguntas e imágenes de respuesta que la versión de
//  escritorio.
// ─────────────────────────────────────────────────

const BRUSH_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brush_blanco_donde%20estamos-yZAFCxUsKMT38Rwe1RoDyS835o3dTd.png"

const FAQS_MOBILE_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "/donde-estamos" },
  { label: "FAQS", key: "faqs", href: "#" },
]

const QUESTIONS: { id: string; text: string; answerSrc: string }[] = [
  { id: "q1", text: "01. ¿DÓNDE LO CONSIGO?", answerSrc: "/assets/pregunta1.png" },
  { id: "q2", text: "02. ¿LO PUEDO VENDER EN MI KIOSCO?", answerSrc: "/assets/pregunta2.png" },
  { id: "q3", text: "03. ¿QUÉ TIENE DE DISTINTO?", answerSrc: "/assets/pregunta3.png" },
  { id: "q4", text: "04. ¿TIENE VARIOS SABORES?", answerSrc: "/assets/pregunta4.png" },
  { id: "q5", text: "05. TENGO UNA IDEA O QUIERO COLABORAR", answerSrc: "/assets/pregunta5.png" },
  { id: "q6", text: "06. ¿24SIETE TIENE REDES?", answerSrc: "/assets/pregunta6.png" },
]

const HOVER_GREEN = "#0FFF1E"

function QuestionPill({ text, active, onClick }: { text: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: 44,
        border: "2px solid #39ff14",
        borderRadius: 12,
        backgroundColor: active ? HOVER_GREEN : "#fff",
        display: "flex",
        alignItems: "center",
        padding: "9px 15px",
        textAlign: "left",
        cursor: "pointer",
        transition: "background-color 0.15s ease",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
          fontWeight: 700,
          fontSize: 11,
          lineHeight: "120%",
          color: "#110f10",
        }}
      >
        {text}
      </span>
    </button>
  )
}

export default function FaqsMobile() {
  const enter = useScrollReveal()
  const sticker = useDraggableSticker()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedAnswer = QUESTIONS.find((q) => q.id === selectedId)

  const titleReveal = enter("fade")
  const listReveal = enter()
  const answerReveal = enter("fade")

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#110f10",
        backgroundImage: "url(/assets/fondo_nuevo.webp)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        overflowX: "hidden",
      }}
    >
      <MobileNavBar items={FAQS_MOBILE_NAV_ITEMS} activeKey="faqs" ctaHref="/activate" />

      <main
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "28px 20px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* ── TITULO + STICKER ─────────────────────── */}
        <div style={{ position: "relative", paddingBottom: 36 }}>
          <div
            ref={titleReveal.ref}
            style={{ ...titleReveal.style, position: "relative", width: "calc(100% + 40px)", marginLeft: -20, aspectRatio: "560 / 150" }}
          >
            <img
              src={BRUSH_URL}
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
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
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "9%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cubano), 'Impact', 'Arial Black', 'Oswald', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.5rem, 7.5vw, 2rem)",
                  lineHeight: "98%",
                  letterSpacing: "-0.02em",
                  color: "#110f10",
                  textTransform: "uppercase",
                }}
              >
                PREGUNTAS QUE SE
                <br />
                HACEN A LAS 3 AM
              </span>
            </div>
          </div>

          <img
            src="/assets/Stiker_24SIETE.png"
            alt="¿Estás active o estás mirando?"
            draggable={false}
            onPointerDown={sticker.onPointerDown}
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "30%",
              maxWidth: 112,
              transform: `translate(${sticker.offset.x}px, ${sticker.offset.y}px) rotate(-6deg) scale(${sticker.isDragging ? 1.08 : 1})`,
              transition: sticker.isDragging ? "none" : "transform 0.2s ease",
              filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.5))",
              zIndex: sticker.isDragging ? 50 : 1,
              cursor: sticker.isDragging ? "grabbing" : "grab",
              touchAction: "none",
              userSelect: "none",
            }}
          />
        </div>

        {/* ── GRILLA DE PREGUNTAS ───────────────────── */}
        <div ref={listReveal.ref} style={{ ...listReveal.style, display: "flex", flexDirection: "column", gap: 16 }}>
          {QUESTIONS.map((q) => (
            <QuestionPill key={q.id} text={q.text} active={selectedId === q.id} onClick={() => setSelectedId(q.id)} />
          ))}
        </div>

        {/* ── RESPUESTA SELECCIONADA ────────────────── */}
        {selectedAnswer && (
          <img
            key={selectedAnswer.id}
            ref={answerReveal.ref}
            src={selectedAnswer.answerSrc}
            alt="Respuesta"
            draggable={false}
            style={{ ...answerReveal.style, width: "100%", objectFit: "contain" }}
          />
        )}
      </main>
    </div>
  )
}
