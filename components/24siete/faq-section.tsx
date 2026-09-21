"use client"

import { Fragment, useId, useState, type ReactNode } from "react"
import { FAQS, type FaqItem } from "./faq-data"

// ─────────────────────────────────────────────────
//  24SIETE — Sección de preguntas frecuentes
//
//  Lista de "pills" numeradas; al elegir una, su respuesta
//  aparece en una card que entra deslizándose desde la
//  derecha (con fade). Solo una respuesta visible a la vez.
//
//  Cómo funciona la animación (estilos en globals.css, ".faq-*"):
//   - Cada pregunta tiene SU PROPIA card, siempre montada. La card
//     cerrada está fuera de pantalla (translateX(110%), opacity 0).
//   - Al seleccionar, solo cambia data-open="true": la transición
//     CSS la lleva a su lugar (~350ms, ease-out) y la anterior,
//     que pasa a data-open="false", sale hacia la derecha en
//     simultáneo. No hace falta mount/unmount ni una librería.
//   - prefers-reduced-motion: sin deslizamiento, solo fade.
//   - Desktop: la card es absoluta abajo a la derecha de la sección.
//     Mobile: queda en el flujo, debajo de su pregunta y desplazada
//     a la derecha (estilo burbuja de chat).
// ─────────────────────────────────────────────────

interface FaqSectionProps {
  /** Preguntas y respuestas. Por defecto, las de 24SIETE. */
  questions?: FaqItem[]
  /** Titular grande a la izquierda (opcional). */
  title?: ReactNode
  /** "full" = min-height 100vh. "auto" = alto según contenido. "stage" = dentro del stage 1920×1080 del desktop. */
  variant?: "full" | "auto" | "stage"
  /** Id de la pregunta seleccionada al inicio. Por defecto ninguna. */
  initialId?: string | null
  /** Acentos decorativos (estrellas de marca rotadas) de fondo. */
  decorations?: boolean
}

export default function FaqSection({
  questions = FAQS,
  title,
  variant = "full",
  initialId = null,
  decorations = true,
}: FaqSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(initialId)
  const uid = useId()

  // click en la pregunta ya abierta = cerrar (la card sale hacia la derecha)
  const toggle = (id: string) => setSelectedId((cur) => (cur === id ? null : id))

  const variantClass = variant === "auto" ? " faq-section--auto" : variant === "stage" ? " faq-section--stage" : ""

  return (
    <section className={`faq-section${variantClass}`} aria-label="Preguntas frecuentes">
      {decorations && (
        <>
          <img className="faq-deco faq-deco--white" src="/assets/ESTRELLA_BLANCA_V2.png" alt="" aria-hidden="true" draggable={false} />
          <img className="faq-deco faq-deco--green" src="/assets/ESTRELLA_VERDE_V2.png" alt="" aria-hidden="true" draggable={false} />
        </>
      )}

      {title && <div className="faq-title">{title}</div>}

      <ul className="faq-list">
        {questions.map((q, i) => {
          const open = selectedId === q.id
          const answerId = `${uid}-answer-${q.id}`
          return (
            <li key={q.id} className="faq-item">
              <button
                type="button"
                className="faq-pill"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => toggle(q.id)}
              >
                <span className="faq-num">{String(i + 1).padStart(2, "0")}.</span>
                <span>{q.question}</span>
              </button>

              {/* card de respuesta: siempre montada, se anima con data-open */}
              <div
                id={answerId}
                className="faq-card"
                role="region"
                aria-live="polite"
                aria-label={q.question}
                aria-hidden={!open}
                data-open={open}
              >
                <p>
                  {q.answer.split("\n").map((line, li, lines) => (
                    <Fragment key={li}>
                      {line}
                      {li < lines.length - 1 && <br />}
                    </Fragment>
                  ))}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
