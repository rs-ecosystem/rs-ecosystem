import { AppsSection } from "@/components/sections/apps"
import { About, Cta, Faq, Principles, Stats, Tech } from "@/components/sections/content"
import { Hero } from "@/components/sections/hero"
import { Roadmap } from "@/components/sections/roadmap"

export default function Page() {
  return (
    <>
      <Hero />
      <Stats />
      <AppsSection />
      <Principles />
      <Tech />
      <Roadmap />
      <About />
      <Faq />
      <Cta />
    </>
  )
}
