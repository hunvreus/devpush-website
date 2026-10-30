# Changelog

## Unreleased

### Changed

- Enlarge the video close icon and align it with the video edge; show keyboard focus on the play icon instead of outlining the cover.

- Make the entire homepage preview open the video, including the surrounding image background.

- Publish separate API/MCP guides, complete endpoint and tool references, and collapsible documentation navigation.

- Sync installation and release documentation with the current OSS checkout.

- Use the current centered white logo on orange for marketing and docs social cards; keep icons aligned with the app and version branding URLs.

- Compose the README demo image directly from source assets at native resolution.

- Open the current product demo in a video modal from the existing homepage screenshot.

- Expand mobile navigation below the header with larger links and a close toggle.

- Add GitHub navigation and pair online and self-hosting calls to action.

- Replace redundant marketing pages with links and redirects to the docs.
- Point footer installation and contributing links directly to their guides.
- Sync the latest docs, fix documentation links and replace unavailable Cloud signup links with installation links.
- Correct installation and dashboard-removal redirects; align the imported guides with the current UI.

- Refresh the concise documentation, overview and visual sidebar groups; preserve page URLs and redirects for merged guides.

- Simplify footer navigation into getting started, project and help links, with
  direct paths to setup and first deployment.

- Import the task-focused documentation review, including first deployment, domains
  and HTTPS, self-hosting and advanced command guides. Point installation links
  to the self-hosting entrypoint.

- Match the docs logo to the marketing header and footer with shared size, spacing
  and orange branding.

- Constrain homepage hero, section and closing CTA headings consistently to 22ch,
  with balanced wrapping and independently sized descriptions.

- Display app-directory categories as Basecoat secondary badges.

- Restrict prose underlines to inline paragraph links so app cards and discovery
  links retain their Basecoat styling.

- Give workflow visuals a muted Taupe backdrop with a compact 16px inset, reduced
  to 12px on mobile, while preserving the overall preview height.

- Tighten workflow tab vertical padding to 10px and remove hover backgrounds;
  retain text-color feedback and the animated left indicator.

- Expand workflow descriptions only for the active tab. Make the left progress
  indicator flush with its hover area and remove the preview's padded outer frame.

- Restore animated installer output, Git push typing and deployment log/status
  playback in the workflow. Restore autoplay with left progress indicators;
  remove horizontal tab dividers and keep square hover backgrounds.

- Redesign the workflow with its headline and divider-separated tabs in the left
  column, a preview on the right, and subtle hover backgrounds. Add keyboard
  navigation without autoplay. Unify section-boundary spacing across community
  logos, main sections, the closing CTA and footer using one responsive value.

- Replace workflow tabs with three always-visible illustrations: connect a server,
  push a commit and deploy. Remove tab controls, autoplay and animation timers.
  Fix the apps grid perimeter appearing brighter than its internal dividers by
  preventing its translucent background from also painting beneath the border.

- Top-align the workflow step copy with its preview backdrop.

- Limit the homepage apps grid to the selected twelve apps with 6/4/3/2 responsive
  columns. Align Browse apps with Learn more links and unify homepage description
  typography. Scope deployment mock styles to prevent feature-preview collisions,
  align the not-found page with other page introductions, and add consistent
  hover/focus treatment to content links.

- Match the homepage apps heading to other sections and move Browse apps below
  the grid. Show the requested 20 apps and include all of them in the 34-app
  directory, sharing one metadata source and local logos. Include Hermes Agent,
  Strapi, Bitwarden, PostHog, Home Assistant and AppFlowy with official setup links.

- Restore the homepage apps grid and shorten its introduction. Simplify workflow
  previews, remove numbered circles and captions, and crop deployment chrome.
  Center previews, align main card radiuses, and keep the demo button centered
  while scaling on hover or keyboard focus.

- Rework the homepage apps section into a compact logo list with a short
  introduction and monochrome marks that reveal brand colors on hover/focus.
  Include Metabase, Mattermost, Penpot and Open WebUI; remove the FAQ docs link.

- Turn "How it works" into three tabs beside one animated, illustrative view on a
  flat backdrop: a terminal replaying the real agent installer output against
  app.devpu.sh, a terminal running `git push` with Git's actual output, and a
  compact copy of the devpush deployment page going from queued to succeeded
  with the agent's real log messages. Tabs advance while in view and stop
  when one is selected; reduced motion shows final states. Phones show the view
  above the tabs. No new dependencies.

- Replace the homepage app and sponsorship blurbs with a twelve-app logo grid
  taken from the app directory data. Sponsor links remain in the header and footer.

- Remove the unnecessary first-project advice block below the app directory.

- Expand the app directory to 24 entries with Outline, Memos, Plausible and
  Stirling PDF, each with a local logo and official Compose guide. Derive the
  initial app count from the directory data.

- Add locally stored project logos to all twenty app directory entries, with
  dark-theme variants where needed and recorded sources/license. No new dependency.

- Point Cloud signup directly to app.devpu.sh and replace the coming-soon line
  with an invitation-only access notice. Group Self-host with the navigation,
  link Sponsor directly to GitHub Sponsors, and remove the retired Cloud and
  sponsor landing pages. Rename the app directory's visible copy to “Apps” and
  “Apps to self-host”; retain the existing directory URL.

- Replaced the deployment diagram and tabs with a vertical three-step walkthrough:
  connect your server, push your code, deploy. Pair each step with a simplified
  terminal, Git commit or deployment-log illustration; keep all steps visible on
  desktop/mobile and label illustrative content. Remove the retired diagram CSS
  and animation, with no new dependencies or client-side behavior.

- Added twelve locally stored company marks under “Starred by developers at,”
  with public affiliation and asset-source records.

- Renamed the software directory to Compose examples and standardized all secondary
  marketing pages on a shared layout, headline scale and body text size.
- Replaced repeated workflow nodes with distinct installation, project configuration
  and deployment illustrations.

- Replaced the bespoke FAQ with Basecoat's accordion and introduced Basecoat
  workflow tabs with a visual explanation of servers, projects and deployments.
- Reorganized header/footer links around product, resources and community, with
  Basecoat mobile navigation and a passing Rotsu attribution.
- Added explicit Cloud/self-hosting paths, a substantive self-hosting page and
  sponsorship links. Cloud is marked coming soon; early access opens an email.
- Added a searchable directory of 20 upstream Compose examples with category filters
  and a Basecoat empty state. These are reference links, not deploy integrations.

- Linked project attribution to Rotsu, matched the footer logo to the header size
  and softened the footer theme control to match utility links.

- Restored the original two-row Push to deploy preview with status, duration and
  commit metadata, and applied right-edge fades to deployment and domain previews.

- Restored the twelve-card homepage after the experimental redesign. Removed the
  company-logo row and expanded story sections, softened separators and centered
  the closing CTA on the plain page background.
- Fixed native dark-theme controls for visitors using reduced-motion settings.

- Moved the setup flow directly below the product screenshot, with connected steps
  and clearer copy separating the control plane from application hosting. Tightened
  the hero copy and made primary and GitHub actions consistent.

- Clarified “How it works” as three numbered steps and removed redundant per-step
  documentation links.

- Tightened deployment captures to 1550 × 872, fitting their full content height
  and normal page padding without surplus space below the page.

- Made the header sticky with a border only after scrolling and moved theme controls
  into the expanded, grouped footer. Added self-hosting, audience and about pages,
  plus clearly marked comparison placeholders for Coolify, Dokploy, Vercel and Render.
- Reframed the deployment captures at 1600 × 900 to include the complete page without
  an outer scrollbar. Added a play control for the existing demo over a faded desert
  wallpaper, and removed the screenshot caption.
- Restored feature fades, moved feature links below their previews, and aligned
  collaborator avatars, identity text and role controls with the app.

- Restored the old feature UI excerpts as Astro previews, updating environment
  cards, variable fields, domain rows, logs and deployment actions to current UI.
  Added matching examples for backups, metrics and API keys. Examples are inert
  and explicitly illustrative; the main deployment screenshot remains unedited.

- Show the webp-app deployment detail view at 1440 × 800, with a muted original
  landscape wallpaper and a hero frame near 1.8:1. Removed the old overview captures.

- Shared the app’s slightly lifted dark page background across marketing and docs;
  replaced the marketing page’s sidebar/card background token.

- Restored a concise feature inventory with current deployment, operations and
  automation capabilities. GitHub and navigation actions use Basecoat ghost buttons.
- Replaced the hand-built product mockup and illustrative feature panels with
  light/dark captures of the actual local project overview; removed their unused CSS.

- Kept the logo orange identical in light and dark modes and simplified the
  homepage typography, introduction and section headings; removed decorative
  eyebrows, numbering and stage labels.

- Revised the homepage with Taupe surfaces, an editorial split introduction, a
  framed product view and illustrated Compose, operations and integration sections.

- Rebuilt marketing pages with a restrained product-focused structure, current
  Docker Compose deployment copy, capability reference links and practical FAQ.
- Replaced Eleventy, Nunjucks, Alpine and custom documentation/search rendering
  with Astro, ReallySimpleDocs and Basecoat Nova.
- Applied the application's shadcn/ui Taupe theme with Inter and IBM Plex Mono;
  light/dark mode persists across marketing and documentation pages.
- Imported the 18 current docs pages from the product repo. The explicit import
  also copies its theme and records source revision/dirty status.
- Preserved legal content, added legacy docs redirects, and removed retired
  presets/runners docs, screenshot assets and generated frontend bundles.

### Added

- Build checks for local links, anchors, documentation exports, search and LLM
  files, plus navigation and import-provenance tests.

Production publication still requires updating the existing host's build command
and output directory. No production deployment or domain change is included.
