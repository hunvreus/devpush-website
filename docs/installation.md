---
layout: layouts/doc.njk
title: Installation
description: How to install /dev/push on a server.
---

## Prerequisites

- **Server**: Ubuntu 20.04+ or Debian 11+ with SSH access and sudo privileges. 4GB+ RAM recommended. A [Hetzner CPX31](https://www.hetzner.com/cloud/) (~$15/mo) works well.
- **Domains**: Two A records pointing to your server's IP—one for the app (e.g. `example.com`) and a wildcard for deployments (e.g. `*.example.com`). We recommend [Cloudflare](https://cloudflare.com).
- **GitHub account**: You'll create a GitHub App for login and repository access.
- **Email provider**: A [Resend](https://resend.com) account for login emails and invitations.

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Cloudflare SSL</h3>
  <section>
    <p>Set SSL/TLS mode to "Full (strict)" and keep records "Proxied".</p>
    <p>Cloudflare's free Universal SSL only covers first-level wildcards (<code>*.example.com</code>), not sub-subdomains (<code>*.sub.example.com</code>). If your deployment domain is a subdomain, disable Cloudflare proxy for deployment records, use a separate first-level domain, or purchase Advanced Certificate Manager.</p>
  </section>
</div>

## Quick installation

### 1. Run the installer

```bash
curl -fsSL https://install.devpu.sh | sudo bash
```

### 2. Create the GitHub App

Use the widget below or [create one manually](#github-app-setup):

<div class="my-6">
  {% include "partials/gh-app.njk" %}
</div>

### 3. Configure

Paste the GitHub App credentials and fill in the remaining values:

```bash
sudo nano /var/lib/devpush/.env
```

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>We recommend Cloudflare as SSL provider</h3>
  <section>
    <p>Set <code>SSL_PROVIDER=cloudflare</code> and add <code>CF_DNS_API_TOKEN</code>. See <a href="/docs/configuration/#cloudflare">Cloudflare setup</a>.</p>
  </section>
</div>

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/configuration#ssl-providers" class="badge-outline">
    SSL Providers
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/configuration#environment-variables" class="badge-outline">
    Environment variables
    {% lucide "arrow-right" %}
  </a>
</div>

### 4. Start

```bash
sudo systemctl start devpush.service
```

Visit `https://example.com` (your `APP_HOSTNAME`).

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/scripts/#install.sh" class="badge-outline">
    install.sh
    {% lucide "arrow-right" %}
  </a>
</div>

## Manual installation

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>No automatic updates</h3>
  <section>
    <p>Manual installations don't create <code>/var/lib/devpush/version.json</code>, which tracks the installed version. The <a href="/docs/updating/">update script</a> won't run upgrade hooks without it.</p>
  </section>
</div>

### Requirements

| Component | Details |
|-----------|---------|
| **Packages** | Docker Engine, Docker Compose v2+, Git |
| **System user** | e.g., `devpush` (UID/GID needed for `.env`) |

**Directory structure** (owned by system user):

| Path | Mode | Description |
|------|------|-------------|
| `/opt/devpush` | `0755` | Application code |
| `/var/lib/devpush` | `0750` | Data directory |
| `/var/lib/devpush/.env` | `0600` | Configuration |
| `/var/lib/devpush/traefik` | `0750` | Traefik config/certs |
| `/var/lib/devpush/upload` | `0750` | Uploaded files |

### Steps

1. Install Docker, Docker Compose, and Git
2. Create the system user and directory structure (see above)
3. Clone the repository to `/opt/devpush`
4. Create `.env` with [all required variables](/docs/configuration/#environment-variables)
5. [Create a GitHub App](#github-app-setup) and add credentials to `.env`
6. Build runner images: `sudo /opt/devpush/scripts/build-runners.sh`
7. Install the systemd service:
   ```bash
   sudo install -m 0644 /opt/devpush/scripts/devpush.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now devpush.service
   ```

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/scripts/#install.sh" class="badge-outline">
    install.sh
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/scripts/#build-runners.sh" class="badge-outline">
    build-runners.sh
    {% lucide "arrow-right" %}
  </a>
</div>

## GitHub App setup

If you prefer to create the GitHub App manually, [go to github.com/settings/apps/new](https://github.com/settings/apps/new) (replace `example.com` with your app hostname):

- **Identifying and authorizing users**:
  - **Callback URL**: add two callback URLs with your domain:
    - https://example.com/api/github/authorize/callback
    - https://example.com/auth/github/callback
  - **Expire user authorization tokens**: No
- **Post installation**:
  - **Setup URL**: https://example.com/api/github/install/callback
  - **Redirect on update**: Yes
- **Webhook**:
  - **Active**: Yes
  - **Webhook URL**: https://example.com/api/github/webhook
- **Permissions**:
  - **Repository permissions**
    - **Administration**: Read and write
    - **Checks**: Read and write
    - **Commit statuses**: Read and write
    - **Contents**: Read and write
    - **Deployments**: Read and write
    - **Issues**: Read and write
    - **Metadata**: Read-only
    - **Pull requests**: Read and write
    - **Webhook**: Read and write
  - **Account permissions**:
    - **Email addresses**: Read-only
- **Subscribe to events**:
  - Installation target
  - Push
  - Repository

After creating, generate a private key and copy all credentials to `.env`.