import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { MusicProvider } from '@/components/24siete/music-provider'
import MetaPixel from '@/components/MetaPixel'
import './globals.css'

// Google Analytics 4: solo se carga si la variable existe (en local no está,
// así no se ensucian los datos)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const cubano = localFont({
  src: '../public/fonts/Cubano.woff2',
  display: 'swap',
  variable: '--font-cubano',
})

const groldRounded = localFont({
  src: [
    {
      path: '../public/fonts/GroldRounded-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/GroldRounded-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-grold-rounded',
})

const sora = Sora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  // solo la usa "¿Dónde estamos?": sin preload se descarga recién en la página
  // que la usa, en vez de precargarse en todas
  preload: false,
  variable: '--font-sora',
})

// Título y descripción de la home (también para Open Graph y Twitter). El
// título va sin la plantilla "| 24SIETE": ya empieza con la marca.
const HOME_TITLE = '24SIETE | Alfajor negro y blanco – Cuando te pinte, estoy'
const HOME_DESCRIPTION =
  'Doble capa, mucho dulce de leche y cacao sin miedo: 24SIETE es el alfajor negro y blanco de 70 g para cualquier hora. Cuando te pinte, estoy.'

// Datos estructurados (JSON-LD). Si alguna constante queda vacía, el <script>
// no se renderiza: así nunca se publican datos incompletos.
const SITE_URL = 'https://www.alfajor24siete.com.ar'
const INSTAGRAM_URL = 'https://www.instagram.com/24sietealfajores'
const LOGO_URL = 'https://www.alfajor24siete.com.ar/icon-512.png'
const JSON_LD =
  SITE_URL && INSTAGRAM_URL && LOGO_URL
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: '24SIETE',
            url: SITE_URL,
            logo: LOGO_URL,
            sameAs: [INSTAGRAM_URL],
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: '24SIETE',
            url: SITE_URL,
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
        ],
      }
    : null

export const metadata: Metadata = {
  metadataBase: new URL('https://www.alfajor24siete.com.ar'),
  title: {
    default: HOME_TITLE,
    template: '%s | 24SIETE',
  },
  description: HOME_DESCRIPTION,
  applicationName: '24SIETE',
  keywords: [
    '24SIETE',
    'alfajor',
    'alfajor negro',
    'alfajor premium',
    'alfajor negro 70g',
    'alfajores argentinos',
    'dulce de leche',
    'cacao',
    'alfajor artesanal',
    'Argentina',
  ],
  authors: [{ name: '24SIETE' }],
  creator: '24SIETE',
  publisher: '24SIETE',
  category: 'food',
  generator: 'v0.app',
  verification: {
    google: 'UKdvMuBWyyPK5RlGGfvNFC1qZ-nC4jGg151YMlldtVM',
  },
  // verificación de dominio de Meta (Business Manager)
  other: {
    'facebook-domain-verification': 'uhgdzhg2k452gkg800yzhm05e8ppq1',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://www.alfajor24siete.com.ar',
    siteName: '24SIETE',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: '24SIETE — Alfajor negro premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ['/icon-512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${cubano.variable} ${groldRounded.variable} ${sora.variable} font-sans antialiased`}
      >
        {JSON_LD ? (
          <script
            type="application/ld+json"
            // contenido fijo definido arriba (no viene del usuario)
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
          />
        ) : null}
        <MusicProvider>{children}</MusicProvider>
        <Analytics />
        <MetaPixel />
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  )
}