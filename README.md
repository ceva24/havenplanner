# Gloomhaven Character Planner (WIP)

## Introduction

A web application to create character builds for the popular tabletop and digital game Gloomhaven.

Built with [Typescript](https://www.typescriptlang.org/), [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) ❤️

## Development

### Prerequisites

1. The version of Node.js listed in [`.nvmrc`](.nvmrc)

2. A local `.npmrc` file with the following contents, replacing `<auth token>` with a GitHub personal access token that has the `read:packages` scope:

```
@ceva24:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<auth token>
```

3. A Google Chrome installation, to run Lighthouse locally

### Tooling

Uses [Husky](https://typicode.github.io/husky/) for pre-commit hooks, just run `npm run prepare` first 🐶 _woof_!

Enforces conventional commits via [commitlint](https://github.com/conventional-changelog/commitlint), see [Contribution guidelines](docs/CONTRIBUTING.md) for valid types.

## CI/CD

-   🌳 [Cypress](https://dashboard.cypress.io) for end-to-end testing
-   🚦 [Lighthouse](https://github.com/GoogleChrome/lighthouse-ci) for performance checks
-   🦔 [Percy](https://percy.io) for visual testing

Reports and snapshots included on each PR ✔️

Continuously deployed to production using [AWS Amplify](https://aws.amazon.com/amplify/) 🚀

## Notices

With thanks to the [Worldhaven](https://github.com/any2cards/worldhaven) project, which makes this tool possible!

_Gloomhaven and all related properties, images and text are owned by [Cephalofair Games](https://cephalofair.com/)._
