.PHONY: build lint server shell start stop test

build:
	@echo "Building image:"
	docker-compose build

lint: start
	@echo "Linting project files:"
	docker-compose exec app yarn lint

server: start
	@echo "Starting app server:"
	docker-compose exec app yarn start

shell: start
	@echo "Getting a shell inside the container:"
	docker-compose exec app bash

start:
	@echo "Starting container(s):"
	docker-compose up -d

stop:
	@echo "Bringing Docker down:"
	docker-compose down

test: start
	@echo "Running tests:"
	docker-compose exec app yarn test
