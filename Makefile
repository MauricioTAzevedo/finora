.PHONY: dev test lint format migrate seed docker-up docker-down reset-demo help

help:
	@echo "Finora Development Tasks:"
	@echo "  make dev          - Start local dev infrastructure and web application"
	@echo "  make test         - Run unit and domain invariant tests"
	@echo "  make lint         - Run linters across workspace"
	@echo "  make docker-up    - Start PostgreSQL, NATS, Redis, MinIO containers"
	@echo "  make docker-down  - Stop development containers"
	@echo "  make seed         - Seed synthetic Brazilian household demo data"

dev: docker-up
	npm run dev

test:
	npm test

lint:
	npm run lint

docker-up:
	docker compose up -d

docker-down:
	docker compose down

seed:
	npm run seed
