---
layout: layouts/doc.njk
title: Presets & runners
description: How presets and runner images work, plus the bundled list and common env vars.
---

## Overview

- **Presets** are default settings for projects: build/pre-deploy/start commands and default runner.
- **Runners** define the container images that projects run on, including the build and deploy commands.

## How it works

- The **registry catalog** (`<DATA_DIR>/registry/catalog.json`) defines the default runners, presets, and detection rules.
- The **overrides file** (`<DATA)DIR>/registry/overrides.json`) enables or disables specific runners/presets for your instance.
- A project picks a **preset** (and optionally a runner override). You can always edit commands per project.
- At deploy time, /dev/push runs your build/pre-deploy/start commands inside the selected runner image.

## Registry updates

/dev/push ships with a **bundled registry** (catalog + overrides) so new installs work offline. You can also pull **remote registry updates** from the `devpushhq/registry` repository via the admin registry refresh flow when you want the latest presets and runner metadata.

To customize the catalog or add your own runners/presets, see: **[Customize the registry catalog](/docs/guides/customize-registry-catalog)**.

## Bundled presets

These presets are available in the bundled catalog:

| Preset | Typical use |
| --- | --- |
| `python` | Python apps |
| `flask` | Flask apps |
| `django` | Django apps |
| `fastapi` | FastAPI apps |
| `nodejs` | Node.js apps |
| `bun` | Bun apps |
| `go` | Go apps |
| `php` | PHP apps |
| `laravel` | Laravel apps |
| `drupal` | Drupal apps |

## Bundled runners

These runner images are in the bundled catalog:

| Runner | Runtime |
| --- | --- |
| `python-3.12` | CPython 3.12 |
| `pypy-3.11` | PyPy 3.11 |
| `node-20` | Node.js 20 |
| `bun-1.3` | Bun 1.3 |
| `go-1.25` | Go 1.25 |
| `php-fpm-8.3` | PHP 8.3 (FPM) |
| `php-fpm-node-8.3` | PHP 8.3 (FPM) + Node |
| `frankenphp-8.3` | PHP 8.3 (FrankenPHP) |
| `frankenphp-node-8.3` | FrankenPHP + Node |
| `frankenphp-node-worker-8.3` | FrankenPHP + Node (worker) |

## Defaults (overrides)

By default, /dev/push enables a subset of presets and runners via the overrides file. These defaults can be changed in the admin registry settings.

**Enabled by default (current bundle):**

- Presets: `python`, `flask`, `django`, `fastapi`, `nodejs`, `php`, `laravel`, `drupal`
- Runners: `python-3.12`, `node-20`, `frankenphp-8.3`, `frankenphp-node-8.3`, `frankenphp-node-worker-8.3`

## Runner env vars

Runners receive your project environment variables. Some runners also read **/dev/push‑specific** env vars:

| Env var | Purpose | Default |
| --- | --- | --- |
| `DEVPUSH_APP_ROOT` | Web root for PHP runners (FrankenPHP + PHP‑FPM) | `/app/public` |

Example (Drupal uses `/app/web`):

```
DEVPUSH_APP_ROOT=/app/web
```

## Custom runners & presets

If you need different runtimes or detection rules, you can extend the registry catalog and overrides. See the guide:

- **[Customize the registry catalog](/docs/guides/customize-registry-catalog)**
