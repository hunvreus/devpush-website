# devpush website

Marketing pages and documentation for [devpush](https://devpu.sh), built with
Astro, ReallySimpleDocs, Basecoat Nova and the application's shadcn/ui Taupe theme.

## Develop

Requires Node.js 22.12+ and pnpm 10.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4322`. `pnpm build` generates `dist/` and checks local
links, anchors, legacy redirects, search, Markdown exports and LLM files.
`pnpm test` checks the imported documentation manifest and provenance.

## Import documentation and theme

The source of truth is `hunvreus/devpush`: its flat `docs/` directory and
`app/src/styles/theme.css`. The website commits an imported snapshot and builds
without a sibling checkout or a network fetch. Navigation uses Getting started, Basics, Administration & Operations, Reference and Development. Keep these visual groups in the source `docs/docs.json`. Installation links target `/docs/self-hosting/`,
while `/docs/getting-started/` serves people using an existing dashboard. Do not edit imported docs or the
copied theme here.

```bash
pnpm sync:docs
pnpm test
pnpm build
```

The import defaults to `../devpush`. For a checkout elsewhere:

```bash
DEVPUSH_DOCS_PATH=/path/to/devpush pnpm sync:docs
```

Use a checkout of the revision you intend to publish. `docs-source.json` records
its commit and whether the imported files had uncommitted changes. Review and
commit `docs/`, `docs-source.json` and `src/styles/theme.css` together. A docs-only
correction needs no application deployment. Imports never read `.env` or application
credentials. ReallySimpleDocs is consumed as a published package; its sibling
source is `../reallysimpledocs` for integration reference, not a build dependency.

## Edit the website

Keep marketing typography plain and the product prominent. The logo uses the same
orange in both themes; avoid decorative eyebrows. Workflow numbers identify sequential setup steps.

- `src/pages/index.astro`: homepage structure, copy and feature inventory.
  A two-column workflow precedes the twelve-card feature grid, with simplified terminal, Git push and deployment-log illustrations.
- `src/components/FeaturePreview.astro`: small static UI excerpts adapted from the
  original feature partials and checked against current app controls. They use
  fictitious example data, are inert and stay out of the keyboard/accessibility tree.
- `src/components/ProductPreview.astro`: light/dark deployment screenshots over the desert backdrop. The play button opens the current demo in a Basecoat dialog. Playback starts on click and stops/resets when closed, including Escape and backdrop clicks. The video is not preloaded.
- `public/screenshots/` and `public/images/deployment-wallpaper.jpg`: homepage screenshots and backdrop.
- `public/videos/`: optimized 1080p MP4, poster and source credits. Replace both video assets when updating the demo; keep the full-quality master outside the website.
- `src/layouts/Site.astro`: sticky marketing navigation, metadata and grouped footer.
  The header border appears after scrolling; the theme toggle lives in the footer.
- `src/styles/site.css`: marketing layout and typography; components use Basecoat.
- `src/components/Docs*.astro`: ReallySimpleDocs branding and navigation slots.
  Docs, marketing header and footer share the same logo styles (16px mark and wordmark).
- `scripts/redirects.mjs`: former documentation URLs mapped to current guides.
- `src/pages/privacy.astro` and `terms.astro`: legal text retained from the previous
  site. Replatforming did not constitute a legal-policy review.

## Publish

Configure the existing static-site host to build with `pnpm build` and publish
`dist/` instead of the old Eleventy `_site/` directory. Pin the Node version to 22.12
or newer. `astro.config.mjs` defines `https://devpu.sh` as the canonical origin.

Cloudflare Pages can use the generated `_redirects` file for HTTP 301s. Astro also
emits HTML redirect pages for other static hosts. The existing community link
remains `https://devpu.sh/chat`; its redirect is managed outside this repository
and must be preserved during the domain/account migration.

No production deployment or DNS change is performed by the build or docs import.

The closing CTA uses centered text and actions on the page background. Keep section
separation primarily in spacing; reserve faint rules for FAQ rows and the footer.

## Navigation and supporting pages

Section spacing uses `--section-space`: 72px per side on desktop and 48px on
mobile. Adjacent content blocks therefore have 144px / 96px of clear space.
The community logos, closing CTA and footer use the same rhythm; do not stack
one-off margins on these boundaries. Heading-to-content spacing stays separate.

Homepage section descriptions, feature copy, workflow descriptions and FAQ answers
share the 14px marketing body scale and line height. Page/hero introductions keep
the larger lead scale; footer labels and product mocks retain their own hierarchy.
Homepage hero, section and closing CTA headings share a 22ch maximum width with
balanced, natural wrapping. Description widths are controlled independently;
keep the surrounding layout at full width.
Use `feature-link` for secondary discovery links and Basecoat buttons for actions.
Underline only inline paragraph links; never apply prose decoration to linked
items/cards or discovery links.
Scope mock UI styles to their preview so they cannot alter another illustration.
The apps grid clips its gap background to the padding box so translucent border
tokens are painted once on both the perimeter and internal dividers.

- `src/content/navigation.ts` is the header/footer link inventory. Keep Rotsu to
  the passing attribution; do not add a corporate navigation group.
- `src/components/DeploymentWorkflow.astro` places the section headline and three
  compact tabs with animated left progress indicators and text-only hover feedback on the
  left, with animated installer, Git push and deployment-log previews on the right.
  Only the active tab's description expands; the left indicator is flush with its
  tab edge. Tabs use 10px vertical padding and no hover background. The preview
  sits on a muted Taupe backdrop with a tight 16px inset (12px on mobile).
  Tabs support click, arrow keys, Home and End.
  Autoplay advances while in view; choosing a tab stops automatic advancement.
  Reduced motion shows final states. Mobile stacks copy/tabs above the preview; without JavaScript,
  all three illustrations remain visible. Commands are abbreviated examples;
  repository names, commits and logs are illustrative data, not live controls.
- Main preview cards and the video player use a 12px radius.
- The FAQ uses Basecoat's `accordion` markup and runtime. Avoid bespoke disclosure
  styling or behavior. Tabs, popovers, items, empty states, fields, buttons and
  badges also use the installed Nova components where applicable.
- The primary actions link to self-hosted installation until Cloud signup is available.
- The self-hosting navigation links to the installation guide. Sponsor links go directly to
  `https://github.com/sponsors/hunvreus`; no separate sponsor page is needed.
- Changelog links point to the product repository's `development` branch until the rewrite reaches `main`.
- `src/content/homepage-apps.ts` selects the 12 homepage apps from the same directory
  metadata. Keep the standard section heading and description above the grid and
  the Browse apps action below it using the feature Learn more link style. The
  grid uses 6 columns above 1050px, 4 through 1050px, 3 through 700px and 2
  through 480px. Marks are monochrome until hover or keyboard focus,
  when brand colors appear. These link to upstream guides, not one-click integrations.
- “Apps” links to `/compose-examples/`, a directory of upstream Compose documentation, not deploy buttons
  or verified devpush integrations. Maintain the 34 entries in
  `src/content/compose-examples.json`; categories derive from those entries and
  appear as Basecoat secondary badges. Official
  App marks are local assets in `public/logos/apps/`, sourced from Dashboard Icons
  at the pinned revision in `sources.json`, with its license included. Use
  `logoDark` for a dedicated dark-background variant, or `invertLogoOnDark`
  for a purely black mark that should become white. `lightLogoBackground` keeps
  a dark brand mark on a light tile without recoloring it.
  Logos are decorative beside the app name; no icon package or remote image requests.
  Official links were checked on 2026-10-17. Descriptions are original summaries, not copied
  documentation. Refresh links as upstream projects move their guides.
- Unfinished comparison pages remain available but are excluded from indexing and
  no longer promoted in the footer. Write substantive comparisons before adding
  them back to primary navigation.

Secondary marketing pages use `src/layouts/MarketingPage.astro` for a shared site-width layout, intro measure and typography. Legal pages retain a narrower reading layout.

## Community logos

`src/components/CommunityLogos.astro` displays the twelve entries in
`src/content/community-logos.json`. The wording is “Starred by developers at,”
not a claim of company adoption or endorsement. Each entry records a public
GitHub profile matching an affiliation in the 2026-10-16 stargazer export.
Keep private account exports out of this repository.

SVG marks are stored locally in `public/logos/community/`; there is no runtime
logo API or new package dependency. Each JSON entry records its asset source.
Marks come from [Simple Icons](https://github.com/simple-icons/simple-icons)
(CC0) and the Microsoft mark from [SVGL](https://github.com/pheralb/svgl)
(MIT). Brand marks remain trademarks of their respective owners. Preserve the
source license notices when changing these assets.

## Production

Run `pnpm run deploy` to build and deploy the site to the devpush Cloudflare account at `devpu.sh`. The hosted dashboard is `app.devpu.sh`.

## README demo image

Run `node scripts/generate-readme-image.mjs` to compose the README thumbnail from
the original dark dashboard screenshot and wallpaper, with a play overlay. The
output preserves the dashboard’s native resolution; no browser capture is used.
