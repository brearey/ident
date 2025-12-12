include .env

all:
	npm run dev

db_start:
	docker compose down -v
	docker compose up -d --build

db_init:
	psql -h localhost -d $(POSTGRES_DB) -U $(POSTGRES_USER) -f src/database/init.sql

db_seed:
	psql -h localhost -d $(POSTGRES_DB) -U $(POSTGRES_USER) -f src/database/seed.sql

test:
	curl -X GET \
  "http://localhost:$(SERVER_PORT)/GetTickets?dateTimeFrom=2017-01-01T00:00:00+03:00&dateTimeTo=2200-01-01T23:59:59+03:00&limit=500&offset=0" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json"