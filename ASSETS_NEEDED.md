# Assets & Content Needed

Everything the site still needs from the team to be real (not placeholder). Checked against what's already in the repo — items already present are not listed. Grouped by page/feature. **Required** = page ships with an obvious placeholder/empty state without it. **Optional** = nice-to-have, page works fine without it.

Already have (do not resend): team logo (`public/assets/shared/logo.png`), hero video (`launch.mp4`), team-in-action videos (`inflight.mp4`, `testing_Rudra.mp4`), motor test video (`L-Class.mov`), team photos (`teampic1.JPG`, `teampic2.JPG`, `teaminaction/image2.png`), 6 sponsor logos incl. Aerospace Association of India (missing its logo file only, see below), social handles (Instagram/LinkedIn/Twitter-X — no YouTube), contact email/phone/address, mission/vision/legacy copy, founding year (2017), full 2017–2026 timeline, 7 years of board member names (2017–2025), 5 named rockets (Vajra/Pinaka/Agneya/Airavata/Udbhava — Udbhava's full specs+subsystems from its PTR, listed first as the current flagship), Udbhava's 3D model, livery renders for 4 of the 5 rockets (not Pinaka), the sponsorship brochure, 2 CanSat entries, a full 8-category R&D lineup (Motors, Avionics, Airbrakes, Antennas, Ground Station, Payloads, Recovery Systems, Future Research — all from the live site + Udbhava's PTR), 5 real department names (Mechanical/Propulsion/Electrical/CS/Management), 10 events incl. 2 upcoming (IREC 2026, CanSat Competition 2026) ordered latest-first, real event photos for Srishti/APSA/BSX 2026, a Team Culture photo, and 13 generic lab/gallery photos.

**2026-09 update**: cross-referenced everything below against `teamsammard.com` (the team's live production site). That resolved several previously-flagged gaps and one real conflict — see "Resolved this pass" and "Flagged conflicts" below. Items already answered by the live site are removed from the lists; this file now only tracks what's still genuinely missing.

**2026-09 update 2**: user supplied real event photos (folders `APSA/`, `SRISHTI_IMAGES/`, `TEAM AT WORK/`). Processed and placed — see "Resolved this pass (via user-supplied photos)" below. `TEAM AT WORK` was confirmed by the user to be generic lab photos not tied to any event, even where GPS/date metadata coincidentally overlapped with the Srishti dates/venue — placed as generic Gallery/Team-Culture content accordingly, not into the Srishti event.

**2026-09 update 3**: user supplied the "Team 316 Project Technical Report to the 2026 IREC" PDF (Udbhava's PTR) — used to fully fill Udbhava's specs and all 8 subsystems. User also confirmed: `L-Class.mov` is a motor static-fire test (added to Gallery as Testing), there is no YouTube account (removed), and asked for a full re-check that every real detail from `teamsammard.com` is reflected here. Re-crawled every live-site page (not just the ones touched before) — see "Resolved this pass (full site re-check)" below for what that surfaced.

**2026-09 update 4**: user asked to double-check the previous re-check. Found two things update 3's crawl actually missed — see "Resolved this pass (second re-check)" below: 5 more years of real board members hidden behind a dropdown on `/about`, and 2 upcoming events (IREC 2026, CanSat Competition 2026) on the dedicated `/events` page that the homepage widget doesn't show.

## Resolved this pass (via teamsammard.com)

- Instagram/email conflict — live site confirms `instagram.com/team_sammard/` and `teamsammard@gmail.com` are correct (the footer's previous `teamsammard`/`contact@teamsammard.com` were wrong). Fixed site-wide.
- Added real LinkedIn (`linkedin.com/company/teamsammardrocketry/`), Twitter/X (`x.com/TeamSammard`), phone (`+91-8095390385`), address (Creation Labs, VIT Vellore, Vellore, Tamil Nadu, India) — now shown in footer + Contact page.
- "Aerospace Association of India" 6th sponsor — confirmed real, restored to data (was dropped last pass as unverified).
- Sponsor descriptions + websites — filled from the live site for all 6.
- Founding year, full timeline (2017–2025), 2 years of board members, 4 rocket names + partial specs, 2 CanSat entries, 2 R&D category write-ups — all filled from the live site.

## Resolved this pass (via user-supplied photos, 2026-09)

- **"Srishti" confirmed real** — full name "Srishti 2026" (12th National Level Technical Project Exhibition and Competition), hosted by Saintgits College of Engineering, Kottayam, Kerala, 23–24 Feb 2026. Team Sammard exhibited Airavata and won the "Best SolidWorks Project Award" (a second award's exact name was unreadable in the photo — see flagged conflicts). 7 real photos added to `/events/srishti` and used as the homepage Competitions card image.
- **New event added: "AP SpaceTech Summit & Rocketry Challenge 2k26"** (`/events/apsa`) — Guntur, Andhra Pradesh, 24 Jan 2026, hosted by Vignan's Foundation for Science, Technology & Research. Team Sammard exhibited Airavata. Not on the live site yet.
- **BSX updated to 2026** — a new photo shows a Team Sammard booth (#38) at BSX in Bengaluru, Sept 2026, showcasing a new rocket. Year bumped from 2024 to 2026, real photo added.
- **New rocket discovered: "Udbhava"** — the team's own technical poster (photographed at BSX 2026) shows a new, not-yet-flown rocket: their first to fly a Student Researched & Developed (SRAD) in-house solid motor. Added to `rockets.ts` as `status: "in-development"` with Nose Cone/Recovery/Airbrakes descriptions transcribed from the poster. Payload/Avionics/Motor/Fins/Airframe sections of the poster were obscured by people in the photo — left TBD, not guessed.
- **Team Culture photo filled** — `teaminaction.ts`'s "Team Culture" card (previously missing entirely) now uses a real lab photo from Creation Labs, VIT Vellore.
- **13 generic lab/workshop and extra Srishti photos added to the Gallery page**, properly tagged (Behind the Scenes / Assembly / Ground Station / Manufacturing / Competitions).
- **`L-Class.mov` categorized** as Testing (motor static-fire test, per your confirmation) — was previously unused/unlisted.
- **YouTube removed** — you confirmed there's no Team Sammard YouTube account; the old link (not on the live site either) is gone from the footer/navbar.

## Resolved this pass (via Udbhava's Project Technical Report, 2026-09)

- **Udbhava's specs fully filled**: 3.06m (with nose cone), 15.3cm diameter, 36.25kg total weight, in-house Class N SRAD solid motor (KNSB propellant), 10,000 ft designed apogee.
- **All 8 subsystems filled** (Nose Cone, Payload, Avionics Bay, Recovery, Airbrakes, Motor, Fins, Airframe) — see `rockets.ts`. The Airbrakes description was corrected: the earlier BSX-poster photo described a "passive" drag system, but the PTR (more authoritative — it's their own competition document) describes an active, servo-driven system called BHAGAT-C.
- **Udbhava's motor is NOT "Ignis"** — the PTR describes an unnamed in-house Class N SRAD motor. Ignis is a separate, earlier J-class motor. This resolves the previously-flagged naming question.

## Resolved this pass (full site re-check, 2026-09)

Re-crawled every page on teamsammard.com (not just the ones touched in earlier passes) per your request to make sure everything real is present:

- **R&D page significantly expanded** — the live site's actual `/projects` page lists many more named sub-projects than we'd captured: motor tests **Ignis** (J-class, 850N, confirmed) and **Tejas** (L-class: 4.71s burn, 4,773 Ns impulse, ~1kN avg thrust), flight computers **Sparc 4** and **Sirius**, GPS trackers **Bessie 1.0** and **Bessie 2.0**, ground-station units **Shrota** and **Shrota 2.0**, and a new "Future Research" project, **ViziNav** (vision-based navigation). All added to `rnd.ts` with real descriptions.
- **New event added: "Gravitas 2025"** — VIT's biggest tech fest (26–29 Oct 2025), an outreach event, not a rocketry competition.
- Added precise dates to IREC 2025 (18–22 June), IN-SPACe CanSat (25–30 Oct 2025), and SA Cup 2024 (10–12 June).
- **Timeline**: confirmed our 2017–2025 milestones already matched the live site's Timeline page exactly. Added a new 2026 entry (Udbhava, Srishti, APSA — sourced from your photos/PTR, not the live site, which stops at 2025 "To Be Continued…").
- **Sponsors, social links, contact info, mission/vision, board members (2024–25)**: re-verified against the live site — all already matched, no changes needed.
- Confirmed the homepage's "Upcoming Events" widget says IREC 2025 was in "New Mexico" — this conflicts with the live site's own dedicated Events page (which says Midland, Texas, twice). We kept Midland/Texas (matches our existing data and the more detailed page) and treated the homepage widget as the site's own stale text, not a reason to change ours.

## Resolved this pass (second re-check, 2026-09)

- **5 more years of real board members found** — `/about`'s "Select Mission Year" dropdown was missed on the first crawl (it's collapsed by default, no visible list until clicked). It actually holds 7 years total, not 2. Added 2022-2023 (Jatin Dhall, Dhananjay K Prasad, Supreet Kaur Thind, Vishwajeet Menon, Nandini Mehrotra, Manju Ranganath, Aniruddh Pandey), 2021-2022 (Radha Debal Goswami, Sankalp Dua, Eshan Sabhapandit, Harsh Desai, Debdoot Ghosh, KSV Pradyumna, Yashvi Gaglani), 2019-2021 (Deerajkumar Parthipan, Pranshu Aggarwal, Srinija Ramichetty, Lakshman Vijay, Mohan Raj, Soham Korgaonkar), 2018-2019 (Bharadwaj Tallapragada, Godwyn James William, Adarsh Venkatachalam, Karthik Srinivas, Deepshikha Kumari, Ashwin Soorya Prakash), and 2017-2018 (Shashwat Rajput, Shashank Amin, Karishnu Poddar, Rajarshi Bhattacharyya, KSP Anirudh, Arunava Basu, Preet Derasari) to `board-members.ts`. Photos still not scraped (see below).
- **2 upcoming events added**: "IREC 2026" (Midland, Texas) and "CanSat Competition 2026" (Texas) — both live on `/events`'s Upcoming Events section, missed because the first crawl only skimmed the homepage's smaller "Upcoming Events" widget. The site itself prints inconsistent dates for both (card title says 2026, the date range under it says 2025) — kept exactly as published in `events.ts`, not corrected.
- Re-verified `/projects` (all 16 R&D/rocket/CanSat cards match `rnd.ts`/`rockets.ts`/`cansats.ts` word-for-word), `/timeline`, `/sponsors` (all 6 sponsor descriptions match verbatim), `/gallery` (same 9 albums, no new ones), footer (same quick links + same 3 socials + same address/phone/email), and confirmed `/documentation` and `/join` are still both 404 on the live site — no changes needed to any of these.

## Resolved this pass (user feedback + Udbhava's PTR, 2026-09)

- **Rockets/events now sort latest-first**: `rockets.ts` had Udbhava (the current, in-development flagship) listed last — reordered so it leads, flown rockets follow newest-to-oldest. `events.ts` had Bangalore Space Expo 2026 (the team's most recent real activity, Sept 2026, unveiling Udbhava) buried 7th — reordered the whole list to actual recency, BSX first.
- **R&D page filled the remaining 4 placeholder categories** from Udbhava's PTR: Payloads (the in-flight bioprinter), Antennas (the Antenna Tracking System / ATS — 4-stack Yagi + horn antenna, EKF-based pointing), Recovery Systems (dual-deployment, Kevlar cords, black-powder charges), and a new Airbrakes category for BHAGAT-C (full name found in the PTR: Borne Hardware for Apogee Guidance, Airbrakes Tuning & Control).
- **Departments filled**: the team confirmed 5 real divisions — Mechanical, Propulsion, Electrical, CS, Management (per the PTR) — replacing "Department 1–5 — TBD" in `departments.ts`. Per-department overview/responsibilities/skills/projects are still TBD (not covered by the PTR at that level of detail).
- **Board member `department` field filled** where a member's own position names or clearly implies one of the 5 departments above (e.g. "Avionics Lead" → Electrical, "CS Senior" → CS). Team-wide leadership titles not tied to one division (Captain, Vice Captain, Head of Operations, competition leads) are left "TBD" rather than guessed.

## Resolved this pass (further user feedback, 2026-09)

- **Existing Sponsors tiers restyled** — was a multi-column logo grid (looked broken with a single Platinum sponsor stretching full-width); now a vertical rule-divided list per tier, matching the "Sponsorship Tiers" section's own editorial style just above it.
- **Events re-sorted strictly by actual date**, not just the "year" field — searched every date string the live site publishes. Found the live site's "CanSat Competition" is branded as its "2025 season" but its own Past Events card prints the real launch date as **18–22 June 2024** — sorted by that real date (now sits next to Spaceport America Cup 2024) and spelled the discrepancy out in the event's summary text and in `events.ts`'s header comment, rather than silently reordering without explanation.
- **Fixed a real ordering bug** (caught in review): an earlier pass sorted "IREC 2026" by its printed-but-stale date text (June 2025), which put it directly *after* the already-happened "IREC" 2025 — nonsensical for something named 2026. Added a `status: "upcoming" | "completed"` field to `EventRecord`; "IREC 2026" and "CanSat Competition 2026" (the live site's own Upcoming Events entries, whose printed dates are almost certainly stale copy-paste from a previous year) now always lead the list regardless of that unreliable date text, each labeled "Upcoming" in place of a year on both the Events list and its detail page. Every other (`completed`) event still sorts strictly latest-first by real date.
- **Fixed a dev-only navigation crash** (`Uncaught NotFoundError: removeChild`) reported when leaving the Timeline page via the header. Root-caused: not actually specific to Timeline — reproduces from any page after scrolling, only in `npm run dev` (React Strict Mode double-effect-invoke + Turbopack Fast Refresh), confirmed clean in a full `npm run build && npm run start` production test. Still hardened Timeline's own animation regardless (see ARCHITECTURE.md) since it was needlessly using GSAP's DOM-wrapping `pin: true`.

## Resolved this pass (folder reorg, 2026-09)

- **All site-served media consolidated** under `public/assets/{images,videos,logos,documents}/` (was scattered directly under `public/images/`, `public/videos/`, `public/logos/`) — see ARCHITECTURE.md "Static assets". Every code reference updated; `tsc`/build/lint all clean, spot-checked in browser.
- **Typo fixed**: the root `assests/` folder (source PTR PDF, raw photo dumps, blueprint `.docx` — never served by the app) is now `reference-material/`.
- **Found `reference-material/Skeleton.GLB`** — confirmed by the team (2026-10) as Udbhava's model; now live, see below.

## Resolved this pass (team-supplied 3D model, renders and brochure, 2026-10)

- **Udbhava's 3D model** (`Skeleton.GLB`) — now the homepage's scroll-driven exploded view and the interactive viewer in Udbhava's expanded Projects card. It's a SolidWorks export with separately named parts, so subsystem highlighting works for Nose Cone, Avionics Bay, Recovery, Nozzle, Fins and Airframe. Payload, Airbrakes and the **Motor** (casing + grains) aren't in the model, so those can't be highlighted — the model's only propulsion parts are the nozzle and its retainers, now shown as their own "Nozzle" section (description from the PTR) instead of being labelled "Motor".
- **Udbhava decal** (`ITERATION1.png`) — wrapped around the 3D model's nose cone and body tubes, nose tip to the bottom of the lower body tube. To change it later, send the new flat artwork (same layout: top = nose tip, width = once around the body).
- **Rocket renders** for Udbhava, Airavata, Agneya and Vajra — on the Projects cards and a new homepage fleet lineup.
- **Sponsorship brochure** — merged into one PDF, downloadable from the Sponsors page. Its "Why Us?" text now opens the Sponsors page.
- **From the brochure**: Udbhava flew at IREC 2026 (launched + recovered, 3rd in Asia, 10K SRAD) — now shown as flown, and IREC 2026 moved from Upcoming to Past Events. Udbhava's motor is "Project Rudra" (was "unnamed"). Added Sirius = STM32-based, BHAGAT-C = ESP32-based 4-leaf airbrake, CyberDeck ground-station visualization.
- The brochure has **no sponsorship tier benefits**, so Platinum/Gold/Silver/Bronze still read "TBD" (see Still needed).

## Flagged conflicts — needs your confirmation

- [ ] **Udbhava's payload** — the brochure says its payload is **"MARK"**, measuring coefficient of friction in microgravity. The PTR (and the site, currently) says it's an **in-flight 3D micro bioprinter**. Which one flew? (Maybe the payload changed after the PTR.) The site keeps the PTR description until you confirm.
- [ ] **Airavata's IREC 2025 ranking** — the brochure says "ranked **28th** globally in Design and Build Quality"; teamsammard.com says "**30th** worldwide in design/build/documentation". Possibly two different categories — confirm which to show. Site currently keeps the live site's wording.
- [ ] **NASA CanSat result** — the brochure says "on our first attempt at NASA CanSat, we placed **18th globally and 7th in Asia-Pacific**". We have two CanSat entries (2023 and the "2025 season" one, flown June 2024) and don't know which was the first NASA attempt, so this result isn't on the site yet. Which year?
- [ ] **CanSat Competition 2026** is still listed as Upcoming (from the live site), but NASA CanSat runs in June, so it's likely already happened. Did the team compete, and what was the result?
- [ ] Minor — the brochure lists the domain as **"Electronics"**; the site's department (per your earlier message) is **"Electrical"**. Which name should the site use?
- [ ] Minor — the brochure's Platinum sponsor logo reads **"Convergent Science"**; the site (following teamsammard.com) says **"Converge"** (their CFD product). Same company — say if you'd prefer the company name.

- [ ] **Airavata's length/diameter/weight**: our data says 2.5m / 15cm / 25kg (from teamsammard.com); the projects-page prose separately says "2.8 m tall". A physical competition poster visible in the Srishti photos (`srishti-airavata-poster.jpg`) states **Rocket Length: 2820 mm, Airframe Diameter: 140 mm, Vehicle Weight: 23.7 kg, Predicted Apogee: 9640 ft** — this matches the 2.8m figure, not 2.5m. We have NOT changed `rockets.ts` — three different real-looking sources disagree, so please confirm which numbers are current/correct before we update them.
- [ ] **Srishti's second award** — likely "Best Computer Applications Project Award" based on a second stage photo (`srishti-award-2.jpg`), but the exact wording is still partially blocked by people in both photos of it. Confirm the exact name if you want full confidence.

## Still needed

### Photos & video (real, not placeholder)

**How to swap images yourself**: `public/assets/` has one folder per page (`home/`, `about/`, `departments/`, `projects/`, `events/`, `gallery/`, `sponsors/`, `documentation/`) plus `shared/` for things that appear on several pages and should match everywhere (logo, sponsor logos, rocket renders, 3D model, videos). Replace a file **keeping the same name** and it changes only on that page (or everywhere, for `shared/`). To add new images or use different names, ask Claude to wire them in. Several pages currently show a group team photo as a stand-in — each page has its own copy, so you can replace them one at a time:
`home/who-we-are.jpg` · `about/legacy-1.jpg`, `about/legacy-2.jpg` · `departments/mechanical.jpg`, `propulsion.jpg`, `electrical.jpg`, `cs.jpg`, `management.jpg` · `projects/pinaka.jpg` · `projects/rnd/motors.jpg`, `avionics.jpg`, `airbrakes.jpg`, `antennas.jpg`, `ground-station.jpg`, `payloads.jpg`, `recovery.jpg` (R&D cards — currently figures from Udbhava's PTR; swap in better photos any time, 4:3 works best) · `gallery/team-1.jpg`, `team-2.jpg` · `home/team-in-action/manufacturing.png` (not actually a manufacturing photo).

- [ ] **Required** — Department photos: drop one per department into `public/assets/departments/` as `mechanical.jpg`, `propulsion.jpg`, `electrical.jpg`, `cs.jpg`, `management.jpg` (all currently the same team photo).
- [ ] Optional — A photo for the R&D **Future Research (ViziNav)** card — it's the only R&D project not in the PTR, so its card has no image. Needs a small code change to wire in (send it over).
- [ ] **Required** — A livery render (like the four in `ALL ROCKETS SVG`) or photo for **Pinaka** — photo: replace `projects/pinaka.jpg`; a render needs a small code change to join the homepage fleet lineup.
- [ ] **Required** — Board member headshots (7 years, 2017–2025, ~46 people total) — everyone currently shows `about/board-placeholder.jpg`. Per-person photos need wiring per member (send them over). We won't scrape real people's photos from the live site without your OK.
- [ ] **Required** — 4 remaining homepage competition images — drop them into `public/assets/home/competitions/` named exactly `irec.jpg`, `cansat.jpg`, `in-space.jpg`, `bsx.jpg` (those cards show blank until then). Srishti already has `srishti.jpg`.
- [ ] **Required** — Aerospace Association of India logo — drop it in as `public/assets/shared/sponsors/sponsor-six.png` (shows on the homepage and Sponsors page; currently blank).
- [ ] Optional — the live site's Gallery page lists 9 real photo albums we haven't copied (need your OK or the original files): *Inspace CanSat 2025* (7 images, Kushinagar), *Team Picture* (4), *Exhibitions in VIT* (16), *IREC 2025* (10), *Republic Day 2025 exhibition* (4), *Spaceport America Cup 2022* (3), *Spaceport America Cup 2023* (7), *Techkriti 2024, IIT Kanpur* (3), *Our Lab* (5).
- [ ] Optional — 5 more photos exist in the `SRISHTI_IMAGES/` folder you supplied that weren't used (near-duplicates of ones we did use) — tell us if a specific one should be swapped in.

### Content
- [ ] Optional — Department field for older board members with team-wide titles only (Captain, Vice Captain, Head of Operations, competition leads) — not deducible from their position text alone; the 5 real department names are now known (Mechanical/Propulsion/Electrical/CS/Management), just not which of these leadership roles maps to one.
- [ ] **Required** — Per-department overview/responsibilities/skills/technologies/major projects (the 5 department names themselves are now filled from the PTR — see `departments.ts` — but the live site and PTR don't go into this level of per-department detail; team must supply).
- [ ] **Required** — Team field (who attended) for each event; results for CanSat 2023, IN-SPACe CanSat, BSX years other than 2024, Srishti, APSA, Gravitas.
- [ ] **Required** — Per-rocket subsystem breakdown for Vajra/Pinaka/Agneya/Airavata (nose cone/payload/avionics bay/recovery/airbrakes/fins/airframe descriptions) — live site doesn't break rockets down this way. Udbhava now has all 8 sections filled from its PTR (plus a 9th, Nozzle).
- [ ] **Required** — Sponsorship tier benefits for Platinum/Gold/Silver/Bronze (forward-looking packages for new sponsors — distinct from the 6 existing sponsors, which don't use this tier system). Not in the brochure either.
- [ ] Optional — any technical reports, design reports, flight reports, research papers, publications, or patents as downloadable PDFs (Documentation page ships empty).
- [ ] Optional — Why-join copy / eligibility / application process specifics (Join page currently generic).
- [ ] Optional — a real form-submission backend (Formspree, Google Form, or custom API) for Contact/Join/Sponsor forms — they currently open the visitor's email client via `mailto:`. Note: the live site's own sponsor form also just collects fields, no visible backend confirmed either. (2026-09: `mailto:` links now also copy the address to the clipboard with a visible "Email copied" confirmation — see `CopyableMailLink` — so this is a nice-to-have, not a "reported broken" gap anymore, but a real backend is still the more robust long-term fix.)
- [ ] Optional — `.glb` models for the other rockets (export from SolidWorks with each part kept as its own body, as Udbhava's was — that's what makes the exploded view work). Any rocket given a `model` in `rockets.ts` gets the same 3D viewer automatically.
- [ ] Optional — if Udbhava's payload, airbrake hardware or motor casing exists in CAD, re-exporting the model with it included would let those subsystems highlight too.
- [ ] Minor — Udbhava's CAD names a **"Graphite insert"** in the nozzle, but the PTR describes a non-ablative **SS304** nozzle. The site's Nozzle text follows the PTR — confirm which flew (the CAD may be an earlier iteration).
- [ ] Optional — additional flight/testing videos.
- [ ] Optional — a custom favicon using the team logo (currently the default Next.js favicon).

This file is updated as pages are built and as content arrives — remove a line once you've supplied it.
