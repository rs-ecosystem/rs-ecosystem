# Rs Ecosystem

Landing page and portfolio for the Rs apps (Rs Finance, Rs Password and the coming-soon apps). Next.js 16 (App Router, Cache Components) + Tailwind v4 + shadcn/ui `base-nova`. It is designed in Penpot first (`design/README.md`) and hosted on Vercel's free plan, with no backend of its own.

```bash
npm install
cp .env.example .env.local   # add GITHUB_TOKEN to see real release data locally
npm run dev                  # http://localhost:3000
npm run build && npm run lint && npm run typecheck
```

## Where the data comes from

| What | Source | How it updates |
|---|---|---|
| Copy: hero, apps, coming-soon apps, principles, roadmap, profile, FAQ | `content/site.ts`, `content/apps.ts` | Edit, commit, push. Vercel redeploys. |
| Version badge, "… sudah tersedia" pill, download menu | **GitHub Releases** of each app repo (newest non-draft release) | Hourly cache, plus the deploy hook below |
| `/changelog` | Release notes (Markdown) of every release | Same as above |
| Roadmap progress bar | **GitHub Milestone** whose title matches `source.milestone` in `content/site.ts` (closed vs total issues) | Same as above |

- `lib/github/data.ts` fetches with `'use cache'`. A good reply is cached for an hour (`cacheLife('hours')`); a failure (no token, network, rate limit) returns `null` and is cached only for minutes. The UI then falls back to `fallback` in `content/apps.ts` or to the roadmap item as written, so a page is never empty.
- **Downloads from private repos:** `/unduh/[app]/[asset]` (`app/unduh/…/route.ts`) checks that the asset belongs to a published release, asks GitHub for a short-lived signed URL with the server-side token, and redirects there. The file goes straight from GitHub to the visitor, so it uses no Vercel bandwidth, and the token never reaches the browser.
- Asset names are recognised by `classifyAsset` in `lib/release.ts`: `.apk` (arm64-v8a is the recommended one), `.dmg`, and `*chrome*.zip`. Any other file is not offered.

## Deploying on Vercel

1. Import the repo in Vercel (framework: Next.js; no settings to change).
2. **Environment variable `GITHUB_TOKEN`:** a fine-grained personal access token limited to `rs-finance` and `rs-password`, with **Contents: Read** (releases and downloads) and **Issues: Read** (milestones). Set an expiry date and renew it before it lapses. The site falls back gracefully if it expires.
3. Optionally set `NEXT_PUBLIC_SITE_URL` once a custom domain is used.
4. **Instant updates:** create a Deploy Hook (Vercel → Settings → Git → Deploy Hooks). In each app repo, add it as the secret `VERCEL_DEPLOY_HOOK_URL` and copy `docs/github/notify-website.yml` to `.github/workflows/`. Publishing a release or changing a milestone then rebuilds the site.

## Making changes

- **New live app:** add it to `liveApps` (repo, platforms, screen, fallback). If it needs its own phone screenshot, add it to `components/mock/phone.tsx`.
- **New coming-soon app:** add it to `upcomingApps`.
- **Store preview (section "Preview"):** each live app's `gallery` points at `public/store/<slug>/` — the Mac banner, six phone screenshots, the store hero (1920×1080) and the feature graphic (1024×500), exported from Penpot's "Store preview" page, converted to WebP (`cwebp -q 86 -m 6`). Replace the files (same names) to update them.
- **Roadmap item with live progress:** add `source: { type: "milestone", app: "<slug>", milestone: "<milestone title>" }`. Use `{ type: "latest-release", app }` to show the newest release instead.
- **Waitlist / "Kabari saya":** `links.waitlist` in `content/site.ts` is a `mailto:` for now; swap in a Tally or Formspree URL when you have one.
- Use `buttonClass()` (`lib/button-class.ts`) for links styled as buttons. It merges classes the way `<Button>` does, which plain `buttonVariants()` does not.
