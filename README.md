# `node-modules`

🧪 This is an experimental monorepo for `@guardian/*` NPM packages.

It is intended to make it as easy as possible to develop and update these packages in accordance with [the Guardian's recommendations](https://github.com/guardian/recommendations/blob/main/npm-packages.md).

It's not ready for people to add their packages yet, but that is 💯 the plan.

## Prerequisites

It uses [changesets](https://github.com/atlassian/changesets) to manage package releases. Make sure you understand [how changesets work](https://github.com/atlassian/changesets/blob/main/docs/detailed-explanation.md).

## Node, dependencies etc

The development environment is automatically managed by the project.

The commands below will prompt you if you need to do anything extra to run them correctly.

_Run `make help` or see the [`makefile`](./makefile) for more info._

## Development

Common tasks are defined in the `makefile`. Run them from the terminal using `make myTaskName`:

```bash
# start the dev server
$ make dev

# run all code quality checks (tests, linting and types)
$ make validate

# if you get lint errors, you can attempt to automatically fix them
$ make fix

# you can also run the code quality checks independently
$ make test
$ make lint
$ make tsc
```

### Publishing updates

Before running any of these, make sure you understand [how changesets work](https://github.com/atlassian/changesets/blob/main/docs/detailed-explanation.md).

```bash
# build all packages
$ make build

# generate a new changeset
$ make changeset

# version-bump updated packages
$ make bump

# push the new versions to NPM
$ make publish
```

## Tooling

Behind the scenes this repo uses the following tools:

### [`pnpm`](https://pnpm.io/)

To manage the monorepo.

### [`@changesets/cli`](https://github.com/atlassian/changesets)

To manage the release process.
