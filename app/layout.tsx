import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { Footer, Navbar } from "@/components/site/layout"
import { HashScroller } from "@/components/site/scroll-link"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", locale: "id_ID", siteName: site.name, title: site.title, description: site.description },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
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
