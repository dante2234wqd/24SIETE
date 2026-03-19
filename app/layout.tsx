import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.alfajor24siete.com.ar'),
  title: {
    default: '24SIETE — Cuando te pinte, estoy.',
    template: '%s | 24SIETE',
  },
  description:
    '24SIETE — Alfajor negro premium de 72g en Argentina. Cacao intenso, mucho dulce de leche y una propuesta pensada para acompañarte a cualquier hora. Sumate al lanzamiento y enterate primero.',
  applicationName: '24SIETE',
  keywords: [
    '24SIETE', 'alfajor', 'alfajor negro', 'alfajor premium',
    'alfajor negro 72g', 'alfajores argentinos', 'dulce de leche',
    'cacao', 'alfajor artesanal', 'Argentina',
  ],
  authors: [{ name: '24SIETE' }],
  creator: '24SIETE',
  publisher: '24SIETE',
  category: 'food',
  generator: 'v0.app',
  verification: {
    google: 'UKdvMuBWyyPK5RlGGfvNFC1qZ-nC4jGg151YMlldtVM',
  },
  alternates: { canonical: '/' },
  openGraph: {
    title: '24SIETE — Alfajor negro premium de 72g en Argentina',
    description: 'Cacao intenso, mucho dulce de leche y una propuesta pensada para acompañarte a cualquier hora. Sumate al lanzamiento y enterate primero.',
    url: 'https://www.alfajor24siete.com.ar',
    siteName: '24SIETE',
    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: '24SIETE — Alfajor negro premium' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '24SIETE — Alfajor negro premium de 72g en Argentina',
    description: 'Cacao intenso, mucho dulce de leche y una propuesta pensada para acompañarte a cualquier hora.',
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
      { url: '/icon-192.png',      sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png',      sizes: '512x512', type: 'image/png' },
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
      <head>
        {/* Preload fuentes críticas — evita bloqueo de renderizado */}
        <link rel="preload" href="/fonts/Cubano.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GroldRounded-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        {/* Preload imagen de fondo — mejora LCP */}
        <link rel="preload" href="/assets/background_proximamente.webp" as="image" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
