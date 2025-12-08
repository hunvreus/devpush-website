---
layout: layouts/doc.njk
title: Introduction
description: "An open source, self-hosted platform that automates building and deploying any app: Python, Node.js, PHP..."
---

## What is it?

In short, /dev/push is an open-source, self-hostable alternative to platforms like Vercel, Render or Laravel Cloud. It deploys your app straight from GitHub every time you push new code to your repository.

Some of the main features:

- **Git-based deployments**: Push to deploy from GitHub with zero-downtime release and instant rollback.
- **Multi-language support**: Python, Node.js, PHP... basically anything that can run on Docker.
- **Environment management**: Multiple environments with branch mapping and encrypted environment variables.
- **Real-time monitoring**: Live and searchable build and runtime logs.
- **Team collaboration**: Role-based access control with team invitations and permissions.
- **Custom domains**: Support for custom domains and automatic Let's Encrypt SSL certificates.
- **Self-hosted and open source**: Run on your own servers, MIT-licensed.

## Why did you build it?

I started working on /dev/push because I wanted a platform as user-friendly as Vercel, but for Python apps. There were a few alternatives already, but they either didn't really match the user experience (e.g. Render), or were too technical (e.g. Coolify). I wanted something as simple and straightforward as Vercel, even if that meant less control.

## How does it work?

Under the hood, it's simply Docker.

The app itself allows you to manage the configuration for your projects (GitHub repository, Docker image, build and start commands, environment variables, ...).

Whenever it receives a webhook post from GitHub, it creates a new container for the selected Docker image and proceeds to run a series of commands (git clone, build, ...). If the app builds successfully and is available, it is swapped for the matching environment.

You can [install it on your own server](/docs/installation) (e.g. Hetzner), but [there is also an online demo: demo.devpu.sh](https://demo.devpu.sh) (WARNING: this demo server resets every hour, all deployments and configuration will be wiped out).

## How can I help?

/dev/push is 100% open source and free.

- [Sponsor the project](https://github.com/sponsors/hunvreus)
- [Star the project on GitHub](https://github.com/hunvreus/devpush)
- [Report issues or request features](https://github.com/hunvreus/devpush/issues)
- [Send pull requests](https://github.com/hunvreus/devpush/pulls)
- [Join the Discord chat](https://devpu.sh/chat)