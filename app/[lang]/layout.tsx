import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "../globals.css"
import { Footer, Navbar } from "@/components/site/layout"
import { HashScroller } from "@/components/site/scroll-link"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { getSite, site } from "@/content/site"
import { htmlLang, localeHref, locales, ogLocale } from "@/lib/i18n"
import { getLocale } from "@/lib/locale"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Indonesian is served at "/" and English at "/en" (rewrites in next.config.ts).
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale()
  const { title, description } = getSite(lang)
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description,
    alternates: {
      canonical: localeHref(lang, "/"),
      languages: { id: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      siteName: site.name,
      title,
      description,
    },
  }
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLocale()
  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <HashScroller />
          </TooltipProvider>
        </ThemeProvider>
        {/* Vercel Web Analytics: cookieless, aggregate page views (enable it in the Vercel project). */}
        <Analytics />
      </body>
    </html>
  )
}
