# Contributing to retrocpu.io

Thanks for the interest. This is a hobby project — there's no money behind it, just curiosity and the desire to see retro computers get modern peripherals without losing their soul. Contributions of any size are welcome.

## What lives where

This repo is the **organizing hub for the Retro-Active project**. Everything related to the project — website, bus design, co-processor firmware, FPGA work, drivers, OS — belongs here. Some of it isn't here *yet*:

- **Here today**: the website at retrocpu.io, plus `bus-design/` (RTL and cocotb tests for the host-CPU bridges).
- **Legacy location, migrating in**: the FemtoRV co-processor, its peripherals (PS2, HDMI GPU, FM synth, SD card, SDRAM), and the RetroKernel firmware are currently in [`benpayne/learn-fpga`](https://github.com/benpayne/learn-fpga). New firmware/peripheral work should land **here**, not there, even though the existing reference code is still over there during the transition.

If you're not sure where something belongs, open an issue and ask. Default to this repo.

## Quick local setup

```bash
git clone https://github.com/benpayne/retrocpu-web.git
cd retrocpu-web
npm install
npm run dev          # http://localhost:4321
```

For the bus-design tests:

```bash
pip install cocotb
cd bus-design/test
make                 # default: pure-74 6502 suite
make TARGET=68k_pal  # other variants: 6502, 6502_pal, 68k, 68k_pal
```

`iverilog` is required for the simulations.

## Adding content

### A blog post

1. Create `src/content/blog/your-slug.md`.
2. Add frontmatter:
   ```yaml
   ---
   title: "Your post title"
   pubDate: 2026-05-10
   summary: "One sentence hook."
   tags: [fpga, 6502]
   ---
   ```
3. Write. The dev server hot-reloads. Frontmatter is validated by `src/content.config.ts` (Zod) — if the build fails, that's where to look.

### A project entry

1. Create `src/content/projects/your-slug.md`.
2. Add frontmatter — see `src/content.config.ts` for the full schema, or copy from an existing project.
3. If you have a representative SVG/image, drop it in `public/images/projects/`.
4. **Be honest about status.** If the project hasn't been built, say "design phase" or "planned." The site's credibility comes from the parts that are real (the bridges, the FemtoRV co-processor) — don't dilute it by overstating what's done.

### Bus-design work

- RTL goes in `bus-design/rtl/`. Use structural Verilog with the `chips_7400.v` primitives if you're building a discrete-logic variant; use PAL/GAL-style models for programmable-logic variants.
- Tests go in `bus-design/test/`. The Makefile dispatches `make TARGET=...` between suites — follow the existing pattern. New bridges add a new `TARGET=` value.
- If your change updates a chip count or test result, update `bus-design/README.md` to match. The BOM tables there are load-bearing — they're what the website's project pages cite.

## What gets accepted

- **Yes**: typo fixes, prose improvements, broken-link fixes, working RTL with passing tests, expanded BOM detail, new project pages that are honest about their status, blog posts on relevant topics (FPGA, retro computing, the bus, the kernel, anything you'd want to read here yourself).
- **Probably yes, but ask first** (open an issue): new top-level pages, theme/design changes, build-pipeline changes, new dependencies, anything that pulls in client-side JavaScript.
- **No**: analytics, trackers, ad units, comment systems, anything that needs a backend.

## Code conventions

- Internal site links are absolute from `/` (e.g. `/architecture/`, not `/learn-fpga/architecture/` — that prefix is from an old GitHub Pages subpath layout and has been migrated).
- External links to firmware/peripheral code go to `github.com/benpayne/learn-fpga/...`. External links to bridges/backplane go to `github.com/benpayne/retrocpu-web/blob/main/bus-design/...`.
- Don't commit build artifacts. `dist/`, `node_modules/`, `bus-design/test/sim_build*/`, `*.vcd`, `__pycache__/`, and `results.xml` are all in `.gitignore`.

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License (see `LICENSE`). Commercial use is fine — go nuts. The whole point is that this work supports more retro builds, whoever does the building.

## Reaching out

- **Open an issue** in this repo for anything project-related — website, bus-design, firmware, FPGA, ideas. Issues about pre-migration code still in `learn-fpga` are also welcome here; the goal is to centralize the conversation.

For now, it's just me. That may change — and if it does, this file will be where the workflow gets written down.
