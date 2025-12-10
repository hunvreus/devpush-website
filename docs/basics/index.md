---
layout: layouts/doc.njk
title: Overview
description: Key concepts and permissions for teams, projects, and deployments.
---

## Key concepts

- **[Teams](/docs/basics/teams)**: Owns projects accessible to a group of members.
- **[Projects](/docs/basics/projects)**: Applications to be deployed along with their settings (e.g. GitHub repository, environment variables, ...).
- **[Deployments](/docs/basics/deployments)**: Instances of project deployments.

## Permissions

Teams can define members with different roles:

- **Owners** can manage any resources within the team (projects, deployments) and can manage team members. They can not leave the team if they're the only owner. They can also delete the team, unless it's a user's default team.
- **Admins** can manage any resources within the team, but they can not edit the membership of owners or delete the team.
- **Members** can access any projects and deployments within the team, but not settings unless it's a project they created. They can't delete projects, even the ones they created.