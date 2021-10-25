# make node_modules binaries available
export PATH := node_modules/.bin:$(PATH)

# standardise on a shell
export SHELL := /usr/bin/env bash

# UTILS #########################################################

define log
    @echo -e "\x1b[34m[ $(1) ]\x1b[0m"
endef

.DEFAULT_GOAL: help
.PHONY: help # list available commands
help:
	@fnm exec node ./lib/describe-makefile.js

# ENVIRONMENT #########################################

.PHONY: install # install everything you need to run the project
# - use FNM to install the NODE version we need, or prompt to install FNM if it's missing
# - use npm to install pnpm to local node_modules if it's not available on the system
#   - this means we can use pnpm in here as if it was globally installed
#   - we use --no-save to just get the files, not save it in package.json
# - install deps using correct package manager in .nvmrc-mandated node
install:
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

# WORKFLOWS #####################################################

.PHONY: dev # run the dev server and test suite in watch mode
dev: install
	$(call log,"Starting the dev environment")
	@pnpm test --watch

.PHONY: test # run all tests
test: install
	$(call log,"Running tests")
	@pnpm jest

.PHONY: lint # run eslint over all source code
lint: install
	$(call log,"Linting files")
	@eslint . --ext .ts,.tsx,.js

.PHONY: fix # try to fix eslint errors
fix: install
	$(call log,"Attempting to fix lint errors")
	@eslint . --ext .ts,.tsx,.js --fix

.PHONY: tsc # check all typescript compiles
tsc: install
	$(call log,"Checking types")
	@tsc

.PHONY: validate # run tests, eslint and tsc
validate: install test lint tsc

.PHONY: build # build all packages
build: install
	$(call log,"Building all packages")
	@pnpm build --recursive --parallel

.PHONY: changeset # create a new changeset
changeset: install
	$(call log,"Creating new changeset")
	@pnpm changeset

.PHONY: bump # bump all updated packages
bump: install
	$(call log,"Versioning updated packages")
	@pnpm changeset version

.PHONY: publish # publish all updated packages
publish: install
	$(call log,"Publishing updated packages")
	@pnpm changeset publish
