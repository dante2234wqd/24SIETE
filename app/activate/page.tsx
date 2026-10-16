import type { Metadata } from "next";
import Activate from "@/components/24siete/activate";
import ActivateMobile from "@/components/24siete/activate-mobile";

// canonical propia: sin esto heredaba la de la home ("/") del layout raíz
export const metadata: Metadata = {
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
