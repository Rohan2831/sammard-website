# Assets & Content Needed

Only what's still missing. Everything already on the site is listed in PROGRESS.md → "Content inventory".

- **Required**: the site shows a placeholder, "TBD" or a blank spot until it arrives.
- **Optional**: the page works fine without it.
- **Photos and files**: drop them into the folder shown, using the exact file name. Each folder's `images.txt` lists its file names.
- **Text**: send it in chat. All documents have been shared, so open questions were settled from them (see PROGRESS.md).

## About page

- [ ] **Required**: headshots for the **2026–2027 board**. It's in the code but hidden; the site shows the 2024–25 board until these arrive. Put them in `public/assets/about/board/`:
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

## Departments page

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

- [ ] Optional: Join page details: who can apply, eligibility, and how the application process works.
- [ ] Optional: more flight and testing videos.
