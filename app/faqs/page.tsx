import type { Metadata } from "next";
import Faqs from "@/components/24siete/faqs";
import FaqsMobile from "@/components/24siete/faqs-mobile";

// metadata propia (con la plantilla "%s | 24SIETE" del layout) y canonical
// propia: sin esto heredaba la de la home ("/") del layout raíz
export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Resolvé tus dudas sobre 24SIETE, el alfajor negro y blanco de 70 g.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <>
      <div className="hidden md:block home-desktop-only">
        <Faqs />
      </div>
      <div className="md:hidden home-mobile-only">
        <FaqsMobile />
      </div>
    </>
  );
}
