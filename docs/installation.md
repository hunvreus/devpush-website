---
layout: layouts/doc.njk
title: Installation
description: How to install and update locally or on a server.
---

## Install & Update

### Prerequisites

You will need a fresh Ubuntu/Debian server you can SSH into with sudo privileges. We recommend a CPX31 from [Hetzner](https://www.hetzner.com).

You can use the provisioning script to get a server up and running:

1. **Sign in or sign up for a Hetzner account**: [Hetzner Cloud Console](https://console.hetzner.cloud/)
2. **Generate an API token**: [Creating an API token](https://docs.hetzner.com/cloud/api/getting-started/generating-api-token/)
3. **Provision a server** (requires `--token`; optional: `--user`, `--name`, `--region`, `--type`):
   ```bash
   curl -fsSL https://raw.githubusercontent.com/hunvreus/devpush/main/scripts/prod/provision-hetzner.sh | bash -s -- --token <hetzner_api_key> [--user <login_user>] [--name <hostname>] [--region <fsn1|nbg1|hel1|ash|hil|sin>] [--type <cpx11|cpx21|cpx31|cpx41|cpx51>]
   ```
   Tip: run `curl -fsSL https://raw.githubusercontent.com/hunvreus/devpush/main/scripts/prod/provision-hetzner.sh | bash -s -- --help` to list regions and types (with specs). Defaults: region `hil`, type `cpx31`.
4. **Configure DNS Records**: Go to your DNS provider and create two A records pointing at the server IP for `APP_HOSTNAME` (e.g. `app.devpu.sh`) and a wildcard on subdomains of `DEPLOY_DOMAIN` (e.g. `*.devpush.app`). If you're using Cloudflare, set SSL/TLS to "Full (strict)" and keep the records proxied.
5. **SSH into your new server**: The provision script will have created a user for you.
   ```bash
   ssh <login_user>@<server_ip>
   ```
6. **Run hardening for system and SSH**:
  ```bash
  curl -fsSL https://raw.githubusercontent.com/hunvreus/devpush/main/scripts/prod/harden.sh | sudo bash -s -- --ssh
  ```

Even if you already have a server, we recommend you harden security (ufw, fail2ban, disabled root SSH, etc). You can do that using `scripts/prod/harden.sh`.

### Install

1. **SSH into the server**:
   ```bash
   ssh <login_user>@<server_ip>
   ```
2. **Install /dev/push**:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/hunvreus/devpush/main/scripts/prod/install.sh | sudo bash
   ```
3. **Switch to `devpush` user**:
  ```bash
  sudo -iu devpush
  ```
4. **Edit `.env`**:
  ```bash
  cd devpush && vi .env
  ```
  Tip: you will need to fill in at least the following: `LE_EMAIL`, `APP_HOSTNAME`, `DEPLOY_DOMAIN`, `EMAIL_SENDER_ADDRESS`, `RESEND_API_KEY` and your [GitHub app](#github-app) settings (see [environment-variables] for details). `SERVER_IP`, `SECRET_KEY`, `ENCRYPTION_KEY`, `POSTGRES_PASSWORD` should be pre-filled. **You can ignore all commented out environment variables**.
5. Start services:
   ```bash
   scripts/prod/start.sh --migrate
   ```
6. Visit your URL: `https://<APP_HOSTNAME>`

### Update

The follwing commands must be run as `devpush` user (`su - devpush`).

In most cases, you can run an update with:

```bash
scripts/prod/update.sh --all
```

Alternatively, you can force a full upgrade (**with downtime**) using:

```bash
scripts/prod/update.sh --full -y
```

You can update specific components:

```bash
scripts/prod/update.sh --components <component_name>
```

## Development

> ⚠️ Development scripts target macOS for now.

### Install

1. Install Colima and the Loki Docker plugin:
   ```bash
   scripts/dev/install.sh
   ```
2. Set up environment variables:
   ```bash
   cp .env.dev.example .env
   ```
3. Start the stack (streams logs):
   ```bash
   scripts/dev/start.sh
   ```
   - Add `--prune` to prune dangling images before build
   - Add `--cache` to use the build cache (default is no cache)
4. Initialize your database once containers are up:
   ```bash
   scripts/dev/db-migrate.sh
   ```

See the [scripts](#scripts) section for more dev utilities.

### Update

- The app is mounted inside containers, so code changes reflect immediately. Some SSE endpoints may require closing browser tabs to trigger a reload.
- The workers require a restart:
  ```bash
  docker-compose restart worker-arq
  ```
- To apply migrations:
  ```bash
  scripts/dev/db-migrate.sh
  ```

## Scripts

| Area | Script | What it does |
|---|---|---|
| Dev | `scripts/dev/install.sh` | Setup Colima and install Loki Docker plugin |
| Dev | `scripts/dev/start.sh` | Start stack with logs (foreground); supports `--prune`, `--cache` |
| Dev | `scripts/dev/build-runners.sh` | Build runner images (default no cache; `--cache` to enable) |
| Dev | `scripts/dev/db-generate.sh` | Generate Alembic migration (prompts for message) |
| Dev | `scripts/dev/db-migrate.sh` | Apply Alembic migrations |
| Dev | `scripts/dev/db-reset.sh` | Drop and recreate `public` schema in DB |
| Dev | `scripts/dev/clean.sh` | Stop stack and clean dev data (`--hard` for global) |
| Prod | `scripts/prod/provision-hetzner.sh` | Provision a Hetzner server (API token, regions from API, fixed sizes) |
| Prod | `scripts/prod/install.sh` | Server setup: Docker, Loki plugin, user, clone repo, create `.env` |
| Prod | `scripts/prod/harden.sh` | System hardening (UFW, fail2ban, unattended-upgrades); add `--ssh` to harden SSH |
| Prod | `scripts/prod/start.sh` | Start services; optional `--migrate` |
| Prod | `scripts/prod/stop.sh` | Stop services (`--down` for hard stop) |
| Prod | `scripts/prod/restart.sh` | Restart services; optional `--migrate` |
| Prod | `scripts/prod/update.sh` | Update by tag; `--all` (app+workers), `--full` (downtime), or `--components` |
| Prod | `scripts/prod/db-migrate.sh` | Apply DB migrations in production |
| Prod | `scripts/prod/check-env.sh` | Validate required keys exist in `.env` |
| Prod | `scripts/prod/update/app.sh` | Blue‑green update for app |
| Prod | `scripts/prod/update/worker-arq.sh` | Drain‑aware blue‑green update for `worker-arq` |
| Prod | `scripts/prod/update/worker-monitor.sh` | Blue‑green update for `worker-monitor` |

## Environment variables

Variable | Comments | Default
--- | --- | ---
`APP_NAME` | App name. | `/dev/push`
`APP_DESCRIPTION` | App description. | `Deploy your Python app without touching a server.`
`URL_SCHEME` | `http` (development) or `https` (production). | `https`
`LE_EMAIL` | Email used to register the Let's Encrypt (ACME) account in Traefik; receives certificate issuance/renewal/expiry notifications. | `""`
`APP_HOSTNAME` | Domain for the app (e.g. `app.devpu.sh`). | `""`
`STATIC_HOSTNAME` | Domain for serving the static assets (e.g. CSS, JS libraries, images). Useful for caching. No trailing slahe | `APP_HOSTNAME`
`DEPLOY_DOMAIN` | Domain used for deployments (e.g. `devpush.app` if you want your deployments available at `*.devpush.app`). | `APP_HOSTNAME`
`SERVER_IP` | Public IP of the server | `""`
`SECRET_KEY` | App secret for sessions/CSRF. Generate: `openssl rand -hex 32` | `""`
`ENCRYPTION_KEY` | Fernet key (urlsafe base64, 32 bytes). Generate: `openssl rand -base64 32 | tr '+/' '-_' | tr -d '\n'` | `""`
`EMAIL_LOGO` | URL for email logo image. Only helpful for testing, as the app will use `app/logo-email.png` if left empty. | `""`
`EMAIL_SENDER_NAME` | Name displayed as email sender for invites/login. | `""`
`EMAIL_SENDER_ADDRESS` | Email sender used for invites/login. | `""`
`RESEND_API_KEY` | API key for [Resend](https://resend.com). | `""`
`GITHUB_APP_ID` | GitHub App ID. | `""`
`GITHUB_APP_NAME` | GitHub App name. | `""`
`GITHUB_APP_PRIVATE_KEY` | GitHub App private key (PEM format). | `""`
`GITHUB_APP_WEBHOOK_SECRET` | GitHub webhook secret for verifying webhook payloads. | `""`
`GITHUB_APP_CLIENT_ID` | GitHub OAuth app client ID. | `""`
`GITHUB_APP_CLIENT_SECRET` | GitHub OAuth app client secret. | `""`
`GOOGLE_CLIENT_ID` | Google OAuth client ID. | `""`
`GOOGLE_CLIENT_SECRET` | Google OAuth client secret. | `""`
`POSTGRES_DB` | PostgreSQL database name. | `devpush`
`POSTGRES_USER` | PostgreSQL username. | `devpush-app`
`POSTGRES_PASSWORD` | PostgreSQL password. Generate: `openssl rand -base64 24 | tr -d '\n'` | `""`
`REDIS_URL` | Redis connection URL. | `redis://redis:6379`
`DOCKER_HOST` | Docker daemon host address. | `tcp://docker-proxy:2375`
`UPLOAD_DIR` | Directory for file uploads. | `/app/upload`
`TRAEFIK_CONFIG_DIR` | Traefik configuration directory. | `/data/traefik`
`DEFAULT_CPU_QUOTA` | Default CPU quota for containers (microseconds). | `100000`
`DEFAULT_MEMORY_MB` | Default memory limit for containers (MB). | `4096`
`JOB_TIMEOUT` | Job timeout in seconds. | `320`
`JOB_COMPLETION_WAIT` | Job completion wait time in seconds. | `300`
`DEPLOYMENT_TIMEOUT` | Deployment timeout in seconds. | `300`
`LOG_LEVEL` | Logging level. | `WARNING`
`DB_ECHO` | Enable SQL query logging. | `false`
`ENV` | Environment (development/production). | `development`
`ACCESS_DENIED_MESSAGE` | Message shown to users who are denied access based on  [sign-in access control](#sign-in-access-control). | `Sign-in not allowed for this email.`
`ACCESS_DENIED_WEBHOOK` | Optional webhook to receive denied events (read more about [Sign-in access control](#sign-in-access-control)). | `""`
`LOGIN_ALERT_TITLE` | Title for a callout banner displayed on the login screen. Will be displayed only if either `LOGIN_ALERT_TITLE` or `LOGIN_ALERT_DESCRIPTION` is not empty. | `""`
`LOGIN_ALERT_DESCRIPTION` | Description for a callout banner displayed on the login screen. Will be displayed only if either `LOGIN_ALERT_TITLE` or `LOGIN_ALERT_DESCRIPTION` is not empty. | `""`

## GitHub App

You will need to configure a GitHub App with the following settings:

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

## Sign-in access control

Provide an access rules file to restrict who can sign up/sign in.

- **Development**: edit `./access.json`. If missing, running `scripts/dev/start.sh` will sed an allow‑all file.
- **Production**: edit `/srv/devpush/access.json` on the server.

Rules format (any/all may be used):

```json
{
  "emails": ["alice@example.com"],
  "domains": ["example.com"],
  "globs": ["*@corp.local", "*.dept.example.com"],
  "regex": ["^[^@]+@(eng|research)\\.example\\.com$"]
}
```

Globs use shell-style wildcards; regex are Python patterns. If the file is missing or empty, all valid emails are allowed.

Additionally, if you set the `ACCESS_EMAIL_DENIED_WEBHOOK_URL` [environment variable](#environment-variables), denied sign-in attempts will be posted to the provided URL with the following payload:

```json
{
  "email": "user@example.com",
  "provider": "google",
  "ip": "203.0.113.10",
  "user_agent": "Mozilla/5.0"
}
```
