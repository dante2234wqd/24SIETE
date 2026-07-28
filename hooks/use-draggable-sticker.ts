"use client"

import { useEffect, useRef, useState } from "react"

// arrastre libre de un sticker. `scale` es el factor de escala del stage
// (stages de escritorio escalados con transform: scale(...)); los layouts
// mobile de flujo normal no tienen escala y usan el default 1.
export function useDraggableSticker(scale = 1) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      setOffset({
        x: drag.originX + (e.clientX - drag.startX) / scale,
        y: drag.originY + (e.clientY - drag.startY) / scale,
      })
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
  }, [scale])

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault()
    ;(e.currentTarget as HTMLImageElement).setPointerCapture(e.pointerId)
    setIsDragging(true)
    dragRef.current = { startX: e.clientX, startY: e.clientY, originX: offset.x, originY: offset.y }
  }

  return { offset, isDragging, onPointerDown }
}
