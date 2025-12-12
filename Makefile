include .env

DB_HOST := localhost

all:
	npm run dev

up:
	docker compose up -d --build

down:
	docker compose down -v

db_init:
	psql -h $(DB_HOST) -d $(POSTGRES_DB) -U $(POSTGRES_USER) -f src/database/init.sql

db_seed:
	psql -h $(DB_HOST) -d $(POSTGRES_DB) -U $(POSTGRES_USER) -f src/database/seed.sql

connect:
	psql -h $(DB_HOST) -d $(POSTGRES_DB) -U $(POSTGRES_USER)

test:
	curl -X GET \
  "http://localhost:$(SERVER_PORT)/GetTickets?dateTimeFrom=2025-01-05T14%3a45%3a37%2b03%3a00&dateTimeTo=2025-03-15T14%3a45%3a37%2b03%3a00&limit=500&offset=0" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "IDENT-Integration-Key: $(IDENT_INTEGRATION_KEY)" \
	| jq