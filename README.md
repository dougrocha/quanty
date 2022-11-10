# Quanty Monorepo

[![CodeFactor](https://www.codefactor.io/repository/github/slashtp3/quanty/badge)](https://www.codefactor.io/repository/github/slashtp3/quanty) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is the official Quanty project.

## What's inside?

This monorepo servers to hold all of the apps/services quanty will have. Turborepo will make it easy to unify the codebase in order to try our best in only writing code once.

### Apps and Packages

- `bot`: A discord bot built discord.js, typescript, and my own framework.
- `dashboard`: A [Next.js](https://nextjs.org) app.
- `server`: A [Nest.js](https://nestjs.com) server.
- `ui`: A stub React component library shared by both `web` and `docs` applications.
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`).
- `tsconfig`: `tsconfig.json`s used throughout the monorepo.

Each package/app is 100% built with [TypeScript](https://www.typescriptlang.org/).

#### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [ESLint](https://eslint.org/) for code linting.
- [Jest](https://jestjs.io) test runner for all things JavaScript.
- [Prettier](https://prettier.io) for code formatting.

### Setup

Clone this repository.

#### Build

To build all apps and packages, run the following command:

```sh
cd quanty
yarn build
```

#### Develop

To develop all apps and packages, run the following command:

```sh
cd quanty
yarn dev
```

#### Linting

If you choose to not have an eslint plugin in your IDE. You can use this.

```sh
cd quanty
yarn lint
```
