---
layout: layouts/doc.njk
title: Installation
description: How to install /dev/push on a server.
---

## Prerequisites

- **Server**: Ubuntu 20.04+ or Debian 11+ with SSH access and sudo privileges. 4GB+ RAM recommended. A [Hetzner CPX31](https://www.hetzner.com/cloud/) (~$15/mo) works well. If you're using Hetzner Cloud, you can provision a hardened server with the [`devpush-hetzner` helper](https://github.com/hunvreus/devpush-hetzner).
- **DNS**: We recommend [Cloudflare](https://cloudflare.com).
- **GitHub account**: You'll create a GitHub App for login and repository access.
- **Email provider**: A [Resend](https://resend.com) account for login emails and invitations.

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Cloudflare SSL</h3>
  <section>
    <p>Set SSL/TLS mode to "Full (strict)" and keep records "Proxied".</p>
    <p>HTTP-01 works through the proxy as long as port 80 is reachable; DNS-01 is still recommended for wildcards or if you want to skip port 80 entirely.</p>
    <p>Cloudflare's free Universal SSL only covers first-level wildcards (<code>*.example.com</code>), not sub-subdomains (<code>*.sub.example.com</code>). If your deployment domain is a subdomain, disable Cloudflare proxy for deployment records, use a separate first-level domain, or purchase Advanced Certificate Manager.</p>
  </section>
</div>

## Quick installation

### 1. Run the installer

```bash
curl -fsSL https://install.devpu.sh | sudo bash
```

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/scripts/#install.sh" class="badge-outline">
    install.sh
    {% lucide "arrow-right" %}
  </a>
</div>

### 2. Create the GitHub App

<div class="flex items-center gap-4">
  <a href="/docs/guides/create-github-app/" class="btn">Create GitHub App</a>
  <p>or <a href="/docs/guides/create-github-app/#manual-creation">create one manually</a>.</p>
</div>

### 3. Configure

Paste the GitHub App credentials and fill in the remaining values:

```bash
sudo nano /var/lib/devpush/.env
```

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>We recommend you use Cloudflare (DNS-01)</h3>
  <section>
    <p>With DNS-01, you get a wildcard certificate in one go, which reduces issuance churn for new deployments.</p>
    <p>Set <code>CERT_CHALLENGE_PROVIDER=cloudflare</code> (leave it as <code>default</code> for HTTP-01) and add <code>CF_DNS_API_TOKEN</code>. See <a href="/docs/configuration/#cloudflare">Cloudflare setup</a>.</p>
  </section>
</div>

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/configuration#certificate-challenge-providers" class="badge-outline">
    Certificate challenge providers
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/configuration#environment-variables" class="badge-outline">
    Environment variables
    {% lucide "arrow-right" %}
  </a>
</div>

### 4. Set DNS

Before starting the service, ensure your DNS records are configured and propagated. You can keep the app and deployments on separate domains/subdomains if you want extra isolation.

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| A | `example.com` | `SERVER_IP` | App hostname |
| A (wildcard) | `*.example.com` | `SERVER_IP` | Deployments |

Verify DNS propagation:

```bash
dig example.com +short
# Should show your server IP (or Cloudflare IPs if proxied)
```

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>DNS must resolve before starting</h3>
  <section>
    <p>Let's Encrypt will attempt to verify your domain when the service starts. Ensure DNS has propagated and your server is accessible on ports 80 and 443. HTTP-01 works with Cloudflare's proxy as long as port 80 is open; for wildcard certificates or to avoid port 80 entirely, use DNS-01 with <code>CERT_CHALLENGE_PROVIDER=cloudflare</code>.</p>
  </section>
</div>

### 5. Start

```bash
sudo systemctl start devpush.service
```

Visit `https://example.com` (your `APP_HOSTNAME`).

If you run into issues, see the [troubleshooting section](#troubleshooting) below.

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/operations/#service-management" class="badge-outline">
    Service management
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/scripts#start.sh" class="badge-outline">
    start.sh
    {% lucide "arrow-right" %}
  </a>
</div>

## Manual installation

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>No automated updates</h3>
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
4. Create `.env` (you can start from `/opt/devpush/.env.example`) with [all required variables](/docs/configuration/#environment-variables)
5. [Create a GitHub App](/docs/guides/create-github-app/) and add credentials to `.env`
6. Build runner images: `sudo /opt/devpush/scripts/build-runners.sh`
7. Ensure code and data are owned by the system user:
```bash
   sudo chown -R devpush:devpush /opt/devpush /var/lib/devpush
```
8. Install the systemd service:
```bash
   sudo install -m 0644 /opt/devpush/scripts/devpush.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now devpush.service
   ```

If you run into issues, see the [troubleshooting section](#troubleshooting) below.

## Troubleshooting

If the service fails to start, check the status and logs:

```bash
# Service status + recent logs
sudo systemctl status devpush.service
sudo journalctl -u devpush.service -e -f
```

If you're running into issues, it's likely with the app or Traefik. You can get more detailed logs with:

```bash
# Container logs (e.g., Traefik/TLS or app)
sudo /opt/devpush/scripts/compose.sh logs -f traefik
sudo /opt/devpush/scripts/compose.sh logs -f app
```

Common errors with Traefik:

- DNS doesn't resolve to the server IP yet.
- Provider API token (e.g., `CF_DNS_API_TOKEN`) is missing zone access (`Zone:Read` + `Zone:DNS:Edit`) or points to the wrong account/zone.
- Let's Encrypt rate limit hit after repeated failures; wait about an hour before retrying.
