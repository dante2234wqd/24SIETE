import { useEffect, useState } from "react"

// Mismo criterio que el CSS que alterna las versiones (clases md:* de Tailwind
// + .home-desktop-only / .home-mobile-only en globals.css): mobile si el ancho
// es menor a md (48rem) O si la ventana es más alta que ancha.
const MOBILE_QUERY = "not all and (min-width: 48rem), (max-aspect-ratio: 1/1)"

/** null hasta montar en el cliente (en el servidor no se sabe el tamaño de pantalla). */
export function useIsMobileLayout(): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  return isMobile
}
