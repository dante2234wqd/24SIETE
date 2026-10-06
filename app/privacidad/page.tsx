import type { Metadata } from "next"
import Link from "next/link"

// ─────────────────────────────────────────────────
//  24SIETE — Política de privacidad
//  Página de texto simple: fondo negro liso y tipografías de la
//  marca, una sola columna de lectura (máx. 720px).
// ─────────────────────────────────────────────────

export const metadata: Metadata = {
  // absolute: para que no se le aplique la plantilla "%s | 24SIETE" del layout
  title: { absolute: "Política de privacidad – 24SIETE" },
  alternates: { canonical: "/privacidad" },
}

const CONTACT_EMAIL = "hola@alfajor24siete.com.ar"

const titleFont = "var(--font-cubano), 'Impact', 'Arial Black', sans-serif"
const textFont = "var(--font-grold-rounded), Arial, Helvetica, sans-serif"

const h2Style: React.CSSProperties = {
  fontFamily: titleFont,
  fontWeight: 900,
  fontSize: "clamp(1.25rem, 4.5vw, 1.6rem)",
  letterSpacing: "0.02em",
  lineHeight: 1.15,
  color: "#42ab0c",
  textTransform: "uppercase",
  margin: "44px 0 14px",
}

const pStyle: React.CSSProperties = { margin: "0 0 14px" }

const ulStyle: React.CSSProperties = {
  margin: "0 0 14px",
  paddingLeft: 22,
  listStyle: "disc",
  display: "flex",
  flexDirection: "column",
  gap: 8,
}

const linkStyle: React.CSSProperties = { color: "#42ab0c", textDecoration: "underline", textUnderlineOffset: 3 }

function MailLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>
      {CONTACT_EMAIL}
    </a>
  )
}

export default function PrivacidadPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        // fondo negro liso, sin textura ni efectos, para que el texto se lea limpio
        backgroundColor: "#1f140f",
        color: "rgba(255,255,255,0.88)",
        fontFamily: textFont,
        fontSize: 16,
        lineHeight: 1.65,
      }}
    >
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 88px" }}>
        <Link href="/landing" style={{ ...linkStyle, fontWeight: 700, fontSize: 14 }}>
          ← Volver a 24SIETE
        </Link>

        <h1
          style={{
            fontFamily: titleFont,
            fontWeight: 900,
            fontSize: "clamp(2.1rem, 8vw, 3.2rem)",
            letterSpacing: "0.01em",
            lineHeight: 1,
            color: "#ffffff",
            textTransform: "uppercase",
            margin: "32px 0 12px",
          }}
        >
          Política de privacidad
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
          Última actualización: 1 de octubre de 2026
        </p>

        <h2 style={h2Style}>1. Quiénes somos</h2>
        <p style={pStyle}>
          Esta política aplica al sitio alfajor24siete.com.ar y a los canales de contacto de la marca 24SIETE. El
          responsable de los datos es CABLIER S.A., CUIT 30-71935074-3, con domicilio en Suipacha 976, piso 8, (C1008)
          Ciudad Autónoma de Buenos Aires, Argentina. Contacto: <MailLink />.
        </p>

        <h2 style={h2Style}>2. Qué datos recopilamos</h2>
        <ul style={ulStyle}>
          <li>
            Datos que nos das en el formulario: nombre, email, número de WhatsApp, tipo de cliente (kiosco,
            distribuidor, mayorista), zona y el mensaje que escribas.
          </li>
          <li>Tu consentimiento para que te contactemos por WhatsApp.</li>
          <li>Los mensajes que intercambies con nosotros por WhatsApp o email.</li>
          <li>Datos de navegación recopilados mediante cookies y herramientas de medición (ver punto 5).</li>
        </ul>

        <h2 style={h2Style}>3. Para qué los usamos</h2>
        <ul style={ulStyle}>
          <li>Responder tu consulta y enviarte información comercial sobre nuestros productos.</li>
          <li>Contactarte por WhatsApp, solo si nos diste tu consentimiento.</li>
          <li>Registrar y organizar las consultas para darles seguimiento.</li>
          <li>
            Clasificar y responder consultas de forma automatizada, con ayuda de herramientas de inteligencia
            artificial (por ejemplo, para saber si corresponde a un comercio o a un consumidor final y derivarla a la
            persona adecuada). Esta clasificación no genera decisiones con efectos legales sobre vos y siempre podés
            pedir hablar con una persona.
          </li>
          <li>Medir el uso del sitio y mejorar nuestras campañas publicitarias.</li>
        </ul>
        <p style={pStyle}>No vendemos ni alquilamos tus datos.</p>

        <h2 style={h2Style}>4. Con quién los compartimos</h2>
        <p style={pStyle}>
          Para prestar el servicio usamos proveedores que tratan los datos por cuenta nuestra:
        </p>
        <ul style={ulStyle}>
          <li>Meta Platforms (WhatsApp Business y Meta Pixel).</li>
          <li>Google (Google Workspace, Google Sheets y Google Analytics).</li>
          <li>n8n (automatización del envío y registro de consultas).</li>
          <li>
            Proveedores de inteligencia artificial para clasificar y responder consultas (por ejemplo, OpenAI, Google
            Gemini o Anthropic Claude).
          </li>
          <li>Vercel (alojamiento del sitio).</li>
        </ul>
        <p style={pStyle}>
          Algunos de estos proveedores procesan los datos en servidores fuera de Argentina, por ejemplo en Estados
          Unidos o la Unión Europea. Al enviarnos tus datos aceptás esa transferencia, que realizamos con proveedores
          que aplican medidas de seguridad adecuadas.
        </p>

        <h2 style={h2Style}>5. Cookies y medición</h2>
        <p style={pStyle}>
          Usamos Google Analytics para conocer cómo se usa el sitio y Meta Pixel para medir y mejorar nuestros
          anuncios en Facebook e Instagram. Estas herramientas pueden usar cookies e identificadores del dispositivo.
          Podés bloquear o borrar las cookies desde la configuración de tu navegador, y administrar tus preferencias
          de anuncios en tu cuenta de Meta y de Google.
        </p>

        <h2 style={h2Style}>6. Cuánto tiempo los guardamos</h2>
        <p style={pStyle}>
          Conservamos los datos mientras sean necesarios para responder tu consulta y mantener la relación comercial,
          o hasta que nos pidas borrarlos.
        </p>

        <h2 style={h2Style}>7. Tus derechos</h2>
        <p style={pStyle}>
          Podés pedir en cualquier momento acceder, rectificar, actualizar o suprimir tus datos, y retirar tu
          consentimiento para ser contactado por WhatsApp, escribiendo a <MailLink />. También podés dejar de recibir
          mensajes de WhatsApp respondiendo &quot;BAJA&quot;.
        </p>
        <p style={pStyle}>
          El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma
          gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto
          conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326.
        </p>
        <p style={pStyle}>
          LA AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326,
          tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus
          derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.
        </p>
        <p style={pStyle}>
          Agencia de Acceso a la Información Pública – Av. Pte. Gral. Julio A. Roca 710, 3er piso, CABA –{" "}
          <a href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            www.argentina.gob.ar/aaip
          </a>
        </p>

        <h2 style={h2Style}>8. Seguridad</h2>
        <p style={pStyle}>
          Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra accesos no autorizados,
          pérdida o alteración.
        </p>

        <h2 style={h2Style}>9. Menores</h2>
        <p style={pStyle}>El sitio y nuestros canales comerciales no están dirigidos a menores de 18 años.</p>

        <h2 style={h2Style}>10. Cambios</h2>
        <p style={pStyle}>
          Podemos actualizar esta política. Vamos a publicar la versión vigente en esta página con su fecha de
          actualización.
        </p>
      </main>
    </div>
  )
}
