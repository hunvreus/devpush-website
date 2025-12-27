---
layout: layouts/doc.njk
title: Restrict access with the allowlist
description: Limit who can sign up and sign in using the /admin allowlist.
---

![Allowlist](/media/allowlist.png)

Go to `/admin` to access the **Allowlist** section.

## Rules

An empty allowlist means no access restrictions.

Click **Add rule** and choose a rule type:

- **Email**: Allow a single email address. Example: `alice@example.com`
- **Domain**: Allow everyone from a domain. Example: `example.com`
- **Pattern**: Allow by regex (advanced). Example: `^[^@]+@example\.com$`

## Bulk import (optional)

Use **Import emails** to add many addresses at once (one per line or comma-separated).

## Remove rules

Use the delete button next to an entry to remove it.