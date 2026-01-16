---
layout: layouts/doc.njk
title: Storage
description: Persistent volumes and SQLite databases that can be attached to project environments.
---

## Overview

Storage belongs to a team and can be connected to one or more projects. Connections can be scoped to specific environments so only those deployments receive the mount.

## Storage types

| Type | Use case | Runtime path |
| --- | --- | --- |
| Database (SQLite) | Single-file SQLite database | `/data/database/<name>/db.sqlite` |
| Volume | Arbitrary files (uploads, cache, assets) | `/data/volume/<name>/` |

## Host paths

Provisioned storage is created under the data directory on the host.

| Environment | Host path |
| --- | --- |
| Development (default) | `./data/storage/<team_id>/<type>/<name>` |
| Production (default) | `/var/lib/devpush/storage/<team_id>/<type>/<name>` |

## Using storage

- Add the runtime path to your app settings as an environment variable.
- Volumes are read/write inside the container and persist across deployments.
- SQLite databases are provisioned with a single `db.sqlite` file under the runtime path.

<div class="alert-destructive">
  {% lucide "triangle-alert" %}
  <h3>Deleting storage is destructive</h3>
  <section>
    <p>Deleting storage removes the host directory and its data. Disconnect it from projects first if you want to keep the data.</p>
  </section>
</div>
