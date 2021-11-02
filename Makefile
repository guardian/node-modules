# This file is intended to make life easier for humans, it's not
# intended to be used by machines.
#
# It wraps the npm-scripts in package.json in fast-running admin
# tasks designed to catch common footguns while developing.
#
# Think of it as workflows for People Actions (github actions for people).
#
# Don't use these in CI – use the npm-scripts directly.

# make node_modules binaries available
export PATH := node_modules/.bin:$(PATH)

# standardise on a shell
export SHELL := /usr/bin/env bash

# UTILS #########################################################

define log
    @echo -e "\x1b[2m[ $(1) ]\x1b[0m"
endef

.DEFAULT_GOAL: help
.PHONY: help # list available commands
help:
	$(call log,"Listing \'make\' commands")
	@fnm exec node ./scripts/describe-makefile.js

# ENVIRONMENT #########################################

# THIS SHOULD BE RUN BEFORE EVERY COMMAND (or TARGET in make-speak)
.PHONY: install # install everything you need to run the project
# - use fnm to install and use the NODE version we need, or prompt to install fnm if it's missing
# - use npm to install pnpm to the project's node_modules if it's not available on the system
#   - the PATH setting at the top of this file means we can use pnpm in here as if it was globally installed
#   - note that we use --no-save to just get the files, not save it in package.json
# - finally, we can install deps using the correct package manager and .nvmrc-mandated node
install:
# check whether fnm is installed, prompt to install it if not
	@type -t fnm > /dev/null  || { \
		echo -e "\x1b[31mThis project uses \x1b[1mfnm\x1b[0;31m to manage node versions.\x1b[0m"; \
		echo -e "You need to install it to continue."; \
		echo -e "Run \x1b[36mbrew install fnm\x1b[0m, or see \x1b[36mhttps://github.com/Schniz/fnm#installation\x1b[0m."; \
		exit 1; \
	}

	$(call log,"Checking Node")
	@fnm use --install-if-missing

	$(call log,"Refreshing dependencies")
	@type -t pnpm > /dev/null || npm install pnpm --no-save --silent;
	@pnpm install

.PHONY: clean # delete all dist directories
clean:
	$(call log,"Removing old build artefacts")
	@pnpm clean && echo "🧼 Done"

# WORKFLOWS #####################################################

.PHONY: dev # run the test suite in watch mode
dev: install
	$(call log,"Starting the dev environment")
	@pnpm dev

.PHONY: test # run all tests
test: install
	$(call log,"Running tests")
	@pnpm test

.PHONY: lint # run eslint over all source code
lint: install
	$(call log,"Linting files")
	@pnpm lint

.PHONY: fix # try to fix eslint errors
fix: install
	$(call log,"Attempting to fix lint errors")
	@pnpm lint -- --fix

.PHONY: tsc # check all typescript compiles
tsc: install
	$(call log,"Checking types")
	@pnpm tsc && echo "Types are good"

.PHONY: validate # run tests, eslint and tsc
validate: install test lint tsc

.PHONY: verify-packages # verify all packages are setup correctly
verify-packages: install
	$(call log,"Verifying packages")
	@pnpm verify-packages

.PHONY: build # build all packages
build: install verify-packages clean
	$(call log,"Building all packages")
	@pnpm build

.PHONY: changeset # create a new changeset
changeset: install
	$(call log,"Creating new changeset")
	@pnpm changeset

.PHONY: bump # bump all updated packages
bump: install
	$(call log,"Versioning updated packages")
	@pnpm bump

.PHONY: release # publish all updated packages
release: install
	$(call log,"Releasing updated packages")
	@pnpm release
