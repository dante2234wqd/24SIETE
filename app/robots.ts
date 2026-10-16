import type { MetadataRoute } from "next"

// robots.txt: permite todo y apunta al sitemap
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.alfajor24siete.com.ar/sitemap.xml",
  }
}
