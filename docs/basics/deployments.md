---
layout: layouts/doc.njk
title: Deployments
description: Deployments are instances of your project built from specific commits, with URLs, logs, and rollback capabilities.
---

## Active deployments

By default, only the latest 2 deployments for any branch or environment are kept up. Older deployments (and their containers) are shut down. Upon visiting an inactive deployment, you will be able to navigate to the deployment page and trigger a redeployment.

## URLs and aliases

Each deployment gets a deployment URL (e.g. `flask-acme-id-548f851.devpush.app`). Additionally, it may have:

- A branch URL (e.g. `flask-acme-branch-main.devpush.app`) based on the branch the commit was from.
- An environment URL (e.g. `flask-acme-env-staging.devpush.app`) based on the environment the deployment is associated with. If the environment is `production`, then the domain only contains the project slug (e.g. `flask-acme.devpush.app`). Domains associated with the environment will point to the latest deployment for that environment too.

These aliases are only active for the latest deployment associated with the branch and/or environment.

## Logs

The deployment page shows real-time build and runtime logs for the deployment. You can navigate to the filtered logs console and search/filter further using the "Logs" icon at the top of the console.

## Redeploy

Any deployment can be deployed again using the "Redeploy" action in the dropdown menu. This is particularly useful when changing project settings (e.g. environment variables), which will only be reflected in deployments happening after the changes.

## Rollback

You can swap the active deployments for any environment, allowing you to instantly roll back changes that may be causing issues.

## Environment variables

You can define environment variables in your project settings. Variables can be scoped to a specific environment or apply to all deployments. These are injected into your container at runtime.

In addition, every deployment receives the following system environment variables:

| Variable | Description |
|----------|-------------|
| `DEVPUSH` | Always `true` when running in /dev/push |
| `DEVPUSH_IP` | Server public IP address |
| `DEVPUSH_URL` | Deployment URL (e.g. `https://flask-acme-id-548f851.devpush.app`) |
| `DEVPUSH_DOMAIN` | Deployment domain without scheme |
| `DEVPUSH_URL_BRANCH` | Branch alias URL, if available |
| `DEVPUSH_DOMAIN_BRANCH` | Branch alias domain |
| `DEVPUSH_URL_ENVIRONMENT` | Environment alias URL, if available |
| `DEVPUSH_DOMAIN_ENVIRONMENT` | Environment alias domain |
| `DEVPUSH_TEAM_ID` | Team ID |
| `DEVPUSH_PROJECT_ID` | Project ID |
| `DEVPUSH_ENVIRONMENT` | Environment slug or ID |
| `DEVPUSH_DEPLOYMENT_ID` | Deployment ID |
| `DEVPUSH_DEPLOYMENT_CREATED_AT` | ISO 8601 timestamp in UTC (e.g. `2025-01-15T10:30:00Z`) |
| `DEVPUSH_GIT_PROVIDER` | Git provider (e.g. `github`) |
| `DEVPUSH_GIT_REPO` | Full repository name (e.g. `owner/repo`) |
| `DEVPUSH_GIT_REPO_OWNER` | Repository owner |
| `DEVPUSH_GIT_REPO_NAME` | Repository name |
| `DEVPUSH_GIT_REF` | Git ref (branch name or tag) |
| `DEVPUSH_GIT_COMMIT_SHA` | Full commit SHA |
| `DEVPUSH_GIT_COMMIT_AUTHOR` | Commit author, if available |
| `DEVPUSH_GIT_COMMIT_MESSAGE` | Commit message, if available |

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Overriding system variables</h3>
  <section>
    <p>Your environment variables take precedence. If you define a variable with the same name as a system variable, your value will be used.</p>
  </section>
</div>