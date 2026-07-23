import DondeEstamos from "@/components/24siete/donde-estamos";
import DondeEstamosMobile from "@/components/24siete/donde-estamos-mobile";

export default function DondeEstamosPage() {
  return (
    <>
      <div className="hidden md:block">
        <DondeEstamos />
      </div>
      <div className="md:hidden">
        <DondeEstamosMobile />
      </div>
    </>
  );
}
