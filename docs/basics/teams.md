---
layout: layouts/doc.njk
title: Teams
description: Teams own projects and manage member access with role-based permissions.
---

## Default team

When you create your account, a default team is assigned to you. You can not leave or delete this team.

## Team settings

- **Display name**: Name displayed in the interface.
- **Slug**: Unique identifier used in the URL.
- **Avatar**: Image used in the navigation.
- **Members**: List of users and their roles. New members can be invited by email.

## Storage

Storage is owned at the team level and can be connected to one or more projects.

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/basics/storage" class="badge-outline">
    Storage
    {% lucide "arrow-right" %}
  </a>
</div>

## Deleting a team

When deleting a team, all projects, settings and deployments will be deleted. The deletion process is not immediate and may take some time depending on the number of projects and deployments.
