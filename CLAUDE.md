@AGENTS.md

# Rs Ecosystem

Landing page and portfolio for the Rs app family (Rs Finance in `../rs-app`, Rs Password in `../rs-password`, plus the coming-soon apps). Next.js (App Router) + Tailwind v4 + shadcn/ui.

- **Design first:** the screens are designed in the Penpot file "Rs Ecosystem", page "07 · Landing Page" (`design/README.md`). Build from that design; never edit the Rs Password / Rs Finance Penpot files from here.
- **Design system:** shadcn/ui `base-nova` style (Base UI), neutral, Geist, Lucide — the same as the native apps. Colors in `app/globals.css` mirror `design/tokens.json` (shared with both apps, plus `success` / `warning`); keep them in sync. Add components with `npx shadcn@latest add <name>`.
- UI copy is bilingual: Indonesian (default, at `/`) and English (at `/en`). Write copy as `tx(id, en)` in `content/` (`site.ts`, `apps.ts`, `ui.ts`); never hardcode user-facing text in components. Server components read the locale with `getLocale()`; client components get strings via props. Build links with `localeHref()`. New pages go in `app/[lang]/` plus a rewrite in `next.config.ts`. Code, comments and commit messages stay in English.

- **No backend:** copy lives in `content/`; app versions, release notes, downloads and roadmap progress come from the private app repos' GitHub Releases / Milestones via `lib/github/data.ts` (`'use cache'`, hourly; failures return `null` and fall back to `content/`). Private release files are served by redirecting to GitHub's signed URL (`app/unduh/[app]/[asset]/route.ts`). Never expose `GITHUB_TOKEN` to client code. Details: `README.md`.
- Cache Components is on: don't read the clock, `Math.random()` or request data outside a cached scope or `connection()`.
- Links styled as buttons use `buttonClass()` (`lib/button-class.ts`), not bare `buttonVariants()`.

Commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`.
