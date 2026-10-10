import { Container, SectionHeading } from "@/components/site/layout"
import { previewApps } from "@/content/apps"
import { getUi } from "@/content/ui"
import { getLocale } from "@/lib/locale"

import { Gallery } from "./gallery"

export async function Preview() {
  const lang = await getLocale()
  const t = getUi(lang).preview
  return (
    <section id="preview" className="border-b py-14 md:py-28">
      <Container>
        <Gallery
          apps={previewApps(lang)}
          heading={
            <SectionHeading kicker={t.kicker} title={t.title}>
              {t.body}
            </SectionHeading>
          }
        />
      </Container>
    </section>
  )
}
