SHELL := /bin/bash

PROJECTNAME := $(shell basename "$(PWD)")
BUILD_PARAMS=
BUILD_TAG=latest
TAG=
# Example of DOCKER_REGISTRY: nexus.domain.com:443/
DOCKER_REGISTRY=
HELM_ADDITIONAL_PARAMS=
# Specify gcp auth keys
MOCKS_DIR=target/mocks
# Specify where swagger spec for odahu-flow-api application is located
SWAGGER_FILE=
# Specify where swagger spec for service-catalog application is located
SWAGGER_FILE_CATALOG=
# Specify target folder for generated models for odahu-flow-api
TS_MODEL_DIR=src/models/odahuflow
# Specify target folder for generated models for service-catalog
TS_CATALOG_MODEL_DIR=src/models/service-catalog
SWAGGER_CODEGEN_BIN=java -jar swagger-codegen-cli.jar

ROBOT_FILES=**/*.robot
ROBOT_THREADS=6
ROBOT_OPTIONS=-e disable
ROBOT_CONFIG=tests/odahu-web-ui/config

SECRET_DIR := $(CURDIR)/.secrets
CLUSTER_PROFILE := ${SECRET_DIR}/cluster_profile.json

-include .env

.EXPORT_ALL_VARIABLES:

all: help

check-tag:
	@if [ "${TAG}" == "" ]; then \
	    echo "TAG is not defined, please define the TAG variable" ; exit 1 ;\
	fi
	@if [ "${DOCKER_REGISTRY}" == "" ]; then \
	    echo "DOCKER_REGISTRY is not defined, please define the DOCKER_REGISTRY variable" ; exit 1 ;\
	fi

## docker-build-notebook: Builds UI docker image
docker-build-ui:
	docker build -t odahu/odahu-ui:${BUILD_TAG} \
	-f containers/ui/Dockerfile .

## docker-build-all-notebooks: Build all docker image
docker-build-all:  docker-build-ui

## docker-run-ui: Run UI server in docker container
docker-run-ui:
	docker run -it --rm -p 80:80 odahu/odahu-ui:${BUILD_TAG}

## docker-push-ui: Push ui docker image
docker-push-ui:
	docker tag odahu/odahu-ui:${BUILD_TAG} ${DOCKER_REGISTRY}/odahu/odahu-ui:${TAG}
	docker push ${DOCKER_REGISTRY}/odahu/odahu-ui:${TAG}

## install-dependencies: Install all package dependencies
install-dependencies:
	npm install

## lint: Lints source code
lint:
	npm run lint

## generate-ts-client: Generate typescript models
generate-ts-client:
	# odahu-flow-api models
	mkdir -p ${MOCKS_DIR}
	rm -rf ${MOCKS_DIR}/ts
	$(SWAGGER_CODEGEN_BIN) generate \
		-i ${SWAGGER_FILE} \
		-l typescript-jquery \
		-o ${MOCKS_DIR}/ts \
		--model-package odahuflow

	rm -rf ${TS_MODEL_DIR}
	mkdir -p ${TS_MODEL_DIR}
	cp -r ${MOCKS_DIR}/ts/odahuflow/* ${TS_MODEL_DIR}
	git add ${TS_MODEL_DIR}
	rm -rf ${MOCKS_DIR}

	# service-catalog models
	mkdir -p ${MOCKS_DIR}
	rm -rf ${MOCKS_DIR}/ts
	$(SWAGGER_CODEGEN_BIN) generate \
		-i ${SWAGGER_FILE_CATALOG} \
		-l typescript-jquery \
		-o ${MOCKS_DIR}/ts \
		--model-package odahuflow

	rm -rf ${TS_CATALOG_MODEL_DIR}
	mkdir -p ${TS_CATALOG_MODEL_DIR}
	cp -r ${MOCKS_DIR}/ts/odahuflow/* ${TS_CATALOG_MODEL_DIR}
	git add ${TS_CATALOG_MODEL_DIR}
	rm -rf ${MOCKS_DIR}

## unittests: Run unit tests
unittests:
	npm test

## ui-robot: Run Web UI robot tests
ui-robot:
	pabot --argumentfile1 ${ROBOT_CONFIG}/chrome.txt \
	      --argumentfile2 ${ROBOT_CONFIG}/firefox.txt \
	      --verbose --processes ${ROBOT_THREADS} \
	      -v CLUSTER_PROFILE:${CLUSTER_PROFILE} \
	      --listener odahuflow.robot.process_reporter \
	      --outputdir target tests/odahu-web-ui/*.robot

## install-vulnerabilities-checker: Install the vulnerabilities-checker
install-vulnerabilities-checker:
	./scripts/install-git-secrets-hook.sh install_binaries

## check-vulnerabilities: Сheck vulnerabilities in the source code
check-vulnerabilities:
	./scripts/install-git-secrets-hook.sh install_hooks
	git secrets --scan -r

## help: Show the help message
help: Makefile
	@echo "Choose a command run in "$(PROJECTNAME)":"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sort | sed -e 's/\\$$//' | sed -e 's/##//'
	@echo
