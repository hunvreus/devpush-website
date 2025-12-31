---
layout: layouts/doc.njk
title: Scripts
description: Available scripts for managing /dev/push.
---

All scripts are in `/opt/devpush/scripts/`.

<div class="alert">
  {% lucide "info" %}
  <h3>Is sudo required?</h3>
  <section><p>Scripts that manage services (<code>start.sh</code>, <code>stop.sh</code>, <code>restart.sh</code>, <code>install.sh</code>, <code>update.sh</code>, <code>uninstall.sh</code>) or access system directories (<code>backup.sh</code>, <code>restore.sh</code>) require <code>sudo</code>. Development scripts (<code>db-generate.sh</code>, <code>clean.sh</code>, <code>status.sh</code>, <code>compose.sh</code>) can run without sudo if your user is in the <code>docker</code> group.</p></section>
</div>

| Script | Description |
|--------|-------------|
| [backup.sh](#backup.sh) | Create backup of data, database, and metadata |
| [build-runners.sh](#build-runners.sh) | Build runner Docker images |
| [clean.sh](#clean.sh) | Stop stack and clean development data |
| [compose.sh](#compose.sh) | Docker Compose wrapper with correct config |
| [db-generate.sh](#db-generate.sh) | Generate Alembic migration |
| [db-migrate.sh](#db-migrate.sh) | Apply database migrations |
| [install.sh](#install.sh) | Install /dev/push on a server |
| [restart.sh](#restart.sh) | Restart services |
| [restore.sh](#restore.sh) | Restore from backup archive |
| [start.sh](#start.sh) | Start the stack |
| [status.sh](#status.sh) | Show stack status |
| [stop.sh](#stop.sh) | Stop services |
| [uninstall.sh](#uninstall.sh) | Remove /dev/push from server |
| [update.sh](#update.sh) | Update to a new version |

## backup.sh

Create a backup archive containing the data directory, database dump, and version metadata.

```bash
sudo /opt/devpush/scripts/backup.sh
```

Backups are saved to `/var/backups/devpush/` by default.

| Option | Description |
|--------|-------------|
| `--output <file>` | Custom output path for the backup archive |
| `--verbose` | Show detailed output |

<div class="flex flex-wrap gap-2 my-6">
  <a href="#restore.sh" class="badge-outline">
    restore.sh
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/operations/" class="badge-outline">
    Operations
    {% lucide "arrow-right" %}
  </a>
</div>

## build-runners.sh

Build the Docker images used for running deployments. Called automatically during installation and updates.

```bash
sudo /opt/devpush/scripts/build-runners.sh
```

| Option | Description |
|--------|-------------|
| `--no-cache` | Build without using Docker cache |
| `--image <name>` | Build only a specific runner image |

## clean.sh

Stop services and remove all Docker resources (containers, volumes, networks, images) and data directory.

```bash
/opt/devpush/scripts/clean.sh
```

**Note**: Can run without sudo if your user is in the `docker` group.

| Option | Description |
|--------|-------------|
| `--keep-docker` | Keep Docker resources (containers, volumes, networks, images) |
| `--keep-data` | Keep data directory |
| `--yes` | Skip confirmation prompts |

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Destructive operation</h3>
  <section>
    <p>This script removes all Docker resources and data. Use with caution, especially in production.</p>
  </section>
</div>

## compose.sh

Wrapper around `docker compose` that automatically loads the correct configuration files and environment.

```bash
/opt/devpush/scripts/compose.sh logs -f app
/opt/devpush/scripts/compose.sh exec app bash
```

**Note**: Can run without sudo if your user is in the `docker` group.

Pass any Docker Compose command after `--`:

```bash
/opt/devpush/scripts/compose.sh -- ps
```

## db-generate.sh

Generate a new Alembic database migration. Prompts for a migration message.

```bash
/opt/devpush/scripts/db-generate.sh
```

**Note**: Can run without sudo if your user is in the `docker` group.

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Development only</h3>
  <section>
    <p>Used during development to create new migrations. Migrations are applied automatically during startup.</p>
  </section>
</div>

## db-migrate.sh

Apply pending Alembic database migrations. Called automatically by `start.sh` and `restart.sh`.

```bash
sudo /opt/devpush/scripts/db-migrate.sh
```

| Option | Description |
|--------|-------------|
| `--timeout <sec>` | Timeout waiting for database (default: 30s) |

## install.sh

Install /dev/push on a fresh server. Sets up Docker, creates the system user, clones the repository, generates `.env`, and installs the systemd service.

```bash
curl -fsSL https://install.devpu.sh | sudo bash
```

Or run directly:

```bash
sudo /opt/devpush/scripts/install.sh
```

| Option | Description |
|--------|-------------|
| `--repo <url>` | Git repository URL (default: official repo) |
| `--ref <ref>` | Git ref to checkout (branch, tag, or commit) |
| `--yes` | Skip confirmation prompts |
| `--no-telemetry` | Disable anonymous install telemetry |
| `--verbose` | Show detailed output |

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/installation/" class="badge-outline">
    Installation guide
    {% lucide "arrow-right" %}
  </a>
</div>

## restart.sh

Restart all services. Runs database migrations by default.

```bash
sudo /opt/devpush/scripts/restart.sh
```

| Option | Description |
|--------|-------------|
| `--no-migrate` | Skip database migrations |

## restore.sh

Restore from a backup archive. Can selectively restore database, data directory, or code.

```bash
sudo /opt/devpush/scripts/restore.sh --archive /var/backups/devpush/backup.tar.gz
```

| Option | Description |
|--------|-------------|
| `--archive <file>` | Path to backup archive (required) |
| `--no-db` | Skip database restore |
| `--no-data` | Skip data directory restore |
| `--no-code` | Skip code restore |
| `--no-restart` | Don't restart after restore |
| `--no-backup` | Don't create backup before restore |
| `--remove-runners` | Remove runner containers before restoring |
| `--timeout <sec>` | Timeout for database operations |
| `--yes` | Skip confirmation prompts |
| `--verbose` | Show detailed output |

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Creates a backup first</h3>
  <section>
    <p>By default, restore creates a backup of current state before overwriting. Use <code>--no-backup</code> to skip this.</p>
  </section>
</div>

<div class="flex flex-wrap gap-2 my-6">
  <a href="#backup.sh" class="badge-outline">
    backup.sh
    {% lucide "arrow-right" %}
  </a>
</div>

## start.sh

Start the stack. Auto-detects development mode on macOS.

```bash
sudo /opt/devpush/scripts/start.sh
```

| Option | Description |
|--------|-------------|
| `--no-migrate` | Skip database migrations |
| `--timeout <sec>` | Health check timeout (default: 120s) |
| `--verbose` | Show detailed output |

## status.sh

Show the current status of all services.

```bash
/opt/devpush/scripts/status.sh
```

**Note**: Can run without sudo if your user is in the `docker` group.

## stop.sh

Stop all services.

```bash
sudo /opt/devpush/scripts/stop.sh
```

| Option | Description |
|--------|-------------|
| `--hard` | Force stop and remove containers |

## uninstall.sh

Remove /dev/push from the server. Creates a backup, stops containers, removes Docker resources, and prompts before deleting data.

```bash
sudo /opt/devpush/scripts/uninstall.sh
```

| Option | Description |
|--------|-------------|
| `--yes` | Skip confirmation prompts |
| `--skip-backup` | Skip creating a backup before uninstalling |
| `--no-telemetry` | Disable anonymous uninstall telemetry |
| `--verbose` | Show detailed output |

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/uninstalling/" class="badge-outline">
    Uninstalling guide
    {% lucide "arrow-right" %}
  </a>
</div>

## update.sh

Update to a new version. Creates a backup, pulls code, runs upgrade hooks, rebuilds containers, and restarts.

```bash
sudo /opt/devpush/scripts/update.sh
```

| Option | Description |
|--------|-------------|
| `--ref <ref>` | Target version, branch, or commit (default: latest stable) |
| `--skip-backup` | Skip pre-update backup |
| `--no-migrate` | Skip database migrations |
| `--no-telemetry` | Disable anonymous update telemetry |
| `--yes` | Skip confirmation prompts |
| `--verbose` | Show detailed output |

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/updating/" class="badge-outline">
    Updating guide
    {% lucide "arrow-right" %}
  </a>
</div>
