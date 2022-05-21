# Gloomhaven Character Planner (WIP)

[![build](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/build.yml/badge.svg)](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/build.yml)
[![tests](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/test.yml/badge.svg)](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/test.yml)
[![code formatting](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/check-format.yml/badge.svg)](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/check-format.yml)
[![linting](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/lint.yml/badge.svg)](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/lint.yml)
[![type checking](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/check-types.yml/badge.svg)](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/check-types.yml)
[![end-to-end tests](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/test-e2e.yml/badge.svg)](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/test-e2e.yml)
[![performance checks](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/performance-checks.yml/badge.svg)](https://github.com/ceva24/gloomhaven-character-planner/actions/workflows/performance-checks.yml)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/788e43c2/gloomhaven-character-planner/)

## Introduction

A web application to create character builds for the popular tabletop and digital game Gloomhaven.

Built with [Typescript](https://www.typescriptlang.org), [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com) ❤️

## Development

### Prerequisites

1. The version of Node.js listed in [`.nvmrc`](.nvmrc)

2. A Google Chrome installation, to run Lighthouse locally

### Tooling

Uses [Husky](https://typicode.github.io/husky/) for pre-commit hooks, just run `npm run prepare` first 🐶 _woof_!

Enforces conventional commits via [commitlint](https://github.com/conventional-changelog/commitlint), see [Contribution guidelines](docs/CONTRIBUTING.md) for valid types.

## CI/CD

-   🌳 [Cypress](https://dashboard.cypress.io/projects/zbs72n) for end-to-end testing
-   🚦 [Lighthouse](https://github.com/GoogleChrome/lighthouse-ci) for performance checks
-   🦔 [Percy](https://percy.io/788e43c2/gloomhaven-character-planner) for visual testing

Reports and snapshots included on each PR ✔️

Continuously deployed to production using [AWS Amplify](https://aws.amazon.com/amplify) 🚀

## Notices

With thanks to the [Worldhaven](https://github.com/any2cards/worldhaven) project, which makes this tool possible!

_Gloomhaven and all related properties, images and text are owned by [Cephalofair Games](https://cephalofair.com)._
