import type { Metadata } from "next";
import Activate from "@/components/24siete/activate";
import ActivateMobile from "@/components/24siete/activate-mobile";

// página "Hablanos" (formulario de contacto). Metadata propia (con la plantilla
// "%s | 24SIETE" del layout) y canonical propia: sin esto heredaba la de la home
export const metadata: Metadata = {
  title: "Hablanos",
  description:
    "¿Tenés un kiosco o sos distribuidor o mayorista? Escribinos y te contamos cómo sumar 24SIETE, el alfajor negro y blanco de 70 g.",
  alternates: { canonical: "/activate" },
};

export default function ActivatePage() {
  return (
    <>
      <div className="hidden md:block home-desktop-only">
        <Activate />
      </div>
      <div className="md:hidden home-mobile-only">
        <ActivateMobile />
      </div>
    </>
  );
}
