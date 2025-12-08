---
layout: layouts/doc.njk
title: Create a Hetzner server
description: How to create and configure a Hetzner Cloud server for /dev/push.
---

This guide walks through creating a Hetzner Cloud server ready for /dev/push installation.

## Prerequisites

- A [Hetzner Cloud](https://www.hetzner.com/cloud/) account
- An API token (create one in the Hetzner Cloud Console under Security → API Tokens)

## Using the provisioning script

The [`devpush-hetzner`](https://github.com/hunvreus/devpush-hetzner) helper automates server creation with security hardening.

### Requirements

- Python 3.10+
- SSH key (auto-detected or specify with `--pubkey`)

### Quick start

```bash
git clone https://github.com/hunvreus/devpush-hetzner.git
cd devpush-hetzner
python provision.py
```

You'll be prompted for your Hetzner API token if not set via `HCLOUD_TOKEN`.

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--name` | Server name | `devpush` |
| `--type` | Server type | `cpx31` |
| `--location` | Datacenter location | `hil` |
| `--image` | OS image | `ubuntu-24.04` |
| `--user` | Remote username | Your local login |
| `--pubkey` | Path to SSH public key | Auto-detected |
| `--ssh-key-name` | Hetzner SSH key name/ID | |
| `--firewall` | Firewall ID to attach | |
| `--no-harden` | Skip security hardening | Hardened by default |
| `--token` | Hetzner API token | `HCLOUD_TOKEN` env |
| `--dry-run` | Preview without creating | |

### What it does

1. Creates a server with your specified configuration
2. Sets up a non-root sudo user
3. Disables root and password SSH login
4. Injects your SSH key
5. Runs security hardening (UFW, fail2ban, unattended upgrades)

## Manual setup

### 1. Create the server

1. Log in to [Hetzner Cloud Console](https://console.hetzner.cloud/)
2. Click **Add Server**
3. Configure:
   - **Location**: Choose based on your users (e.g., `hil` for US, `fsn1` for EU)
   - **Image**: Ubuntu 24.04
   - **Type**: CPX31 (4 vCPU, 8GB RAM) recommended
   - **SSH Key**: Add your public key
   - **Name**: `devpush` or your preference
4. Click **Create & Buy Now**

### 2. Connect and update

```bash
ssh root@YOUR_SERVER_IP
apt update && apt upgrade -y
```

### 3. Create a non-root user

```bash
adduser admin
usermod -aG sudo admin
```

Copy your SSH key to the new user:

```bash
mkdir -p /home/admin/.ssh
cp ~/.ssh/authorized_keys /home/admin/.ssh/
chown -R admin:admin /home/admin/.ssh
chmod 700 /home/admin/.ssh
chmod 600 /home/admin/.ssh/authorized_keys
```

### 4. Disable root login

Edit `/etc/ssh/sshd_config`:

```bash
PermitRootLogin no
PasswordAuthentication no
```

Restart SSH:

```bash
systemctl restart sshd
```

### 5. Set up firewall

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### 6. Install fail2ban

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban
```

### 7. Enable automatic updates

```bash
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

## Next steps

Once your server is ready:

1. Point your domain's DNS to the server IP
2. Run the /dev/push installer:

```bash
curl -fsSL https://install.devpu.sh | sudo bash
```

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/installation/" class="badge-outline">
    Installation guide
    {% lucide "arrow-right" %}
  </a>
</div>