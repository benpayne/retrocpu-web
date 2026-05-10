# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this repo is

This is the **organizing hub for the Retro-Active project** — an open FPGA co-processor that gives vintage CPUs (6502, 68000, Z80, 8086) modern peripherals through a common bus. Everything related to the project will live here over time: the public website, the bus design, the FPGA co-processor, drivers, and OS work.

What is here today:

1. **The website** — Astro 6 source for [retrocpu.io](https://retrocpu.io). Public face of the project.
2. **`bus-design/`** — feasibility proofs (RTL + cocotb tests) for the host-CPU bridges the Architecture page describes.

What is *not yet* here but is part of the project (planned migrations):

- **FemtoRV co-processor work** — currently in [`benpayne/learn-fpga`](https://github.com/benpayne/learn-fpga). PS2 controller, HDMI GPU (text + bitmap + framebuffer), FM synth, SD card, SDRAM controller, BIOS monitor, RetroKernel v0.1. **Status: legacy location, lazy migration.** New firmware/peripheral work should land here in a sensible directory (probably `firmware/`, `rtl/`, or similar), not in `learn-fpga`.
- **The `retrocpu` codename** — a separate FPGA-based 6502 system project of the maintainer's (currently at `/opt/wip/retrocpu` locally). Planned to fold in here as the project's reference 6502 build. Don't confuse the codename with the repo name — `retrocpu-web` is the project hub, `retrocpu` is the future 6502 sub-project that will live inside it.

What is **not** planned to migrate in, but is referenced as concept sources (see `src/pages/about.astro` → "Inspirations"):

- **`benpayne/beavix`** — the maintainer's x86 OS project. Kernel/driver/userspace separation ideas inform the Retro-Active OS work, but no code imports.
- **`rosco-m68k`** — external community 68k SBC by Ross Bamford. Reference for how a clean retro SBC builds a community around itself and what the 68k bus experience should feel like to a software author. No code imports.
- **`BrunoLevy/learn-fpga`** (the upstream of `benpayne/learn-fpga`) — home of the FemtoRV cores. Imported via the legacy fork; the FemtoRV cores themselves are upstream and shouldn't be modified.

### Migration in progress

The split-out of this repo from `learn-fpga` (April 2026) brought over the website and `bus-design/` first because that's what `retrocpu.io` references directly. The FemtoRV co-processor, RetroKernel, and the standalone `retrocpu` (FPGA 6502) project will be migrated **lazily**: code moves over when it's being actively worked on, not in a single rip-and-replace. Existing `https://github.com/benpayne/learn-fpga/...` links in site content are intentional during this transition and get rewritten as code moves.

When in doubt about where to put a new file: **put it here**, in a sensibly named directory. Don't add to `learn-fpga`.

## Status reality check

Most project pages in `src/content/projects/` mark themselves "Status: **design phase**" or "**planned**." That is accurate — keep it that way. Don't promote a project to "working" without verifying it on hardware first.

What is actually built today:

- ✅ **6502 bridge** (`bus-design/`) — 9-chip pure-74 and 4-chip PAL variants, both pass cocotb tests
- ✅ **68000 bridge** (`bus-design/`) — 12-chip pure-74 and 6-chip PAL variants, both pass cocotb tests
- ✅ **FemtoRV co-processor** (in `learn-fpga`) — PS2, HDMI text+bitmap+framebuffer, FM synth, SD card, SDRAM, RetroKernel v0.1
- 🔲 Everything else on the project pages — design phase

When introducing a new project page or blog post, default to honest scoping. The site's credibility comes from `bus-design/` having real RTL and tests behind it; don't dilute that by overstating other work.

## Build and run

### Website (Astro)

```bash
npm install
npm run dev      # http://localhost:4321, hot reload
npm run build    # static output → dist/
npm run preview  # serve dist/ locally
```

### Bus-design tests (cocotb + Icarus)

```bash
cd bus-design/test
make                    # default: pure-74 6502 suite
make TARGET=6502_pal    # 4-chip PAL 6502
make TARGET=68k         # pure-74 68000
make TARGET=68k_pal     # 6-chip PAL 68000
```

Requires `iverilog` and `cocotb` (`pip install cocotb`). Build artifacts (`sim_build*/`, `*.vcd`, `__pycache__/`, `results.xml`) are gitignored.

## Critical conventions

- **No base path.** Custom domain `retrocpu.io` serves at root. `astro.config.mjs` has `site: 'https://retrocpu.io'` and **no `base:` setting**. All internal links must be absolute from `/` (e.g. `/architecture/`, `/projects/`), never `/learn-fpga/...`. The previous form was an artifact of GitHub-Pages-subpath hosting and has been migrated.
- **Custom domain file.** `public/CNAME` contains `retrocpu.io` — don't remove it; the deploy pipeline copies it into `dist/` and GitHub Pages needs it.
- **External GitHub links.** Links to firmware/CPU/peripheral source code go to `github.com/benpayne/learn-fpga/...`. Links to bridge RTL or backplane docs go to `github.com/benpayne/retrocpu-web/blob/main/bus-design/...`.
- **Content schemas.** Blog posts and project entries live in `src/content/` with frontmatter validated by `src/content.config.ts` (Zod). Adding fields requires updating the schema first.
- **No client-side JS by default.** Site is fully static. Shiki syntax highlighting is server-rendered at build. Don't add hydration unless there's a real reason.

## Layout

```
.
├── astro.config.mjs        # site: https://retrocpu.io, no base
├── src/
│   ├── pages/              # routes (home, about, architecture, getting-started, projects, blog)
│   ├── content/
│   │   ├── blog/           # *.md posts
│   │   └── projects/       # *.md project cards
│   ├── components/         # Header, Footer, Hero, PillarGrid, etc.
│   ├── layouts/            # BaseLayout, PageLayout, PostLayout
│   ├── styles/             # global.css (tokens), prose.css
│   └── content.config.ts   # Zod schemas
├── public/
│   ├── CNAME               # retrocpu.io
│   ├── fonts/              # self-hosted IBM Plex Mono, Inter, JetBrains Mono
│   └── images/             # blog/, projects/, architecture/, og/
├── bus-design/
│   ├── rtl/                # bridge_{6502,68k}{,_pal}.v, backplane_decoder.v, chips_7400.v
│   ├── test/               # cocotb tests + Makefile
│   └── docs/backplane.md
├── specs/002-retro-web/    # historical design spec (frozen — see review note in PRs)
└── .github/workflows/deploy.yml   # GH Pages deploy on push to main/master
```

## Deployment

GitHub Pages via Actions. Push to `main` → workflow builds and deploys. Custom domain config:

- GitHub repo → **Settings → Pages → Source: GitHub Actions**, **Custom domain: retrocpu.io**, **Enforce HTTPS**
- DNS at GoDaddy: four apex `A` records to `185.199.108.{153,154}` (`108`/`109`/`110`/`111`); CNAME `www` → `benpayne.github.io`

Full DNS / one-time setup steps are in `README.md`.

## Working notes

- The `specs/002-retro-web/` directory is the **original feature spec** from before this work was split out of `learn-fpga`. Many paths in it (`retroweb/`, `benpayne.github.io/learn-fpga/`, `deploy-retroweb.yml`) are stale snapshots of the old layout. Treat the specs as historical record, not as current operational docs — the current operational docs are this file and `README.md`.
- When adding new tooling that produces artifacts (sim outputs, build dirs, caches), add the pattern to `.gitignore` rather than committing the artifacts.
- The site has no analytics, no comments, no dynamic features. Keep it that way unless explicitly asked.
