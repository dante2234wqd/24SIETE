import type { MetadataRoute } from "next"

const SITE_URL = "https://www.alfajor24siete.com.ar"

// Páginas indexables. Sin lastmod (no hay fechas reales de modificación) y sin
// /landing, que redirige de forma permanente a "/".
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/donde-estamos", "/faqs", "/activate", "/privacidad"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }))
}
