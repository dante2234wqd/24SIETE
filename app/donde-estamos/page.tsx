import type { Metadata } from "next";
import DondeEstamos from "@/components/24siete/donde-estamos";
import DondeEstamosMobile from "@/components/24siete/donde-estamos-mobile";

// Metadata neutra: todavía no hay locales confirmados, así que no promete ninguno.
export const metadata: Metadata = {
  title: "¿Dónde estamos?",
  description: "Próximamente vas a poder encontrar 24SIETE cerca tuyo. Alfajor negro y blanco de 70 g.",
  alternates: { canonical: "/donde-estamos" },
};

export default function DondeEstamosPage() {
  return (
    <>
      <div className="hidden md:block home-desktop-only">
        <DondeEstamos />
      </div>
      <div className="md:hidden home-mobile-only">
        <DondeEstamosMobile />
      </div>
    </>
  );
}
