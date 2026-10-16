"use client";

import Landing247Horizontal from "@/components/24siete/landing-247-horizontal";
import Landing247Mobile from "@/components/24siete/landing-247-mobile";
import { useIsMobileLayout } from "@/hooks/use-is-mobile-layout";
import Link from "next/link";

// Datos estructurados de los productos, solo en la home. Sin precio, stock,
// reseñas ni calificaciones: no hay datos confirmados. La imagen muestra los dos
// paquetes juntos (no hay fotos individuales de cada sabor).
const SITE_URL = "https://www.alfajor24siete.com.ar";
const PRODUCT_IMAGE = `${SITE_URL}/assets/alfajores-blanco-negro.webp`;
const PRODUCTS_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { name: "Alfajor negro 24SIETE", description: "Alfajor negro 24SIETE de 70 g." },
    { name: "Alfajor blanco 24SIETE", description: "Alfajor blanco 24SIETE de 70 g." },
  ].map((p) => ({
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: PRODUCT_IMAGE,
    brand: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "24SIETE" },
    weight: { "@type": "QuantitativeValue", value: 70, unitCode: "GRM" },
  })),
};

// mismos destinos y textos que el menú visible de la landing
const HIDDEN_NAV = [
  { href: "/", label: "YO SOY 24SIETE" },
  { href: "/donde-estamos", label: "¿DONDE ESTAMOS?" },
  { href: "/faqs", label: "FAQS" },
  { href: "/activate", label: "ACTIVATE" },
];

export default function HomePage() {
  // Se monta solo la versión que corresponde a la pantalla (antes se montaban
  // las dos y el CSS ocultaba una: se descargaban las imágenes de ambas y
  // quedaban dos visores 3D). null = todavía no se sabe: no se renderiza nada
  // y se ve el fondo #1f140f del body.
  const isMobile = useIsMobileLayout();

  return (
    <>
      {/* H1 real con la marca, invisible: los títulos de la landing son imágenes.
          Va fuera del stage escalado y se renderiza siempre (también en el HTML
          del servidor, antes de saber si la pantalla es desktop o mobile) */}
      <h1 className="visually-hidden">24SIETE</h1>

      <script
        type="application/ld+json"
        // contenido fijo definido arriba (no viene del usuario)
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCTS_JSON_LD) }}
      />

      {/* Menú de texto invisible, con los mismos links y textos que el menú
          visible: la landing elige su versión en el navegador, así que sin esto
          el HTML del servidor no traía ningún link. tabIndex -1: Tab los saltea
          (el foco no cae en links invisibles) y van directo al menú visible */}
      <nav aria-label="Principal" className="visually-hidden">
        <ul>
          {HIDDEN_NAV.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} tabIndex={-1}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {isMobile === null ? null : isMobile ? (
        <div className="md:hidden home-mobile-only">
          <Landing247Mobile />
        </div>
      ) : (
        <div className="hidden md:block home-desktop-only">
          <Landing247Horizontal />
        </div>
      )}
    </>
  );
}
