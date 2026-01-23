---
layout: layouts/doc.njk
title: Operations
description: Managing and monitoring your /dev/push installation.
---

## Service management

```bash
sudo systemctl start devpush.service
sudo systemctl stop devpush.service
sudo systemctl restart devpush.service
sudo systemctl status devpush.service
```

Or use the scripts directly:

```bash
sudo /opt/devpush/scripts/start.sh
sudo /opt/devpush/scripts/stop.sh
sudo /opt/devpush/scripts/restart.sh
sudo /opt/devpush/scripts/status.sh
```

## Logs

View all container logs:

```bash
sudo /opt/devpush/scripts/compose.sh logs -f
```

View specific service logs:

```bash
sudo /opt/devpush/scripts/compose.sh logs app
sudo /opt/devpush/scripts/compose.sh logs traefik
sudo /opt/devpush/scripts/compose.sh logs worker-jobs
```

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/scripts#compose.sh" class="badge-outline">
    compose.sh
    {% lucide "arrow-right" %}
  </a>
</div>

## File locations

| Path | Description |
|------|-------------|
| `/opt/devpush` | Application code |
| `/var/lib/devpush` | Data directory |
| `/var/lib/devpush/.env` | Configuration |
| `/var/lib/devpush/traefik` | Traefik config and certificates |
| `/var/lib/devpush/upload` | Uploaded files |
| `/var/lib/devpush/version.json` | Installed version info |
| `/var/backups/devpush` | Backups |

## Backups

Create a backup:

```bash
sudo /opt/devpush/scripts/backup.sh
```

Backups are stored in `/var/backups/devpush/` and include:
- Database dump
- Data directory (uploads, Traefik config)
- Version metadata

Restore from backup:

```bash
sudo /opt/devpush/scripts/restore.sh --archive /var/backups/devpush/backup-file.tar.gz
```

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/scripts#backup.sh" class="badge-outline">
    backup.sh
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/scripts#restore.sh" class="badge-outline">
    restore.sh
    {% lucide "arrow-right" %}
  </a>
</div>

