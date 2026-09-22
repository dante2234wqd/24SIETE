import Faqs from "@/components/24siete/faqs";
import FaqsMobile from "@/components/24siete/faqs-mobile";

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
