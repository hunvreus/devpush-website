---
layout: layouts/doc.njk
title: Create a GitHub App
description: How to create a GitHub App for /dev/push authentication and repository access.
---

A GitHub App is required for user authentication and repository access. You can create one automatically using the widget below, or manually through GitHub's interface.

## Automated creation

Use the widget below to generate a GitHub App manifest and create the app:

<div class="my-6">
  {% include "partials/gh-app.njk" %}
</div>

## Manual creation

If you prefer to create the GitHub App manually, [go to github.com/settings/apps/new](https://github.com/settings/apps/new) and create an app with the following settings (replace `example.com` with your app hostname):

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

After creating, generate a private key and copy all credentials to your `.env` file.

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/installation/" class="badge-outline">
    Installation guide
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/configuration/#environment-variables" class="badge-outline">
    Environment variables
    {% lucide "arrow-right" %}
  </a>
</div>

