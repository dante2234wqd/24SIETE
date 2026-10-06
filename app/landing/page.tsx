"use client";

import Landing247Horizontal from "@/components/24siete/landing-247-horizontal";
import Landing247Mobile from "@/components/24siete/landing-247-mobile";
import { useIsMobileLayout } from "@/hooks/use-is-mobile-layout";

export default function LandingPage() {
  // Se monta solo la versión que corresponde a la pantalla (antes se montaban
  // las dos y el CSS ocultaba una: se descargaban las imágenes de ambas y
  // quedaban dos visores 3D). null = todavía no se sabe: no se renderiza nada
  // y se ve el fondo #1f140f del body.
  const isMobile = useIsMobileLayout();
  if (isMobile === null) return null;

  return isMobile ? (
    <div className="md:hidden home-mobile-only">
      <Landing247Mobile />
    </div>
  ) : (
    <div className="hidden md:block home-desktop-only">
      <Landing247Horizontal />
    </div>
  );
}
