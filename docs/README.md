# HavenPlanner

[![build](https://github.com/ceva24/havenplanner/actions/workflows/build.yml/badge.svg)](https://github.com/ceva24/havenplanner/actions/workflows/build.yml)
[![tests](https://github.com/ceva24/havenplanner/actions/workflows/test.yml/badge.svg)](https://github.com/ceva24/havenplanner/actions/workflows/test.yml)
[![code formatting](https://github.com/ceva24/havenplanner/actions/workflows/check-format.yml/badge.svg)](https://github.com/ceva24/havenplanner/actions/workflows/check-format.yml)
[![linting](https://github.com/ceva24/havenplanner/actions/workflows/lint.yml/badge.svg)](https://github.com/ceva24/havenplanner/actions/workflows/lint.yml)
[![type checking](https://github.com/ceva24/havenplanner/actions/workflows/check-types.yml/badge.svg)](https://github.com/ceva24/havenplanner/actions/workflows/check-types.yml)
[![codeql analysis](https://github.com/ceva24/havenplanner/actions/workflows/codeql.yml/badge.svg)](https://github.com/ceva24/havenplanner/actions/workflows/codeql.yml)
[![end-to-end tests](https://github.com/ceva24/havenplanner/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/ceva24/havenplanner/actions/workflows/e2e-test.yml)
[![performance checks](https://github.com/ceva24/havenplanner/actions/workflows/performance-checks.yml/badge.svg)](https://github.com/ceva24/havenplanner/actions/workflows/performance-checks.yml)
[![cypress tests](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/zbs72n/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/zbs72n/runs)
[![Coverage status](https://coveralls.io/repos/github/ceva24/havenplanner/badge.svg?branch=main)](https://coveralls.io/github/ceva24/havenplanner?branch=main)

[![code formatting: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Tested with cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io)
[![This project is using Percy.io for visual regression testing](https://percy.io/static/images/percy-badge.svg)](https://percy.io/788e43c2/havenplanner/)
[![licence CC BY-NC-SA 4.0](https://img.shields.io/badge/licence-CC_BY--NC--SA_4.0-blue)](https://github.com/ceva24/havenplanner/blob/main/docs/LICENCE.md)

## 👋 Introduction

A web application to create and share character builds for the popular tabletop and digital game [Gloomhaven](https://cephalofair.com/pages/gloomhaven). Inspired by tools like [Dark Souls Character Planner](https://soulsplanner.com/darksouls), [WoW Armory](https://worldofwarcraft.com/en-gb/search) and [FFXIV Lodestone](https://na.finalfantasyxiv.com/lodestone/character).

## 🗒️ Features

-   Enter character details and select a personal quest
-   Select perks, track battle goal progress and see the resulting attack modifier deck composition
-   View and unlock character ability cards, create a saved hand, and select enhancements for cards
-   Browse and select items
-   Configure spoiler settings to show and hide locked classes and items
-   Save and share characters with a shareable link

### Not implemented

-   Content from Forgotten Circles, Jaws of the Lion, Crimson Scales, Trail of Ashes and Frosthaven

## 💻 Development

Built with [TypeScript](https://www.typescriptlang.org), [Next.js](https://nextjs.org) and [MUI](https://mui.com) ❤️

### Prerequisites

1. The version of Node.js listed in [`.nvmrc`](../.nvmrc)

2. A Google Chrome installation, to run Lighthouse locally

### Tooling

Uses [lint-staged](https://github.com/okonet/lint-staged) and [Husky](https://typicode.github.io/husky) for pre-commit hooks 🐶 _woof_!

Enforces conventional commits via [commitlint](https://github.com/conventional-changelog/commitlint), see [Contribution guidelines](CONTRIBUTING.md) for valid types.

### Image hosting

Uses [ceva24/worldhaven](https://github.com/ceva24/worldhaven/tree/web/) as a CDN for images, hosted at [images.havenplanner.app](https://images.havenplanner.app).

### Accessibility

This application is built for accessibility: it aims to meet at least [WCAG 2.1 AA standards](https://www.w3.org/WAI/standards-guidelines/wcag) 😊

### CI/CD

-   🌳 [Cypress](https://dashboard.cypress.io/projects/zbs72n) for end-to-end testing
-   🦔 [Percy](https://percy.io/788e43c2/havenplanner) for visual testing
-   🚦 [Lighthouse](https://github.com/GoogleChrome/lighthouse-ci) for performance checks

Reports and snapshots included on each PR ✔️

Continuously deployed to production using [Vercel](https://vercel.com) 🚀

## 📌 Notices

With thanks to the [Worldhaven](https://github.com/any2cards/worldhaven) project, which makes this tool possible!

Gloomhaven and all related properties, images and text are owned by [Cephalofair Games](https://cephalofair.com).
