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
    "logo": "<svg>...</svg>",
    "detection": {
      "priority": 30,
      "any_files": ["requirements.txt", "pyproject.toml"]
    }
  }
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
| <code class="text-fuchsia-600 dark:text-fuchsia-400">detection</code>  | `object` | No | Auto-detection rules for this preset. |

### Detection

The `detection` object enables automatic preset detection when creating a new project. When a user selects a repository, DevPush scans its file tree and matches against detection rules to suggest the appropriate preset.

| Field | Type | Description |
| --- | --- | --- |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">priority</code> | `number` | Higher values win when multiple presets match (default: 0). |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">any_files</code> | `array` | At least one file must exist. Supports globs (e.g. `*/settings.py`). |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">all_files</code> | `array` | All files must exist. Supports globs. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">any_paths</code> | `array` | Alias for `any_files` (supports globs). |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">none_files</code> | `array` | None of these files should exist. Used for exclusions. |
| <code class="text-fuchsia-600 dark:text-fuchsia-400">package_check</code> | `string` | Dependency name to find in `requirements.txt`, `pyproject.toml`, or `package.json`. |

Example detection rules:

```json
{
  "slug": "django",
  "detection": {
    "priority": 100,
    "any_files": ["manage.py", "*/manage.py"],
    "any_paths": ["*/settings.py", "*/wsgi.py"]
  }
}
```

```json
{
  "slug": "fastapi",
  "detection": {
    "priority": 95,
    "any_files": ["requirements.txt", "pyproject.toml"],
    "none_files": ["manage.py"],
    "package_check": "fastapi"
  }
}
```

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

Runner Dockerfiles live in `docker/runner/` inside the DevPush app source. Each file is named `Dockerfile.<slug>` and is used to build the runner image for that slug (for example, `Dockerfile.python-3.12`).

## Overriding

To override presets and/or images, place JSON files in the data directory with the correct ownership and permissions. You can override only one file or both.

```bash
sudo install -m 0644 -o devpush -g devpush ./presets.json /var/lib/devpush/presets.json
sudo install -m 0644 -o devpush -g devpush ./images.json /var/lib/devpush/images.json
```

Runner images are built from Dockerfiles based on the `slug` provided in the `images.json` file. This means you can override a runner without changing `images.json`.

```bash
sudo install -d -m 0755 -o devpush -g devpush /var/lib/devpush/runner
sudo install -m 0644 -o devpush -g devpush ./Dockerfile.python-3.12 \
  /var/lib/devpush/runner/Dockerfile.python-3.12
```
