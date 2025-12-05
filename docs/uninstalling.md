---
layout: layouts/doc.njk
title: Uninstalling
description: How to remove /dev/push from your server.
---

## Automated uninstall

```bash
sudo /opt/devpush/scripts/uninstall.sh
```

The script creates a backup, stops containers, removes Docker resources, and prompts before deleting data directories.

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/scripts#uninstall.sh" class="badge-outline">
    uninstall.sh
    {% lucide "arrow-right" %}
  </a>
</div>

## Manual uninstall

### 1. Stop and remove containers

```bash
cd /opt/devpush
sudo ./scripts/compose.sh down --volumes --remove-orphans
```

### 2. Remove Docker resources

```bash
sudo docker image prune -a --filter "label=com.devpush"
sudo docker volume rm devpush-db loki-data alloy-data 2>/dev/null
sudo docker network rm devpush_default devpush_internal 2>/dev/null
```

### 3. Remove systemd service

```bash
sudo systemctl disable --now devpush.service
sudo rm /etc/systemd/system/devpush.service
sudo systemctl daemon-reload
```

### 4. Remove files

```bash
sudo rm -rf /opt/devpush
sudo rm -rf /var/lib/devpush
```

**Note**: Backups in `/var/backups/devpush` are preserved. Remove them manually if needed.

### 5. Remove system user (optional)

```bash
sudo userdel devpush
```

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Back up first</h3>
  <section>
    <p>Database data is in the <code>devpush-db</code> Docker volume. Run <code>scripts/backup.sh</code> before uninstalling if you need the data.</p>
  </section>
</div>

## Delete the GitHub App

After uninstalling, delete the GitHub App:

1. Go to [GitHub Settings › Developer settings › GitHub Apps](https://github.com/settings/apps)
2. Find your /dev/push app
3. Click **Edit** → **Delete GitHub App**

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/scripts/#uninstall.sh" class="badge-outline">
    uninstall.sh
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/scripts/#backup.sh" class="badge-outline">
    backup.sh
    {% lucide "arrow-right" %}
  </a>
</div>
