import { AppsSection } from "@/components/sections/apps"
import { About, Cta, Faq, Principles, Stats, Tech } from "@/components/sections/content"
import { Hero } from "@/components/sections/hero"
import { Preview } from "@/components/sections/preview"
import { PreviewProvider } from "@/components/sections/preview-lightbox"
import { Roadmap } from "@/components/sections/roadmap"
import { previewApps } from "@/content/apps"
import { getUi } from "@/content/ui"
import { getLocale } from "@/lib/locale"

export default async function Page() {
  const lang = await getLocale()
  return (
    <PreviewProvider apps={previewApps(lang)} strings={getUi(lang).preview}>
      <Hero />
      <Stats />
      <AppsSection />
      <Preview />
      <Principles />
      <Tech />
      <Roadmap />
      <About />
      <Faq />
      <Cta />
    </PreviewProvider>
  )
}
