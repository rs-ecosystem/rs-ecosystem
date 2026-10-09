import { DownloadIcon, MailIcon } from "lucide-react"
import type { ReactNode } from "react"

import { AppIcon, GithubIcon, LinkedinIcon } from "@/components/brand/icons"
import { buttonClass } from "@/lib/button-class"
import { Separator } from "@/components/ui/separator"
import { links, nav, site } from "@/content/site"
import { cn } from "@/lib/utils"

import { MobileNav } from "./mobile-nav"
import { ScrollLink } from "./scroll-link"
import { ThemeToggle } from "./theme-toggle"

/** Content column: 1200 wide on desktop (the design's 120 px side padding at 1440). */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 md:px-8 xl:px-0", className)}>{children}</div>
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
      <span className="h-0.5 w-4 rounded-full bg-foreground" />
      {children}
    </span>
  )
}

export function SectionHeading({
  kicker,
  title,
  children,
  className,
  size = "lg",
}: {
  kicker: string
  title: string
  children?: ReactNode
  className?: string
  size?: "lg" | "md"
}) {
  return (
    <div className={cn("flex max-w-[720px] flex-col gap-3.5", className)}>
      <Kicker>{kicker}</Kicker>
      <h2 className={cn("font-semibold tracking-[-0.02em] text-balance", size === "lg" ? "text-[28px] leading-[1.15] md:text-[40px]" : "text-[28px] leading-[1.15] md:text-4xl")}>
        {title}
      </h2>
      {children && <p className="text-base leading-relaxed text-pretty text-muted-foreground md:text-[17px]">{children}</p>}
    </div>
  )
}

export function Brand({ size = 32 }: { size?: number }) {
  return (
    <ScrollLink href="/" className="flex items-center gap-2.5 font-semibold">
      <AppIcon size={size} />
      <span className="text-[15px] md:text-base">{site.name}</span>
    </ScrollLink>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <Container className="flex h-14 items-center justify-between md:h-[68px]">
        <Brand />
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <ScrollLink key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </ScrollLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={cn(buttonClass({ variant: "ghost", size: "icon" }), "hidden md:inline-flex")}>
            <GithubIcon />
          </a>
          <ThemeToggle />
          <ScrollLink href="/#aplikasi" className={cn(buttonClass(), "hidden md:inline-flex")}>
            <DownloadIcon data-icon="inline-start" />
            Unduh aplikasi
          </ScrollLink>
          <div className="lg:hidden">
            <MobileNav items={nav} />
          </div>
        </div>
      </Container>
    </header>
  )
}

const footerColumns = [
  { title: "Aplikasi", items: [["Rs Finance", "/#aplikasi"], ["Rs Password", "/#aplikasi"], ["Segera hadir", "/#segera-hadir"], ["Roadmap", "/#roadmap"]] },
  { title: "Sumber", items: [["Catatan perubahan", "/changelog"], ["Prinsip", "/#prinsip"], ["Teknologi", "/#teknologi"], ["FAQ", "/#faq"]] },
  { title: "Kontak", items: [["Email", `mailto:${links.email}`], ["GitHub", links.github], ["LinkedIn", links.linkedin]] },
]

export function Footer() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-10 pt-10 pb-10 md:gap-12 md:pt-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex max-w-[300px] flex-col gap-4">
            <Brand />
            <p className="text-sm leading-relaxed text-muted-foreground">Aplikasi pribadi yang offline, terenkripsi, dan tetap milik Anda.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-20">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <span className="text-sm font-semibold">{col.title}</span>
                {col.items.map(([label, href]) =>
                  href.startsWith("http") ? (
                    <a key={label} href={href} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {label}
                    </a>
                  ) : (
                    <ScrollLink key={label} href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {label}
                    </ScrollLink>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[13px] text-muted-foreground">© {site.since} {site.name}. Dibuat dengan Rust di Indonesia.</p>
          <div className="flex gap-1 text-muted-foreground">
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={buttonClass({ variant: "ghost", size: "icon" })}><GithubIcon /></a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={buttonClass({ variant: "ghost", size: "icon" })}><LinkedinIcon /></a>
            <a href={`mailto:${links.email}`} aria-label="Email" className={buttonClass({ variant: "ghost", size: "icon" })}><MailIcon /></a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
