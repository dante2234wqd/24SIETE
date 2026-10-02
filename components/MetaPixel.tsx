"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"

// ─────────────────────────────────────────────────
//  Meta Pixel
//  Se carga una sola vez desde app/layout.tsx. Solo en
//  producción y solo si está definida la variable
//  NEXT_PUBLIC_META_PIXEL_ID: en desarrollo local (o sin
//  la variable) no se carga nada, sin errores.
// ─────────────────────────────────────────────────

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ENABLED = process.env.NODE_ENV === "production" && !!PIXEL_ID

/**
 * Manda un evento estándar de Meta (p. ej. "Lead") si el pixel está cargado.
 * Si no lo está (desarrollo, sin variable, bloqueador de anuncios) no hace nada.
 */
export function trackMetaEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return
  if (params) window.fbq("track", name, params)
  else window.fbq("track", name)
}

export default function MetaPixel() {
  const pathname = usePathname()
  const isFirstLoad = useRef(true)

  // En App Router navegar entre páginas no recarga el documento: el PageView
  // de la carga inicial lo manda el script base, y acá se manda uno por cada
  // cambio de ruta posterior.
  useEffect(() => {
    if (!ENABLED) return
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    trackMetaEvent("PageView")
  }, [pathname])

  if (!ENABLED) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
