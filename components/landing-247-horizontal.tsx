"use client"

// ─────────────────────────────────────────────────
//  24SIETE — Horizontal Editorial Landing Stage
//  Stage: 3359px × 873px | Position: absolute
//  All assets use Source URLs (blob CDN)
// ─────────────────────────────────────────────────

export default function Landing247Horizontal() {
  return (
    // ── Outer scroll wrapper ──────────────────────
    <div
      className="overflow-x-auto overflow-y-hidden"
      style={{ width: "100vw", height: "100vh", background: "#0a0a0a" }}
    >
      {/* ── Stage ─────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: 3359,
          height: 873,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >

        {/* ── 1. BACKGROUND ─────────────────────────── */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-247-lsWd9A5wL0F1XD1CWWgCuRpyYbEpTv.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 3359,
            height: 873,
            objectFit: "cover",
            zIndex: 1,
          }}
        />

        {/* ── 2. LOGO TOP LEFT ──────────────────────── */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_24SIETE-763F9MXWDBGbgG9D9rB5eXlsyu8VUo.svg"
          alt="24SIETE logo"
          style={{
            position: "absolute",
            left: 56,
            top: 34,
            width: 81,
            height: 83,
            zIndex: 10,
          }}
        />

        {/* ── 3. MAIN HERO IMAGE LEFT (stacked alfajores) ── */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen_principal_inicio-ewY7pC9CfdrundPdqgGTzfbS0EVGQq.png"
          alt="Stack of 24SIETE alfajores"
          style={{
            position: "absolute",
            left: -13,
            top: 69,
            width: 740,
            height: 679,
            objectFit: "contain",
            objectPosition: "left center",
            zIndex: 4,
          }}
        />

        {/* ── 4. FLOATING STICKER (alfajor + pulsera) ─── */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALFAJOR%20Y%20PULSERA%201-jQPMSh9qlo61v0o50GPteVwmfuCZH0.png"
          alt="24SIETE alfajor pack with wristbands"
          style={{
            position: "absolute",
            left: 508,
            top: 67.54,
            width: 228.83,
            height: 258.84,
            objectFit: "contain",
            transform: "rotate(8.43deg)",
            zIndex: 6,
            filter: "drop-shadow(4px 8px 16px rgba(0,0,0,0.6))",
          }}
        />

        {/* ── 5. WHITE BRUSH BEHIND TITLE ───────────── */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brush_blanco_donde%20estamos-yZAFCxUsKMT38Rwe1RoDyS835o3dTd.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 662.27,
            top: 114.53,
            width: 990.49,
            height: 187.43,
            objectFit: "fill",
            transform: "rotate(2.14deg)",
            zIndex: 3,
          }}
        />

        {/* ── 6. MAIN TITLE "DONDE ESTAMOS?" ──────────
              BlowBrush not available on Google Fonts — fallback to Impact/Arial Black
              which preserves the heavy condensed editorial feel.
        ────────────────────────────────────────────── */}
        <a
          href="#donde-estamos"
          style={{
            position: "absolute",
            left: 804,
            top: 178.63,
            width: 718,
            height: 98,
            transform: "rotate(2.68deg)",
            zIndex: 7,
            display: "block",
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 0.18s ease, transform 0.18s ease",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.opacity = "0.82"
            ;(e.currentTarget as HTMLAnchorElement).style.transform =
              "rotate(2.68deg) scale(1.015)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.opacity = "1"
            ;(e.currentTarget as HTMLAnchorElement).style.transform =
              "rotate(2.68deg) scale(1)"
          }}
        >
          <span
            style={{
              fontFamily: "'Impact', 'Arial Black', 'Oswald', sans-serif",
              fontWeight: 900,
              fontSize: 109.39,
              letterSpacing: "-0.03em",
              lineHeight: "90%",
              color: "#101010",
              whiteSpace: "nowrap",
              display: "block",
              textTransform: "uppercase",
            }}
          >
            DONDE ESTAMOS?
          </span>
        </a>

        {/* ── 7. LOCATION PIN ICON ──────────────────── */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Icono_Ubicacion-BrZW3HwXymcG5cS8uWR0qVAEQWULBU.png"
          alt="Location pin"
          style={{
            position: "absolute",
            left: 1515.35,
            top: 41.16,
            width: 167.69,
            height: 244.53,
            objectFit: "contain",
            transform: "rotate(2.46deg)",
            zIndex: 8,
            filter: "drop-shadow(0 4px 12px rgba(0,255,0,0.25))",
          }}
        />

        {/* ── WHITE BRUSH BEHIND PHOTO CARDS ──────────
              Using the wider brush asset under the three photo cards
        ────────────────────────────────────────────── */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brush_blanco_fotos-6ZSIUAX2CzynQ5LjIm3D6XyisEFJyo.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 680,
            top: 280,
            width: 1010,
            height: 440,
            objectFit: "fill",
            transform: "rotate(-0.6deg)",
            zIndex: 2,
          }}
        />

        {/* ── 8. PHOTO CARD 1 — KIOSCO ─────────────── */}
        <div
          style={{
            position: "absolute",
            left: 710.60,
            top: 324.63,
            width: 283.80,
            height: 364.89,
            transform: "rotate(-2.36deg)",
            zIndex: 5,
            boxShadow: "6px 8px 24px rgba(0,0,0,0.55)",
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Alfajores_kiosco-stHZ8K5D5dJ8m1V6MYUHgONdilVRRd.png"
            alt="24SIETE alfajores on a kiosk shelf"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* ── 9. PHOTO CARD 2 — MADRUGADA ──────────── */}
        <div
          style={{
            position: "absolute",
            left: 1011.34,
            top: 335.81,
            width: 283.80,
            height: 364.89,
            transform: "rotate(-0.53deg)",
            zIndex: 5,
            boxShadow: "6px 8px 24px rgba(0,0,0,0.55)",
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Madrugada-ElOYydir8rDVcatl0RpEvLQqjlzhb7.png"
            alt="Person eating 24SIETE alfajor at night"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* ── 10. PHOTO CARD 3 — PARCIAL ───────────── */}
        <div
          style={{
            position: "absolute",
            left: 1314.07,
            top: 338.23,
            width: 283.66,
            height: 363.40,
            transform: "rotate(3.70deg)",
            zIndex: 5,
            boxShadow: "6px 8px 24px rgba(0,0,0,0.55)",
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chica_parcial-f0uRu4oysFTGMeuu2N0cvZgMnQRiqG.png"
            alt="Student studying eating a 24SIETE alfajor"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* ── 11. GREEN LABEL — KIOSCO ─────────────── */}
        <div
          style={{
            position: "absolute",
            left: 807,
            top: 307.13,
            width: 120.75,
            height: 60.57,
            transform: "rotate(1.01deg)",
            zIndex: 7,
            background: "#39ff14",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "2px 3px 0px #000",
            border: "2px solid #000",
          }}
        >
          <span
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: "0.02em",
              color: "#000",
              textTransform: "uppercase",
            }}
          >
            KIOSCO
          </span>
        </div>

        {/* ── 12. GREEN LABEL — MADRUGADA ──────────── */}
        <div
          style={{
            position: "absolute",
            left: 1060,
            top: 312,
            width: 182,
            height: 60,
            transform: "rotate(-0.8deg)",
            zIndex: 7,
            background: "#39ff14",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "2px 3px 0px #000",
            border: "2px solid #000",
          }}
        >
          <span
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: "0.01em",
              color: "#000",
              textTransform: "uppercase",
            }}
          >
            MADRUGADA
          </span>
        </div>

        {/* ── 13. GREEN LABEL — PARCIAL ─────────────── */}
        {/* green sticker background */}
        <div
          style={{
            position: "absolute",
            left: 1415,
            top: 319,
            width: 120,
            height: 58,
            transform: "rotate(0.05deg)",
            zIndex: 7,
            background: "#39ff14",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "2px 3px 0px #000",
            border: "2px solid #000",
          }}
        >
          {/* PARCIAL text per spec */}
          <span
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: "-0.03em",
              lineHeight: "63%",
              color: "#000",
              textTransform: "uppercase",
            }}
          >
            PARCIAL...
          </span>
        </div>

        {/* ── 14. LOWER BULLET LIST ─────────────────── */}
        <div
          style={{
            position: "absolute",
            left: 390,
            top: 655,
            zIndex: 6,
          }}
        >
          {[
            "70G DE DECISIÓN",
            "MUCHO DULCE DE LECHE.",
            "CACAO SIN MIEDO.",
            "RÍO NEGRO, ARGENTINA",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 4,
              }}
            >
              {/* neon green bullet */}
              <span
                style={{
                  display: "inline-block",
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#39ff14",
                  flexShrink: 0,
                  boxShadow: "0 0 6px #39ff14",
                }}
              />
              <span
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: "0.01em",
                  color: "#f0f0f0",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* ── 15. BOTTOM NAV + CTA ──────────────────── */}
        <div
          style={{
            position: "absolute",
            left: 100,
            top: 778,
            zIndex: 9,
            display: "flex",
            alignItems: "center",
            gap: 36,
          }}
        >
          {/* nav items */}
          {["YO SOY 24SIETE", "¿DONDE ESTAMOS?", "FAQS"].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.06em",
                color: "#e8e8e8",
                textTransform: "uppercase",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "color 0.15s ease",
                opacity: 0.85,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#39ff14")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#e8e8e8")
              }
            >
              {label}
            </a>
          ))}

          {/* ACTIVATE CTA sticker */}
          <a
            href="#activate"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#39ff14",
              borderRadius: 10,
              border: "2.5px solid #000",
              boxShadow: "3px 3px 0px #000",
              padding: "8px 22px",
              transform: "rotate(-1.8deg)",
              textDecoration: "none",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.transform =
                "rotate(-1.8deg) scale(1.04)"
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "5px 5px 0px #000"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.transform =
                "rotate(-1.8deg) scale(1)"
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "3px 3px 0px #000"
            }}
          >
            <span
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontWeight: 900,
                fontSize: 15,
                letterSpacing: "0.06em",
                color: "#000",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              ACTIVATE
            </span>
          </a>
        </div>

        {/* ── RIGHT SIDE EXPANSION ZONE ─────────────────
              Section 2: Alfajores product close-up + Bariloche shot
              These extend the horizontal poster to the right.
        ────────────────────────────────────────────────── */}

        {/* Alfajores cut product shot */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALFAJORES%20FINAL-HIkwo4bhtrCruSdGhbydUMyLt80aH3.png"
          alt="24SIETE alfajor cross-section showing dulce de leche"
          style={{
            position: "absolute",
            left: 1740,
            top: 140,
            width: 520,
            height: 460,
            objectFit: "contain",
            zIndex: 5,
            filter: "drop-shadow(8px 12px 28px rgba(0,0,0,0.7))",
            transform: "rotate(-4deg)",
          }}
        />

        {/* Bariloche lifestyle photo */}
        <div
          style={{
            position: "absolute",
            left: 2280,
            top: 200,
            width: 320,
            height: 420,
            transform: "rotate(2.5deg)",
            zIndex: 5,
            boxShadow: "8px 10px 30px rgba(0,0,0,0.6)",
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FOTO%20BARILOCHE%20CON%20ALFAJOR%202-zwCJn0QRd0CoqP0Og02iajcM6hNrSd.png"
            alt="Person eating 24SIETE alfajor on a ski slope in Bariloche"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Argentina location icon near Bariloche photo */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ICONO%20DE%20UBICACION%20MAPA%20ARGENTINA-zxvl7GYUooF1ZkJyy0XhaUpKq1HnQy.png"
          alt="Argentina location pin"
          style={{
            position: "absolute",
            left: 2248,
            top: 160,
            width: 90,
            height: 120,
            objectFit: "contain",
            transform: "rotate(-5deg)",
            zIndex: 8,
            filter: "drop-shadow(0 4px 10px rgba(0,255,0,0.3))",
          }}
        />

        {/* Green arrow "SEGUINOS" */}
        <div
          style={{
            position: "absolute",
            left: 2620,
            top: 300,
            zIndex: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: "0.04em",
              color: "#39ff14",
              textTransform: "uppercase",
              textShadow: "0 0 18px rgba(57,255,20,0.4)",
            }}
          >
            SEGUINOS
          </span>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FLECHA_SEGUINOS-0dWgDzp1nIdbmXlAxqrA5SFtqSHc1B.png"
            alt="Follow us arrow"
            style={{
              width: 44,
              height: 44,
              objectFit: "contain",
              filter: "drop-shadow(0 0 8px rgba(57,255,20,0.6))",
            }}
          />
        </div>

        {/* HABLANOS icon + label */}
        <div
          style={{
            position: "absolute",
            left: 2720,
            top: 220,
            zIndex: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HABLANOS%201-ZwLdgrogKIGt37GTm3IKYkYnOrgNjq.png"
            alt="Contact us icon"
            style={{
              width: 80,
              height: 80,
              objectFit: "contain",
              filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.5))",
            }}
          />
          <span
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: "0.04em",
              color: "#39ff14",
              textTransform: "uppercase",
              textShadow: "0 0 14px rgba(57,255,20,0.35)",
            }}
          >
            HABLANOS
          </span>
        </div>

        {/* Donde estamos section anchor + copy block */}
        <div
          id="donde-estamos"
          style={{
            position: "absolute",
            left: 2860,
            top: 100,
            zIndex: 7,
          }}
        >
          {/* brush behind section title */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brush_blanco_donde%20estamos-yZAFCxUsKMT38Rwe1RoDyS835o3dTd.png"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: -60,
              top: -20,
              width: 600,
              height: 130,
              objectFit: "fill",
              transform: "rotate(-1.5deg)",
              zIndex: -1,
            }}
          />
          <span
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 70,
              letterSpacing: "-0.03em",
              lineHeight: "90%",
              color: "#101010",
              whiteSpace: "nowrap",
              display: "block",
              textTransform: "uppercase",
              transform: "rotate(-1.5deg)",
              position: "relative",
            }}
          >
            DONDE ESTAMOS?
          </span>
        </div>

        {/* Large location pin for the section */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Icono_Ubicacion-BrZW3HwXymcG5cS8uWR0qVAEQWULBU.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 3040,
            top: 200,
            width: 130,
            height: 190,
            objectFit: "contain",
            transform: "rotate(3deg)",
            zIndex: 8,
            filter: "drop-shadow(0 4px 14px rgba(0,255,0,0.3))",
          }}
        />

        {/* Location text list */}
        <div
          style={{
            position: "absolute",
            left: 2900,
            top: 280,
            zIndex: 7,
          }}
        >
          {[
            "BARILOCHE, RÍO NEGRO",
            "BUENOS AIRES",
            "CÓRDOBA",
            "ROSARIO",
            "MENDOZA",
          ].map((place) => (
            <div
              key={place}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#39ff14",
                  flexShrink: 0,
                  boxShadow: "0 0 6px #39ff14",
                }}
              />
              <span
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "0.03em",
                  color: "#e0e0e0",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {place}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom white floor strip */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brush_blanco_fotos-6ZSIUAX2CzynQ5LjIm3D6XyisEFJyo.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            bottom: -30,
            width: 3359,
            height: 200,
            objectFit: "fill",
            objectPosition: "bottom",
            zIndex: 2,
            opacity: 0.18,
          }}
        />

      </div>
    </div>
  )
}
