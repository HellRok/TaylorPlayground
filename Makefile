deploy:
	caprover deploy --default --caproverApp playground --branch main

build:
	docker build . --pull --tag taylor-playground

playgrounds: build
	bin/docker/dev-playgrounds

run: build
	docker run --publish 3001:3000 taylor-playground:latest

shell: build
	docker run -it taylor-playground:latest bash
