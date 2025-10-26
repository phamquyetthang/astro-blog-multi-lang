# Astro Blog – Multi‑Language, Themeable, Giscus‑Ready

Terminal‑inspired, multilingual blog template powered by Astro 5, Tailwind 4, Pagefind search, Expressive Code syntax theming, and Giscus comments.

## Features

- Theming with Shiki/Expressive Code (Catppuccin, Dracula, GitHub, Material, more)
- Theme modes: single, light/dark/auto, or user‑selectable menu
- Built‑in i18n routing (default: English) with Vietnamese example (`/vi/...`)
- Markdown/MDX with TOC, admonitions, emoji shortcodes, KaTeX, reading time
- RSS and sitemap out of the box; SEO‑friendly meta
- Pagefind‑powered search (static, fast, no backend)
- Auto social card images via Satori + Resvg
- Optional GitHub activity calendar widget
- Giscus comments fully theme‑aware
- Static export; deploy anywhere

## Quick Start

- Clone
  - `git clone --depth 1 https://github.com/phamquyetthang/astro-blog-multi-lang my-blog && cd my-blog`
- Install
  - `yarn` (or `npm install` / `pnpm install`)
- Develop
  - `yarn dev` then open the printed URL
- Build & Preview
  - `yarn build && yarn preview` (includes Pagefind indexing)

Requirements: Node 18+ is recommended for Astro 5.

## Configuration

Central configuration lives in `src/site.config.ts`:

- Site metadata: title, description, author, `site` URL, tags
- Navigation links and footer social links
- Theming: mode (`single` | `light-dark-auto` | `select`), default theme, included Shiki themes, optional overrides per theme key
- Pagination size and trailing slash strategy
- Giscus: repository, discussion category, reaction settings
- Characters (assets for the character chat UI)

Also review `astro.config.mjs` for:

- i18n settings (default locale `en`, available locales `['en','vi']`)
- Markdown/remark/rehype plugins (admonitions, math, emoji, TOC links, external links, unwrap images)
- Integrations (sitemap, mdx, expressive-code) and Tailwind v4 via Vite plugin

## Content Authoring

Content is managed with `astro:content` collections and Zod schemas.

- Posts live in `src/content/posts` as `.md` or `.mdx`
- Example frontmatter fields:
  - `title` (string)
  - `canonicalSlug` (string, optional) — share a slug across translations
  - `published` (date)
  - `draft` (boolean, default false)
  - `description` (string, optional)
  - `author` (string, optional)
  - `series` (string, optional)
  - `tags` (string[], optional)
  - `lang` (`en` | `vi`, defaults to `en`)
  - `coverImage` ({ src, alt }, optional)
  - `toc` (boolean, default true)

Home and footer addendum content:

- `src/content/home.en.md`, `src/content/home.vi.md`
- `src/content/addendum.en.md`, `src/content/addendum.vi.md`

## Internationalization (i18n)

- Default locale: `en`; available: `en`, `vi`
- Default locale is not prefixed (e.g., `/posts/...`), while others are (`/vi/posts/...`)
- Translate pages by mirroring structure under `src/pages/vi/` (e.g., `index.astro`, `about.md`, `posts`, `tags`, `series`)
- UI strings are defined in `src/i18n/config.ts` with a simple key‑path and fallback mechanism

For translated posts, keep a shared `canonicalSlug` between languages so both build to the same path pattern per locale.

## Theming

- Configure in `src/site.config.ts > themes`
- Modes:
  - `single`: lock the site to one theme
  - `light-dark-auto`: pair two themes and respect OS preference with toggle
  - `select`: expose a theme picker dialog with multiple bundled themes
- Colors are resolved from Shiki token colors; optional per‑theme overrides let you fine‑tune headings, links, admonitions, etc.

## Search

- Uses Pagefind to index the static `dist` during `postbuild`
- No extra setup required; search UI is included as a component

## Comments (Giscus)

- Update `giscus` in `src/site.config.ts` with your repo, category, and IDs from https://giscus.app
- Set your site origin in `giscus.json` at the repo root (used to theme the embed)
- The loader auto‑updates Giscus theme when the site theme changes

## Social Cards

- Dynamic OG images generated at build/serve via Satori + Resvg
- Set `socialCardAvatarImage` in `src/site.config.ts` to a square JPEG (recommended); ensure the path exists

## Scripts

- `yarn dev` — start dev server
- `yarn build` — production build
- `yarn preview` — preview built site
- `yarn format` — Prettier format (Astro plugin included)

## Deployment

- The project outputs a static site; deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.)
- Set `site` in `src/site.config.ts` to your canonical origin so sitemap/RSS and absolute links are correct

## License

MIT — see `LICENSE.txt`.
