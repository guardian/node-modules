# `node-modules`

> 🧪 An experimental monorepo for `@guardian/*` NPM packages.

This repo is intended to make it as easy as possible to develop and update packages in accordance with [the Guardian's recommendations](https://github.com/guardian/recommendations/blob/main/npm-packages.md).

## Just your source code

🚧 _It's not ready for new packages yet, but when it is..._

Packages only need to worry about what they do – everything else is managed by the project.

> 1. Create a directory in `./packages`
> 2. Add a `package.json`, `README.md` and `src/index.ts`
>
> You now have a minimal but verifiable, publishable package.

### Workflows

The following workflows are pre-configured:

-   [x] Node version management
-   [x] NPM package management
-   [x] TypeScript configuration
-   [x] Eslint configuration
-   [x] Testing (using [Jest](https://jestjs.io/))
-   [ ] Bundling (using [Rollup](https://rollupjs.org/))
-   [ ] Versioning (using [changesets](https://github.com/atlassian/changesets))
-   [ ] Publishing (using [changesets](https://github.com/atlassian/changesets))

## Development

Common development tasks are defined in the [`makefile`](./Makefile).

Run them from the terminal using `make`:

-   `make dev` run the dev server and test suite in watch mode
-   `make validate` run tests, lint code and check types. They can also be run individually:
    -   `make lint` run eslint over all source code
    -   `make test` run all tests
    -   `make tsc` check all typescript compiles
-   `make fix` try to automatically fix any validation errors
-   `make build` build all packages
-   `make changeset` create a new changeset
-   `make bump` bump all updated packages
-   `make publish` publish all updated packages

_Run `make help` to see this list of commands in the terminal._

#### Project requirements

Node version, package manager, NPM dependencies etc are automatically managed by the project – you can use the `make` commands above without worrying about them.

_You'll be prompted if you need to install anything._

### Advanced

Behind the scenes, the project is a [pnpm workspace](https://pnpm.io/workspaces).

This is managed for you in the `makefile`, without the developer needing to get too deep into the weeds.

If you need to do more than the tasks defined above – for example, adding a dependency to your package – you should use `pnpm` directly.

See [the pnpm docs](https://pnpm.io) for full information.

## Publishing

Versioning and releasing of updated packages is managed with [changesets](https://github.com/atlassian/changesets).

Make sure you understand [how changesets work](https://github.com/atlassian/changesets/blob/main/docs/detailed-explanation.md) before starting a new release.

```bash
# generate a new changeset
$ make changeset

# version-bump updated packages
$ make bump

# push the new versions to NPM
$ make publish
```
