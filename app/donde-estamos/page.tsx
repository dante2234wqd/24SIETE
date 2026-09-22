import DondeEstamos from "@/components/24siete/donde-estamos";
import DondeEstamosMobile from "@/components/24siete/donde-estamos-mobile";

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
