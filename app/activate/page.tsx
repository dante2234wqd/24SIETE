import Activate from "@/components/24siete/activate";
import ActivateMobile from "@/components/24siete/activate-mobile";

export default function ActivatePage() {
  return (
    <>
      <div className="hidden md:block">
        <Activate />
      </div>
      <div className="md:hidden">
        <ActivateMobile />
      </div>
    </>
  );
}
