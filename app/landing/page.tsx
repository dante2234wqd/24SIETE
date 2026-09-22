import Landing247Horizontal from "@/components/24siete/landing-247-horizontal";
import Landing247Mobile from "@/components/24siete/landing-247-mobile";

export default function LandingPage() {
  return (
    <>
      <div className="hidden md:block home-desktop-only">
        <Landing247Horizontal />
      </div>
      <div className="md:hidden home-mobile-only">
        <Landing247Mobile />
      </div>
    </>
  );
}
