# retrocpu.io

Organizing hub for the **Retro-Active project** — an open FPGA co-processor bringing modern peripherals to vintage CPUs.

This repo holds the public website at [retrocpu.io](https://retrocpu.io) (Astro 6) and `bus-design/` (host-CPU bridge RTL + cocotb tests). FemtoRV co-processor firmware and RetroKernel currently live in the legacy [`benpayne/learn-fpga`](https://github.com/benpayne/learn-fpga) repo and will be migrated here incrementally — new project work should land here, not there.

## Quick commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to dist/
npm run preview
```

## Deployment

GitHub Pages, via Actions:

- **Workflow**: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — runs on every push to `master` or `main`, and can be triggered manually via `workflow_dispatch`.
- **Pipeline**: `npm ci` → `npm run build` → upload `dist/` as a Pages artifact → deploy.
- **Custom domain**: `public/CNAME` contains `retrocpu.io`. The repo's **Settings → Pages → Custom domain** must also have `retrocpu.io` set, with DNS records pointing at GitHub Pages.

### One-time repo setup

1. **Settings → Pages → Build and deployment → Source**: select **GitHub Actions**.
2. **Settings → Pages → Custom domain**: enter `retrocpu.io`, enable "Enforce HTTPS" once the cert provisions.
3. DNS for `retrocpu.io`:
   - Apex (`@`): four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` (optional): `CNAME` to `benpayne.github.io`

## Layout

### Website (Astro)

- `src/pages/` — top-level routes (home, architecture, getting-started, projects, blog)
- `src/content/projects/` — one Markdown file per project card
- `src/content/blog/` — blog posts
- `src/components/` — Astro components (Header, Footer, PillarGrid, etc.)
- `src/styles/global.css` — theme tokens, fonts, reset
- `public/` — static assets served at the site root (fonts, images, `CNAME`)

### Bus-design feasibility proofs (`bus-design/`)

Reference RTL and cocotb tests for the host-CPU bridges the architecture
page claims are feasible. Two variants of each (pure 74-series and
single-22V10 PAL) verified by the same Python test suite.

- `bus-design/rtl/` — Verilog for the 6502 and 68000 bridges, the backplane decoder, and 74-series primitives
- `bus-design/test/` — cocotb testbenches + Makefile (`make TARGET={6502,6502_pal,68k,68k_pal}`)
- `bus-design/docs/backplane.md` — backplane signal reference

### Planning

- `specs/002-retro-web/` — original design spec and planning docs for the site
