# /dev/push Documentation Website

Documentation website for [/dev/push](https://devpu.sh), an open-source, self-hosted platform for deploying apps from GitHub.

## Tech Stack

- **Eleventy (11ty)** - Static site generator
- **Nunjucks** - Template engine
- **Tailwind CSS** - Styling
- **Alpine.js** - JavaScript framework
- **Basecoat** - UI components

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server with hot reload:

```bash
npm run dev
```

This will:
- Start Eleventy dev server (default: http://localhost:8080)
- Watch for changes and rebuild
- Watch Tailwind CSS and rebuild styles

### Build for Production

```bash
npm run build
```

This will:
- Copy Basecoat and Alpine.js assets
- Build and minify Tailwind CSS
- Generate the static site in `_site/`

## Environment Variables

- `SITE_URL` - Base URL for absolute links (default: `http://localhost:8080`)
  - Set to your production domain when building for production
  - Example: `SITE_URL=https://devpu.sh npm run build`

## Project Structure

```
├── _data/              # Global data files
├── _includes/          # Templates, layouts, partials
│   ├── layouts/       # Page layouts
│   ├── partials/      # Reusable components
│   └── macros/        # Nunjucks macros
├── assets/            # Static assets (CSS, JS, images)
├── docs/              # Documentation content (Markdown)
├── src/               # Source files (Tailwind CSS)
└── _site/             # Generated output (gitignored)
```

## Content

Documentation pages are written in Markdown and located in `docs/`. The menu structure is defined in `docs/docs.json`.

