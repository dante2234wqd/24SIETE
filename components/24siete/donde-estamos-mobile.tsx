"use client"

import MobileNavBar from "./mobile-nav-bar"
import type { NavBarItem } from "./nav-bar"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// ─────────────────────────────────────────────────
//  24SIETE — Mobile ¿Dónde estamos?
//  Layout de flujo normal (no stage escalado), pensado
//  para pantallas angostas. Reutiliza los mismos datos
//  de direcciones que la versión de escritorio.
// ─────────────────────────────────────────────────

const DONDE_ESTAMOS_MOBILE_NAV_ITEMS: NavBarItem[] = [
  { label: "YO SOY 24SIETE", key: "yo-soy-24siete", href: "/landing" },
  { label: "¿DONDE ESTAMOS?", key: "donde-estamos", href: "#" },
  { label: "FAQS", key: "faqs", href: "/faqs" },
]

interface Neighborhood {
  name: string
  address: string
  labelSrc: string
  labelW: number
  labelH: number
}

// mismas direcciones que la versión de escritorio, redistribuidas para el
// layout mobile: 3 filas de a pares arriba y una columna de 3 abajo.
const TOP_ROWS: [Neighborhood, Neighborhood][] = [
  [
    { name: "Palermo", address: "Santa Fe 4300", labelSrc: "/assets/Group%208.png", labelW: 120, labelH: 42 },
    { name: "Microcentro", address: "Corrientes 900", labelSrc: "/assets/Group%2011.png", labelW: 120, labelH: 42 },
  ],
  [
    { name: "Soho", address: "Gurruchaga 1700", labelSrc: "/assets/Group%206.png", labelW: 119, labelH: 41 },
    { name: "Belgrano", address: "Cabildo 2200", labelSrc: "/assets/Group%209.png", labelW: 119, labelH: 41 },
  ],
  [
    { name: "Recoleta", address: "Callao 1200", labelSrc: "/assets/Group%207.png", labelW: 119, labelH: 41 },
    { name: "Caballito", address: "Rivadavia 5200", labelSrc: "/assets/Group%2010.png", labelW: 119, labelH: 41 },
  ],
]

const BOTTOM_LEFT_COLUMN: Neighborhood[] = [
  { name: "Villa Crespo", address: "Corrientes 4800", labelSrc: "/assets/Group%2014.png", labelW: 120, labelH: 42 },
  { name: "Chacarita", address: "Federico Lacroze 3900", labelSrc: "/assets/Group%2012.png", labelW: 119, labelH: 41 },
  { name: "Nuñez", address: "Cabildo 3500", labelSrc: "/assets/Group%2013.png", labelW: 127, labelH: 41 },
]

function AddressLink({ name, address, labelSrc, labelW, labelH }: Neighborhood) {
  const query = encodeURIComponent(`${address}, ${name}, Buenos Aires, Argentina`)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
  const displayWidth = 104
  const displayHeight = Math.round((displayWidth * labelH) / labelW)

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, textDecoration: "none" }}
    >
      <img
        src={labelSrc}
        alt={name}
        draggable={false}
        width={displayWidth}
        height={displayHeight}
        style={{ width: displayWidth, height: displayHeight, aspectRatio: `${labelW} / ${labelH}` }}
      />
      <span
        style={{
          fontFamily: "var(--font-grold-rounded), Arial, Helvetica, sans-serif",
          fontWeight: 700,
          fontSize: 12.5,
          color: "#fff",
        }}
      >
        {address}
      </span>
    </a>
  )
}

export default function DondeEstamosMobile() {
  const enter = useScrollReveal()

  const titleImg = enter("fade")
  const mapImg = enter("fade")
  const topGrid = enter()
  const bottomRow = enter()

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#110f10",
        overflowX: "hidden",
      }}
    >
      {/* Fondo general (mismo que la home desktop) */}
      <img
        src="/assets/fondo_nuevo.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      <MobileNavBar items={DONDE_ESTAMOS_MOBILE_NAV_ITEMS} activeKey="donde-estamos" ctaHref="/activate" />

      <main
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "28px 20px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* ── TITULO ─────────────────────────────── */}
        <img
          ref={titleImg.ref}
          src="/assets/donde_estamos_titulo_mobile.png"
          alt="¿Dónde estamos?"
          style={{ ...titleImg.style, width: "calc(100% + 20px)", maxWidth: 360, objectFit: "contain", marginLeft: -20 }}
        />

        {/* ── MAPA ─────────────────────────────────── */}
        <img
          ref={mapImg.ref}
          src="/assets/mapa_buenos_aires_mobile.png"
          alt="Mapa de la provincia de Buenos Aires con nuestros puntos de venta"
          style={{ ...mapImg.style, width: "100%", objectFit: "contain" }}
        />

        {/* ── DIRECCIONES: 3 filas de a pares ───────── */}
        <div ref={topGrid.ref} style={{ ...topGrid.style, display: "flex", flexDirection: "column", gap: 22 }}>
          {TOP_ROWS.map(([left, right]) => (
            <div key={left.name} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 12 }}>
              <AddressLink {...left} />
              <div style={{ borderLeft: "3px solid #39ff14", paddingLeft: 20 }}>
                <AddressLink {...right} />
              </div>
            </div>
          ))}
        </div>

        {/* ── VILLA CRESPO / CHACARITA / NUÑEZ  +  CTA ── */}
        <div ref={bottomRow.ref} style={{ ...bottomRow.style, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {BOTTOM_LEFT_COLUMN.map((n) => (
              <AddressLink key={n.name} {...n} />
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", paddingLeft: 20 }}>
            <p
              style={{
                fontFamily: "var(--font-grold-rounded), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.1rem, 5vw, 1.4rem)",
                lineHeight: "116%",
                color: "#fff",
                margin: 0,
              }}
            >
              CUANDO TE PINTE...
              <br />
              SIEMPRE HAY UN <span style={{ color: "#39ff14" }}>24SIETE</span> CERCA.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
