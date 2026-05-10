# retrocpu.io

Source for [retrocpu.io](https://retrocpu.io) — the website for the Retro-Active project, an open FPGA co-processor bringing modern peripherals to vintage CPUs.

Built with [Astro](https://astro.build/). The hardware, firmware, and bus-design work the site documents lives at [benpayne/learn-fpga](https://github.com/benpayne/learn-fpga).

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

- `src/pages/` — top-level routes (home, architecture, getting-started, projects, blog)
- `src/content/projects/` — one Markdown file per project card
- `src/content/blog/` — blog posts
- `src/components/` — Astro components (Header, Footer, PillarGrid, etc.)
- `src/styles/global.css` — theme tokens, fonts, reset
- `public/` — static assets served at the site root (fonts, images, `CNAME`)
- `specs/002-retro-web/` — original design spec and planning docs for the site
