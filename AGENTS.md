# Agent rules

- Build the marketing site with Astro, ReallySimpleDocs and Basecoat Nova. Use the
  app's imported Taupe theme. Keep the design sober, compact and product-focused.
- Use Basecoat markup for UI primitives. Marketing layouts belong in site CSS;
  do not recreate buttons, dialogs, search or documentation chrome.
- Keep copy factual. Docker Compose is the supported runtime; do not advertise
  Docker Swarm, Dockerfile-only projects, guaranteed zero downtime or a hosted
  offering that is not available. Label illustrative product views.
- Source docs live in `../devpush/docs/`. Import with `pnpm sync:docs`; do not edit
  this site's generated docs or theme independently. Marketing copy stays here.
- Preserve legal text unless a legal-policy change is explicitly requested.
- Remove dead assets and dependencies after replacing functionality. Keep legacy
  documentation redirects in `scripts/redirects.mjs`.
- Run `pnpm test` and `pnpm build`. Verify desktop/mobile and light/dark in a
  browser, including docs search, theme persistence and FAQ interactions.
- Update README and CHANGELOG for workflow/structure changes. Keep backlog in the
  product repo's TODO.md. Put temporary review notes under `.tmp/`.
- Never close or kill the user's Chrome.
