import Activate from "@/components/24siete/activate";
import ActivateMobile from "@/components/24siete/activate-mobile";

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
