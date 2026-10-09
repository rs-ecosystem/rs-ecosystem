import { Container, SectionHeading } from "@/components/site/layout"
import { previewApps } from "@/content/apps"

import { Gallery } from "./gallery"

export function Preview() {
  return (
    <section id="preview" className="border-b py-14 md:py-28">
      <Container>
        <Gallery
          apps={previewApps()}
          heading={
            <SectionHeading kicker="Preview" title="Lihat lebih dekat.">
              Cuplikan langsung dari aplikasinya, di ponsel dan Mac. Ketuk gambar untuk memperbesar.
            </SectionHeading>
          }
        />
      </Container>
    </section>
  )
}
