# Team SAMMARD Website

Next.js 16 site for Team SAMMARD, a student rocketry team at VIT Vellore.

See [ARCHITECTURE.md](ARCHITECTURE.md) for stack/structure/conventions. See [PROGRESS.md](PROGRESS.md) for current state.

## Rules

- Next.js App Router. Do not migrate to Vite/React Router, regardless of what any spec doc says.
- Every section component gets a co-located `*.module.css`. No Tailwind classes in section components — Tailwind is only for `src/components/ui/*` (CVA/shadcn-style primitives).
- All GSAP code imports `gsap`/`ScrollTrigger` from `src/animations/gsap.ts`, never from `"gsap"` directly (it registers plugins + sets shared ease defaults).
- Never invent facts about the real organization (board members, rocket specs, results, dates). Use `"— TBD"` placeholders and log gaps in `ASSETS_NEEDED.md`.
- Keep responses concise and direct (caveman-style: short, technical, no fluff).
- Design language: no colored eyebrow tags, no bordered/rounded card-grid-for-everything, no solid-fill buttons, no glassmorphism/blobs/gradients. Match the original homepage sections (hero/whoweare/competitions/sponsors/footer) — full-bleed imagery with gradient-overlay titles, pill-shaped outline CTAs, editorial rule-divided lists, plain centered headings with no eyebrow. See ARCHITECTURE.md "Design language" section before styling anything new.
- Reuse existing components/assets. Avoid new dependencies and unrelated rewrites.

## Doc sync

Maintain exactly three project docs, kept in sync as work happens: `ARCHITECTURE.md` (stack/structure/conventions/decisions), `PROGRESS.md` (done/in-progress/blocked/next — update after meaningful changes), `ASSETS_NEEDED.md` (everything real still needed from the user, grouped by page, required/optional). Don't duplicate one doc's content into another. Read only files relevant to the current task — don't re-scan the whole repo each session.
