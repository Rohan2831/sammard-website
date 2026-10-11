# Assets & Content Needed

Only what's still missing. Everything already on the site is listed in PROGRESS.md → "Content inventory".

- **Required**: the site shows a placeholder, "TBD" or a blank spot until it arrives.
- **Optional**: the page works fine without it.
- **Photos and files**: drop them into the folder shown, using the exact file name. Each folder's `images.txt` lists its file names.
- **Text and answers**: send them in chat.

## Answers to confirm

- [ ] **Udbhava's payload**: the brochure says **"MARK"** (coefficient of friction in microgravity); the PTR says an **in-flight 3D micro bioprinter**. Which one flew? The site currently shows the bioprinter.
- [ ] **Agneya and Airavata**: the site now follows their PTRs where they differ from the old website.
  - Agneya's payload was **Active Control Gimbal Stabilization**, not "vibration analysis".
  - Airavata flew **dual Sirius flight computers** with a **ViziNav, muon-detection and strain-gauge** payload, not SPARC-III and "structural health monitoring".
  - Correct?
- [ ] **NASA CanSat draw**: the site says the team wasn't drawn to fly at the finals in the **CanSat 2025 season**. Is that the right year?
- [ ] **Motor CAD**: `n_class_motor.glb` has **5** propellant grains; the PTR says Project Rudra has **6**. Is the CAD an older version?
- [ ] **2025–2026 board**: was there one? The About page currently jumps from 2024–25 to 2026–27.
- [ ] Optional: do any Captains, Vice Captains, Heads of Operations, or competition, payload or R&D leads belong to a department? They currently show none.
- [ ] Optional: the names of the two Srishti 2026 projects that took 1st position.

## About page

- [ ] **Required**: headshots for the **2026–2027 board** (the current board, always shown). Put them in `public/assets/about/board/`:
  - `gahan-shekhar.jpg`
  - `aditi-bhore.jpg`
  - `aalap-panda.jpg`
  - `swaraj-sharma.jpg`
  - `yug-solanki.jpg`
  - `vedanjali-gautam.jpg`
  - `hansika-naresh.jpg`
  - `prateek-sreenath.jpg`
  - `adit-goyal.jpg`
  - `advay-kulkarni.jpg`
- [ ] **Required**: 3 older headshots, same folder:
  - `khyati-kejriwal.jpg` (2024–25)
  - `syed-zeeshan-ahmed.jpg` (2024–25)
  - `rajarshi-bhattacharyya.jpg` (2017–18)

## Departments page

- [ ] **Required**: overview, responsibilities, skills, technologies and major projects for **Mechanical**, **Electronics** and **Propulsion**.
- [ ] **Required**: **Computer Science** responsibilities, skills, technologies and major projects. Its overview is already in.
- [ ] **Required**: one cover photo per department, in `public/assets/departments/`. All five currently show the same team photo:
  - `mechanical.jpg`
  - `electronics.jpg`
  - `computer-science.jpg`
  - `propulsion.jpg`
  - `management.jpg`

## Projects page

- [ ] **Required**: **Pinaka**: loaded weight, motor and average thrust. The old website left these blank.
- [ ] **Required**: subsystem descriptions still missing:
  - **Vajra**: recovery, fins.
  - **Pinaka**: nose cone, payload, avionics bay, recovery, motor, fins.
  - Their PTRs would cover these, like Agneya's and Airavata's did.
- [ ] **Confirm**: Vajra's and Pinaka's specs come from the old website's rocket carousel, which got Agneya's and Airavata's specs wrong compared with their PTRs. Please check:
  - **Vajra**: 1.8 m, 12 cm, 18 kg (13 kg dry), M2050-P motor, 2,500 N.
  - **Pinaka**: 3.2 m, 22 cm, 22 kg dry, carbon fiber, 30,000 ft design apogee.
  - **Pinaka flight**: the carousel called it a "Concept". Did it ever fly?
- [ ] **Required**: **CanSat 2023**: mission, electronics and result.
- [ ] Optional: sharper CanSat images to replace `public/assets/projects/cansat/cansat-2025.jpg` (596 px CAD) and `cansat-2023.jpg` (390 px photo).
- [ ] Optional: `.glb` CAD exports of the other rockets, exported from SolidWorks with each part as its own body. This enables the 3D and exploded view.
- [ ] Optional: Udbhava's payload CAD, so the homepage Payload step can show it.

## Events page

- [ ] **Required**: **IN-SPACe CanSat 2025**: the team's result.
- [ ] Optional: event photos. Drop them into `public/assets/events/<event>/` and add a line to that folder's `images.txt`. Wanted:
  - **CanSat Competition** (`cansat/`)
  - **CanSat 2026** (`cansat-2026/`)
  - **Gravitas** (`gravitas/`)
  - more of **IREC 2026** (`irec-2026/`)

## Homepage

- [ ] Optional: a NASA CanSat photo for the CanSat card: `public/assets/home/competitions/cansat.jpg`. The current one is a stand-in from IN-SPACe 2025.
- [ ] Optional: a real manufacturing photo for the Team in Action "Manufacturing" card: `public/assets/home/team-in-action/manufacturing.png`. The current photo isn't of manufacturing.

## Sponsors page

- [ ] **Required**: **Aerospace Association of India** logo: `public/assets/shared/sponsors/aerospace-association-of-india.png`. Its spot is blank until then.
- [ ] **Required**: what **Platinum, Gold, Silver and Bronze** sponsors each get. The tiers currently read "TBD".

## Site-wide

- [ ] Optional: smaller re-exports of `public/assets/shared/videos/rudra-testing.mp4` (34 MB) and `inflight.mp4` (14 MB), a few MB each, same names.
- [ ] Optional: more PDFs for the Documentation page:
  - Vajra's and Pinaka's technical reports
  - design, flight or post-flight reports
  - research papers, publications, patents
- [ ] Optional: Join page details: who can apply, eligibility, and how the application process works.
- [ ] Optional: a form service (Formspree, Google Form or similar), so the Contact, Join and Sponsor forms submit directly instead of opening the visitor's email app.
- [ ] Optional: a favicon made from the team logo. The default Next.js icon is shown now.
- [ ] Optional: more flight and testing videos.
