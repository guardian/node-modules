export PATH := node_modules/.bin:$(PATH)
export SHELL := /usr/bin/env bash

# UTILS #########################################################

define log
    @echo -e "\x1b[2m$(1)\x1b[0m"
endef

define info
    @echo -e "\x1b[2m$(1)\x1b[0m"
endef

.PHONY: help
help:
	@fnm exec node ./l.js

# ENV CHECKS ####################################################

.PHONY: validate-node
# will error with link to install FNM if it's not installed
validate-node:
	$(call log,"Checking node version")
	@bash -l -c 'fnm use --install-if-missing || { echo -e "\x1b[31mYou need to install FNM:\x1b[0m https://github.com/Schniz/fnm#installation"; exit 1; }'

.PHONY: validate-package-manager
# ensure the correct package manager is installed
validate-package-manager:
	@bash -l -c 'type -t pnpm > /dev/null || { echo -e "\x1b[2mInstalling pnpm"; fnm exec npm install -g pnpm; }'

.PHONY: check-env
check-env: validate-node validate-package-manager

# DEPENDENCY MANAGEMENT #########################################

.PHONY: install
# install deps using pnpm in .nvmrc-mandated node
install: check-env
	$(call log,"Installing dependencies")
	@bash -l -c 'fnm exec pnpm install --reporter=silent'

# WORKFLOWS #####################################################

.PHONY: dev
dev: check-env install
	$(call log,"Starting the dev environment")
	@pnpm test -- --watch

.PHONY: test
test: check-env install
	$(call log,"Running tests")
	@pnpm test --recursive

.PHONY: lint
lint: check-env install
	$(call log,"Linting code")
	@pnpm lint --recursive

.PHONY: fix
fix: check-env install
	$(call log,"Attempting to fix lint errors")
	@pnpm lint --recursive -- --fix

.PHONY: tsc
tsc: check-env install
	$(call log,"Checking types")
	@pnpm tsc --recursive

.PHONY: validate
validate: check-env install test lint tsc

.PHONY: build
build: check-env install
	$(call log,"Building all packages")
	@pnpm build --recursive --parallel

.PHONY: changeset
changeset: check-env install
	$(call log,"Creating new changeset")
	@pnpm changeset

.PHONY: bump
bump: check-env install
	$(call log,"Versioning updated packages")
	@pnpm changeset version

.PHONY: publish
publish: check-env install
	$(call log,"Publishing updated packages")
	@pnpm changeset publish
