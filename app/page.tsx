"use client";

import Landing247Horizontal from "@/components/24siete/landing-247-horizontal";
import Landing247Mobile from "@/components/24siete/landing-247-mobile";
import { useIsMobileLayout } from "@/hooks/use-is-mobile-layout";

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
