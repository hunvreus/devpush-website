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