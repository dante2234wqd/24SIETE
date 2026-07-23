"use client"

import { useEffect, useRef, useState } from "react"

// arrastre libre de un sticker, sin escala de stage (para layouts mobile de
// flujo normal, a diferencia de la versión de escritorio que divide por el
// scale del stage escalado)
export function useDraggableSticker() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      setOffset({ x: drag.originX + (e.clientX - drag.startX), y: drag.originY + (e.clientY - drag.startY) })
    }

    const onPointerUp = () => {
      dragRef.current = null
      setIsDragging(false)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault()
    ;(e.currentTarget as HTMLImageElement).setPointerCapture(e.pointerId)
    setIsDragging(true)
    dragRef.current = { startX: e.clientX, startY: e.clientY, originX: offset.x, originY: offset.y }
  }

  return { offset, isDragging, onPointerDown }
}
