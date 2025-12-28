---
layout: layouts/doc.njk
title: Updating
description: How to update /dev/push to the latest version.
---

## Automated update

```bash
sudo /opt/devpush/scripts/update.sh
```

This creates a backup, pulls the latest code, runs upgrade hooks, rebuilds containers, and restarts the service.

To update to a specific release or branch:

```bash
sudo /opt/devpush/scripts/update.sh --ref v1.2.0
```

Pre-releases (e.g., `v1.0.0-rc.1`) aren't installed by default. Use `--ref` to install them explicitly:

```bash
sudo /opt/devpush/scripts/update.sh --ref v1.0.0-rc.1
```

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/scripts#update.sh" class="badge-outline">
    update.sh
    {% lucide "arrow-right" %}
  </a>
</div>

## Manual update

If you need more control or installed manually:

```bash
cd /opt/devpush
sudo -u devpush git fetch origin
sudo -u devpush git checkout v1.2.0
sudo ./scripts/build-runners.sh
sudo systemctl restart devpush.service
```

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Upgrade hooks</h3>
  <section>
    <p>Version-specific migrations in <code>scripts/upgrades/</code> run automatically during updates. Manual updates skip these—check the upgrade scripts for any required steps between versions.</p>
  </section>
</div>

## Rollback

If an update fails, restore from the pre-update backup:

```bash
sudo /opt/devpush/scripts/restore.sh --archive /var/backups/devpush/devpush-backup-*.tar.gz
```

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/operations/" class="badge-outline">
    Backups
    {% lucide "arrow-right" %}
  </a>
</div>
