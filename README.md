# CSTI monorepo

<img src="csti.png" width="320" />

This is an experiment to create a monorepo for all [CSTI-maintained](https://github.com/orgs/guardian/teams/client-side-infra/repositories) NPM packages.

It uses [`pnpm`](https://pnpm.io/) and [changesets](https://github.com/atlassian/changesets).

## Development

Install dependencies:
```bash
$ pnpm i
````

Generate [a new changeset](https://github.com/atlassian/changesets/blob/main/docs/command-line-options.md#add):
```bash
$ pnpm changeset
````

[Bump packages that need it](https://github.com/atlassian/changesets/blob/main/docs/command-line-options.md#version), based on changesets generated since the last bump:
```bash
$ pnpm changeset version
````

[Publish](https://github.com/atlassian/changesets/blob/main/docs/command-line-options.md#publish) bumped packages:
```bash
$ pnpm changeset publish
````
