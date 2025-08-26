---
layout: layouts/doc.njk
title: Overview
---

## Project settings

- **Project name**: a unique name that will be used in the deployment URLs.
- **Avatar**: Image used in the navigation.
- **Git repository**: The GitHub repository to deploy.
- **[Environments](#environments)**: A list of environments associated with GitHub branches.
- **[Environment variables](#environment-variables)**: A list of environment variables scoped by environment.
- **[Domains](#domains)**: Custom domain associated with environments.

## Environments

The production environment can not be renamed or deleted.

Each environment has a "Name", use for display, and an "Identifier" used in the deployment URLs (e.g. `flask-acme-env-staging.devpush.app`).

An environment can be associated with a single branch (e.g. `staging`) or use the wildcard operator to define a range of branches (e.g. `staging-*`).

## Environment variables

You can addEnvironment variables can be added individually or by pasting the content of an `.env` file.

Each environment variable can be associated with a specific enviroment or all environments. These values can overrides each other. For example, if I have:

- `LOG_LEVEL` set to `INFO` for "All environments"
- `LOG_LEVEL` set to `ERROR` for the "Staging" environment.

Then in the "Production" environment, the value will be `INFO`, but for "Staging" it will be `ERROR`.

## Domains

Domains can be:

- **A route**, which will require a `ANAME`, `ALIAS` or `A` record to be added to your DNS.
- **A redirect** (301, 302, 307 or 308) which will require a `CNAME` record.

## Logs

Logs are collected in real-time, but a slight delay ( a few hundred milliseconds) might be noticeable. Logs can be searched by keyword and filtered by deployment, environments, dates or branches.

## Deleting a project

When deleting a project, all settings and deployments will be deleted. The deletion process is not immediate and may take some time depending on the number of deployments.