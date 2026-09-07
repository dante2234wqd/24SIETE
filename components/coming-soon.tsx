import Image from "next/image"
import AudioToggleClient from "./audio-toggle-client"
import SubscribeFormClient from "./subscribe-form-client"

export default function ComingSoon() {
  return (
    <>
      <style>{`
        .page-bg {
          background-color: #110f10;
          background-image: url("/assets/background_proximamente.webp");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .dot { color: #0FFF1E; display: inline-block; }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: translateY(0px); }
          50% { opacity: 0.15; transform: translateY(-3px); }
        }
        .dot1 { animation: dotPulse 1.6s ease-in-out infinite 0s; }
        .dot2 { animation: dotPulse 1.6s ease-in-out infinite 0.27s; }
        .dot3 { animation: dotPulse 1.6s ease-in-out infinite 0.54s; }

        @keyframes barBounce {
          0%, 100% { transform: scaleY(0.25); }
          50% { transform: scaleY(1); }
        }
        .bar {
          display: inline-block;
          width: 3px;
          border-radius: 3px;
          background: #0FFF1E;
          transform-origin: bottom;
        }
        .bars-active .bar1 { animation: barBounce 0.65s ease-in-out infinite 0s; }
        .bars-active .bar2 { animation: barBounce 0.65s ease-in-out infinite 0.16s; }
        .bars-active .bar3 { animation: barBounce 0.65s ease-in-out infinite 0.32s; }
        .bars-active .bar4 { animation: barBounce 0.65s ease-in-out infinite 0.48s; }
        .bars-paused .bar { transform: scaleY(0.45); }

        .logo-btn { transition: transform 0.22s ease, filter 0.22s ease; }
        .logo-btn:hover { transform: scale(1.07); filter: drop-shadow(0 0 10px rgba(15,255,30,0.55)); }
        .logo-btn:active { transform: scale(0.96); }

        .audio-pill-wrap {
          min-height: 34px;
          display: flex;
          align-items: center;
        }

        .audio-pill {
          position: relative;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .audio-pill::before {
          content: '';
          position: absolute;
          left: -7px;
          top: 50%;
          transform: translateY(-50%);
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 7px solid white;
        }
        .audio-pill-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        .audio-pill-hidden {
          opacity: 0;
          transform: translateX(-8px) scale(0.95);
          pointer-events: none;
        }

        .social-icon {
          transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .social-icon:hover,
        .social-icon:focus-visible {
          background-color: #0FFF1E !important;
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 6px 20px rgba(15,255,30,0.35);
          outline: none;
        }

        .social-label { transition: color 0.2s ease; cursor: default; }
        .social-label:hover { color: #0FFF1E; }

        .btn-enviar {
          transition: background-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
        }
        .btn-enviar:hover {
          background-color: #00e619 !important;
          transform: scale(1.03);
          box-shadow: 0 4px 18px rgba(15,255,30,0.4);
        }
        .btn-enviar:active { transform: scale(0.97); }

        @keyframes softFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-soft {
          opacity: 0;
          animation: softFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .fade-delay-1 { animation-delay: 0.08s; }
        .fade-delay-2 { animation-delay: 0.16s; }
        .fade-delay-3 { animation-delay: 0.22s; }

        .mobile-no-anim {
          opacity: 1 !important;
          animation: none !important;
          transform: none !important;
        }

        @media (max-width: 767px) {
          .fade-up-soft {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .audio-pill {
            transition: none;
          }
        }
      `}</style>

      <main className="page-bg relative w-full min-h-[100dvh] overflow-x-hidden text-white">
        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col py-5 md:py-6 min-h-[100dvh]">
          <AudioToggleClient />

          <div className="hidden md:flex flex-1 items-center">
            <div className="w-full grid md:grid-cols-[minmax(700px,1fr)_auto] gap-8 lg:gap-10 items-center">
              <div className="flex flex-col items-start gap-4 md:gap-5 max-w-[920px]">
                <div className="w-full">
                  <h1
                    className="text-white"
                    style={{
                      fontFamily: 'var(--font-cubano), "Arial Black", Impact, sans-serif',
                      fontWeight: 400,
                      fontSize: "clamp(42px, 4.2vw, 78px)",
                      lineHeight: "102%",
                      letterSpacing: "-0.03em",
                      maxWidth: "900px",
                      margin: 0,
                    }}
                  >
                    CUANDO LO PRUEBES
                    <span className="dot dot1">.</span>
                    <span className="dot dot2">.</span>
                    <span className="dot dot3">.</span>
                    <br />
                    LO VAS A ENTENDER.
                  </h1>
                </div>

                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-grold-rounded), sans-serif',
                      fontWeight: 400,
                      fontSize: "clamp(15px, 1.8vw, 32px)",
                      lineHeight: "106%",
                      letterSpacing: "-0.03em",
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    Dejanos tu mail y enterate primero
                    <br />
                    cuando llegue{" "}
                    <span
                      style={{
                        color: "#0FFF1E",
                        fontFamily: 'var(--font-cubano), "Arial Black", Impact, sans-serif',
                      }}
                    >
                      24SIETE.
                    </span>
                  </p>
                </div>

                <SubscribeFormClient />

                <div className="flex flex-col items-start gap-2 fade-up-soft fade-delay-2">
                  <span
                    className="social-label"
                    style={{
                      fontFamily: 'var(--font-grold-rounded), sans-serif',
                      fontSize: "clamp(14px, 1.3vw, 22px)",
                      letterSpacing: "-0.03em",
                      color: "#fff",
                    }}
                  >
                    Seguinos...
                  </span>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.tiktok.com/@24sietealfajores"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="social-icon flex items-center justify-center rounded-full bg-white"
                      style={{ width: "clamp(36px, 3.2vw, 50px)", height: "clamp(36px, 3.2vw, 50px)" }}
                    >
                      <Image src="/assets/logo_tiktok.svg" alt="TikTok" width={20} height={20} />
                    </a>

                    <a
                      href="https://www.instagram.com/24sietealfajores/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="social-icon flex items-center justify-center rounded-full bg-white"
                      style={{ width: "clamp(36px, 3.2vw, 50px)", height: "clamp(36px, 3.2vw, 50px)" }}
                    >
                      <Image src="/assets/logo_instagram.svg" alt="Instagram" width={20} height={20} />
                    </a>

                    <a
                      href="https://www.youtube.com/@24SieteAlfajores"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="social-icon flex items-center justify-center rounded-full bg-white"
                      style={{ width: "clamp(36px, 3.2vw, 50px)", height: "clamp(36px, 3.2vw, 50px)" }}
                    >
                      <Image src="/assets/logo_youtube.svg" alt="YouTube" width={20} height={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "clamp(420px, 36vw, 760px)",
                  height: "clamp(460px, 40vw, 860px)",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  className="absolute z-20 flex items-center justify-center fade-up-soft fade-delay-1"
                  style={{
                    top: "9%",
                    left: "8%",
                    transform: "rotate(-3deg)",
                    backgroundColor: "#0FFF1E",
                    borderRadius: 8,
                    border: "2px solid #110f10",
                    boxShadow: "3px 3px 0px #110f10",
                    padding: "clamp(6px, 0.6vw, 12px) clamp(12px, 1.2vw, 20px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-grold-rounded), sans-serif',
                      fontWeight: 500,
                      fontSize: "clamp(13px, 1.2vw, 22px)",
                      letterSpacing: "-0.04em",
                      color: "#110f10",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Proximamente...
                  </span>
                </div>

                <Image
                  src="/assets/Caja-N-con-alfajores.webp"
                  alt="Alfajor 24SIETE"
                  fill
                  priority
                  quality={82}
                  sizes="(max-width: 768px) 72vw, 42vw"
                  className="object-contain object-bottom"
                  style={{
                   transform: "translateY(-55px) scale(0.95)",
                    transformOrigin: "bottom center",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex md:hidden flex-col items-center gap-5 pt-5 pb-16">
            <div className="mobile-no-anim">
              <div
                className="inline-flex items-center justify-center px-5 py-2"
                style={{
                  transform: "rotate(-3deg)",
                  backgroundColor: "#0FFF1E",
                  borderRadius: 8,
                  border: "2px solid #110f10",
                  boxShadow: "3px 3px 0px #110f10",
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-grold-rounded), sans-serif',
                    fontWeight: 500,
                    fontSize: 17,
                    letterSpacing: "-0.04em",
                    color: "#110f10",
                    whiteSpace: "nowrap",
                  }}
                >
                  Proximamente...
                </span>
              </div>
            </div>

            <div className="w-full">
              <h1
                className="text-white text-left"
                style={{
                  fontFamily: 'var(--font-cubano), "Arial Black", Impact, sans-serif',
                  fontWeight: 400,
                  fontSize: "clamp(34px, 9vw, 54px)",
                  lineHeight: "105%",
                  letterSpacing: "-0.03em",
                  margin: 0,
                  paddingLeft: "4vw",
                }}
              >
                CUANDO LO PRUEBES
                <span className="dot dot1">.</span>
                <span className="dot dot2">.</span>
                <span className="dot dot3">.</span>
                <br />
                LO VAS A ENTENDER.
              </h1>
            </div>

            <div className="w-full flex justify-center">
              <div
                style={{
                  width: "min(80vw, 320px)",
                  aspectRatio: "1 / 1",
                  position: "relative",
                }}
              >
                <Image
                  src="/assets/Caja-N-con-alfajores.webp"
                  alt="Alfajor 24SIETE"
                  fill
                  priority
                  quality={82}
                  sizes="(max-width: 480px) 80vw"
                  className="object-contain"
                  style={{
                    transform: "translateY(-5px) scale(1.0)",
                    transformOrigin: "center",
                  }}
                />
              </div>
            </div>

            <div className="w-full text-center">
              <p
                style={{
                  fontFamily: 'var(--font-grold-rounded), sans-serif',
                  fontWeight: 400,
                  fontSize: "clamp(15px, 4.5vw, 20px)",
                  lineHeight: "110%",
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Dejanos tu mail y enterate primero
                <br />
                cuando llegue{" "}
                <span
                  style={{
                    color: "#0FFF1E",
                    fontFamily: 'var(--font-cubano), "Arial Black", Impact, sans-serif',
                  }}
                >
                  24SIETE.
                </span>
              </p>
            </div>

            <SubscribeFormClient mobile />

            <div className="flex flex-col items-center gap-2 mobile-no-anim">
              <span
                className="social-label"
                style={{
                  fontFamily: 'var(--font-grold-rounded), sans-serif',
                  fontSize: 18,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                Seguinos...
              </span>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.tiktok.com/@24sietealfajores"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="social-icon flex items-center justify-center rounded-full bg-white"
                  style={{ width: 44, height: 44 }}
                >
                  <Image src="/assets/logo_tiktok.svg" alt="TikTok" width={20} height={20} />
                </a>

                <a
                  href="https://www.instagram.com/24sietealfajores/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="social-icon flex items-center justify-center rounded-full bg-white"
                  style={{ width: 44, height: 44 }}
                >
                  <Image src="/assets/logo_instagram.svg" alt="Instagram" width={20} height={20} />
                </a>

                <a
                  href="https://www.youtube.com/@24SieteAlfajores"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="social-icon flex items-center justify-center rounded-full bg-white"
                  style={{ width: 44, height: 44 }}
                >
                  <Image src="/assets/logo_youtube.svg" alt="YouTube" width={20} height={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="shrink-0 mt-auto pt-5 pb-4 text-center w-full fade-up-soft fade-delay-3">
            <span
              style={{
                fontFamily: 'var(--font-grold-rounded), sans-serif',
                fontSize: "12px",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              © 2026 24SIETE. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </main>
    </>
  )
}