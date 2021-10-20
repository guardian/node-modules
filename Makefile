export PATH := node_modules/.bin:$(PATH)
export SHELL := /usr/bin/env bash

# UTILS #########################################################

define log
    @echo -e "\x1b[2m$(1)\x1b[0m"
endef

define info
    @echo -e "\x1b[2m$(1)\x1b[0m"
endef

.DEFAULT_GOAL: help
.PHONY: help # list available commands
help:
	@fnm exec node ./lib/describe-makefile.js

# ENVIRONMENT ####################################################

.PHONY: --use-node-version
--use-node-version:
	$(call log,"Checking node version")
	@bash -l -c 'fnm use --install-if-missing || { echo -e "\x1b[31mYou need to install FNM:\x1b[0m https://github.com/Schniz/fnm#installation"; exit 1; }'

.PHONY: --ensure-package-manager # ensure the correct package manager is available
--ensure-package-manager:
	@bash -l -c 'type -t pnpm > /dev/null || { fnm exec npm install pnpm --no-save --silent; }'

.PHONY: --check-env
--check-env: --use-node-version --ensure-package-manager

# DEPENDENCY MANAGEMENT #########################################

.PHONY: install # install deps using correct package manager in .nvmrc-mandated node
install: --check-env
	$(call log,"Installing dependencies")
	@bash -l -c 'fnm exec pnpm install'

# WORKFLOWS #####################################################

.PHONY: dev # run the dev server and test suite in watch mode
dev: --check-env install
	$(call log,"Starting the dev environment")
	@pnpm test -- --watch

.PHONY: test # run all tests
test: --check-env install
	$(call log,"Running tests")
	@pnpm test --recursive

.PHONY: lint # run eslint over all source code
lint: --check-env install
	$(call log,"Linting code")
	@eslint . --ext .ts,.tsx,.js

.PHONY: fix # try to fix eslint errors
fix: --check-env install
	$(call log,"Attempting to fix lint errors")
	@eslint . --ext .ts,.tsx,.js --fix

.PHONY: tsc # check all typescript compiles
tsc: --check-env install
	$(call log,"Checking types")
	@pnpm tsc --recursive

.PHONY: validate # run tests, eslint and tsc
validate: --check-env install test lint tsc

.PHONY: build # build all packages
build: --check-env install
	$(call log,"Building all packages")
	@pnpm build --recursive --parallel

.PHONY: changeset # create a new changeset
changeset: --check-env install
	$(call log,"Creating new changeset")
	@pnpm changeset

.PHONY: bump # bump all updated packages
bump: --check-env install
	$(call log,"Versioning updated packages")
	@pnpm changeset version

.PHONY: publish # publish all updated packages
publish: --check-env install
	$(call log,"Publishing updated packages")
	@pnpm changeset publish
