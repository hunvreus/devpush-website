---
layout: layouts/doc.njk
title: Customize presets and images
description: Override the framework presets and Docker images used for building and deploying your apps.
---

![Presets and images](/media/presets-and-images.png)

## File format

### Presets

The presets file (`/opt/devpush/app/settings/presets.json`) is a list of objects, each one describing a possible preset that you can select in your project settings.

Example:

```json
[
  {
    "slug": "python",
    "name": "Python",
    "category": "Python",
    "image": "python-3.12",
    "build_command": "pip install -r requirements.txt",
    "pre_deploy_command": "",
    "start_command": "gunicorn -w 3 -b 0.0.0.0:8000 main:app",
    "logo": "<svg>...</svg>"
  },
  (...)
]
```

Each preset has the following fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">slug</code> | `string` | Yes | Unique identifier used in URLs and config overrides. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">name</code> | `string` | Yes | Display name shown in the UI. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">category</code> | `string` | No | UI grouping for the preset list. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">image</code> | `string` | No | Default runner image slug (must exist in images list). |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">root_directory</code> | `string` | No | Working directory for commands (e.g. `./` or `apps/api`). |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">build_command</code> | `string` | Yes | Install/build step run during deployment. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">pre_deploy_command</code> | `string` | Yes | Optional step run before starting the app. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">start_command</code>  | `string` | Yes | Command used to start the app. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">beta</code>  | `boolean` | No | Marks the preset as beta in the UI. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">logo</code>  | `string` | Yes | SVG markup used as the preset icon. |

### Images

The images file (`/opt/devpush/app/settings/images.json`) is a list of runner images. Each entry describes what the user can select in the project settings.

Example:

```json
[
  {
    "slug": "python-3.12",
    "name": "Python 3.12",
    "category": "Python"
  }
]
```

Fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">slug</code> | string | Yes | Image identifier (maps to a Dockerfile name). |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">name</code> | string | Yes | Display name shown in the UI. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">category</code> | string | Yes | UI grouping for the image list. |

### Dockerfiles

Runner Dockerfiles live in `docker/runner/` inside the DevPush app source `/opt/devpush/`. Each file is named `Dockerfile.<slug>` and is used to build the runner image for that slug (for example, `Dockerfile.python-3.12`).

## Overriding

To override presets and/or images, place JSON files in the data directory with the correct ownership and permissions. You can override only one file or both.

```bash
sudo install -m 0644 -o devpush -g devpush /opt/devpush/app/settings/presets.json /var/lib/devpush/presets.json
sudo install -m 0644 -o devpush -g devpush /opt/devpush/app/settings/images.json /var/lib/devpush/images.json
```

Runner images are built from Dockerfiles based on the `slug` provided in the `images.json` file. This means you can override a runner without changing `images.json`.

```bash
sudo install -d -m 0755 -o devpush -g devpush /var/lib/devpush/runner
sudo install -m 0644 -o devpush -g devpush /opt/devpush/docker/runner/Dockerfile.python-3.12 \
  /var/lib/devpush/runner/Dockerfile.python-3.12
```
