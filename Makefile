.PHONY: docker-build
docker-build:
	docker build -t dreamteam-platform .

.PHONY: docker-start
docker-start: docker-build
	docker run dreamteam-platform

.PHONY: start
start:
	npm run start
