# Team SAMMARD Website

Next.js 16 (App Router) site for Team SAMMARD, VIT Vellore. Fully static content plus Next's image optimizer — no database, API routes, forms or environment variables.

Design/stack/conventions → [ARCHITECTURE.md](ARCHITECTURE.md) · state of work → [PROGRESS.md](PROGRESS.md) · real content still needed → [ASSETS_NEEDED.md](ASSETS_NEEDED.md).

## Run locally

Requires Node 20.9+ (developed on 22) and npm.

```bash
npm ci          # install exact lockfile versions
npm run dev     # http://localhost:3000
npm run lint    # must be warning-free before a deploy
npm run build   # production build; must pass (all routes prerender)
npm start       # serve the production build locally
```

If dev/build misbehaves after editing `next.config.ts` or moving the folder, delete `.next/` and retry.

## Hosting (Vercel)

Production is on Vercel (Hobby plan): `team-sammard-website.vercel.app`, project `team-sammard-website`. Any host that runs `next build` + `next start` works, but Vercel is the tested path (the image optimizer and cache headers in `next.config.ts` assume it).

### Option A — Git integration (recommended)

1. Vercel dashboard → **Add New → Project** → import `Rohan2831/sammard-website`.
2. Framework preset **Next.js** (auto-detected). Build `next build`, install `npm install`, output default. No environment variables needed.
3. Production branch: `master`. Every push to `master` deploys to production; other branches get preview URLs.
4. **Add a custom domain**: Project → Settings → Domains → add it, then create the DNS records Vercel shows (an `A`/`CNAME` at the registrar). HTTPS is automatic.

### Option B — CLI

```bash
npm i -g vercel
vercel link            # once; pick the team-sammard-website project
vercel                 # preview deploy
vercel --prod          # production deploy
```

### Hobby-plan gotchas (these have bitten us)

- **Commit author must be the Vercel account owner.** Deployments whose commit author isn't on the Vercel team are marked `BLOCKED` (`TEAM_ACCESS_REQUIRED`) — this silently failed every deploy from 2026-09-22 to 2026-10-05. Hobby can't add members, so deploy commits must be authored with the Vercel account's email (`git config user.email`). To diagnose a stuck deploy, read `readyState` / `readyStateReason` from the Vercel API (`vercel api /v13/deployments/<id>`); `vercel inspect` only shows `UNKNOWN`. On Windows Git Bash prefix with `MSYS_NO_PATHCONV=1`.
- **Keep uploads small.** `.vercelignore` excludes `reference-material/` (hundreds of MB of originals) and the blueprint `.docx`. Without it the CLI upload stalls. The folder is also gitignored (the PTR PDF alone exceeds GitHub's 100 MB limit) — back it up outside git.
- Keep individual files modest: compress videos (`shared/videos/rudra-testing.mp4` is 34 MB) and PDFs before adding them.

### Other hosts

`npm run build && npm start` on any Node 20.9+ server (needs `sharp`, which `next` installs, for image optimization). Put a CDN/reverse proxy in front and honour the `Cache-Control` headers from `next.config.ts`. Static export (`output: "export"`) is **not** supported as-is because the image optimizer is in use.

## Maintaining content

Most updates need no code beyond a data file or a dropped-in image. Then: `npm run lint && npm run build`, commit, push (redeploys).

| To change | Edit |
|---|---|
| Rockets, specs, subsystems | `src/data/rockets.ts` |
| Competitions / events pages | `src/data/competitions.ts`, `src/data/events.ts` |
| Timeline | `src/data/timeline.ts` |
| Board members (per year) | `src/data/board-members.ts` + photo `public/assets/about/board/<person-name>.jpg` |
| Departments | `src/data/departments.ts` + `public/assets/departments/<slug>.jpg` |
| Sponsors, tiers, packages | `src/data/sponsors.ts` + logo in `public/assets/shared/sponsors/` |
| CanSats, R&D, documents (PTRs) | `src/data/cansats.ts`, `rnd.ts`, `documents.ts` |
| Contact email / phone / socials | `contactInfo` in `src/data/navigation.ts` (also feeds the footer) |
| Home copy | `whoweare.ts`, `teaminaction.ts`, `about.ts` |

Types live in `src/types/index.ts`. Never invent facts: use `"— TBD"` and log the gap in `ASSETS_NEEDED.md`.

### Swapping and adding media

- **Replace a photo/logo/video:** overwrite the file in `public/assets/<page>/` under the **same name**. Any size or aspect works (`SwapImage` crops/fits and the optimizer recompresses). Returning visitors see it within a week (cache header).
- **Gallery and event photos are list-driven:** drop the file in `gallery/` or `events/<slug>/` and add one line to that folder's `images.txt` — `file | alt | category?`. No code change. Videos (`.mp4/.webm/.mov`) are listed the same way.
- **Board photos** are matched by name (`about/board/<person-name>.jpg`, also `.png/.webp`); a placeholder shows if none exists.
- **Report PDFs** go in `public/assets/documentation/` and are linked via `documents.ts` / `reportUrls` in `events.ts` (view-only in the browser PDF viewer). Compress first.
- Other folders' `images.txt` are `[have]/[MISSING]` checklists — keep them in sync if you add or rename a slot in code.
- Original/raw files belong in `reference-material/`, not `public/`.

### 3D rocket (Udbhava)

Models live in `public/assets/shared/models/`; the Draco decoder is self-hosted in `public/vendor/draco/`. Replacing a GLB needs matching part names — see ARCHITECTURE.md "3D rocket model" before touching it.

## Routine upkeep

- **Each season:** add the new board year, events, results, rocket and sponsors; update the timeline; archive the PTR into `documentation/`.
- **Dependencies:** `npm outdated`; upgrade `next` / `react` together and re-run `npm run build`. Don't add dependencies without need. Commit `package-lock.json`.
- **Before every deploy:** `npm run lint` clean, `npm run build` passes, click through Home, Projects (3D card), Events, Gallery and the mobile nav locally.
- **Docs:** update `PROGRESS.md` after meaningful changes, `ARCHITECTURE.md` for structural decisions, `ASSETS_NEEDED.md` for outstanding content.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Vercel deploy `BLOCKED` | Commit author mismatch — see Hobby gotchas |
| Deploy upload stalls/huge | `reference-material/` or large files leaked in; check `.vercelignore` |
| Dev server panics after config edit | Delete `.next/`, restart |
| Photo missing on site | File name must match exactly (lowercase-hyphen); missing slots render nothing by design |
| Swapped image still old | Cached up to a week (+1 day); hard refresh, or rename and update the reference |
| `ui/*` components look unpadded | Global reset must stay inside `@layer base` (ARCHITECTURE.md "CSS layers gotcha") |
| Screenshot of the page is black | Capture-tool quirk after scroll, not a bug — verify via DOM |
