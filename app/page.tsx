import { AppsSection } from "@/components/sections/apps"
import { About, Cta, Faq, Principles, Stats, Tech } from "@/components/sections/content"
import { Hero } from "@/components/sections/hero"
import { Preview } from "@/components/sections/preview"
import { PreviewProvider } from "@/components/sections/preview-lightbox"
import { previewApps } from "@/content/apps"
import { Roadmap } from "@/components/sections/roadmap"

export default function Page() {
  return (
    <PreviewProvider apps={previewApps()}>
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
