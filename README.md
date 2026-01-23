# Бэкенд сервис для записи к стоматологу

start DB
make up

start prod
npm run build && npm run prod

pm2 logs
pm2 monit
pm2 ps
pm2 stop 0
pm2 delete 0

Пример запроса от IDENT:
GET | /GetTickets | dateTimeFrom = 2025-12-16T00:00:00+07:00 | dateTimeTo =2200-01-01T23:59:59+07:00 | limit = undefined | offset = undefined

## Transfer

## Перенос приложения на их хостинг

### Что есть?
У клиента (https://dentaplus-norilsk.ru/) есть хостинг в Бегет. Сайт создан на вордпресс. Оплачивают хостинг 13,81 руб/день. Свободно 11 Гб. Три слота для создания сайта свободны.
В офисе на рабочих компах установлена программа Ident. В котором настроен внешний сервис.

### Что предлагаем
1. Подключить в beget VPS (виртуальный сервер) от 7 рублей/день
2. Создать поддомен для dentaplus-norilsk.ru чтобы была как `ident,dentaplus-norilsk.ru` Скорее всего сертификат будет действовать и на поддомен.
3. Прикрепить поддомен к VPS
4. Поднять Node JS приложение на новом VPS.
5. Настроить внешний доступ к приложению
6. Настроить внешний сервис Ident на новый домен `ident,dentaplus-norilsk.ru`
7. Создать новый credentials для Ident
8. Настроить страницу записи к стоматолоку dentaplus-norilsk.ru на новый домен `ident,dentaplus-norilsk.ru`
9. на сервер настроить CORS

# ident VPS
ubuntu 24.04
ssh key: home ubuntu pulbic key
root@155.212.133.18
password i###T##3@
```bash
ssh root@155.212.133.18
```

## Setting up firewall with UFW

- `dpkg -l ufw` проверить установку ufw
- `sudo ufw allow OpenSSH` открыть стандартный порт 22 для ssh
- `sudo ufw enable` включить ufw фаервол
- `sudo ufw app list` посмотреть доступные правила для приложений
- `sudo ufw allow 5100` открыть порт 5100 для доступа извне
- `sudo ufw status numbered` получить нумерованный список правил
- `sudo ufw delete N` удалить правило номер N
- `sudo ufw disable` отключить ufw фаервол

## Problems on deply:

### Database error user

The files belonging to this database system will be owned by user "postgres".
This user must also own the server process.

The database cluster will be initialized with locale "en_US.utf8".
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.

fixing permissions on existing directory /var/lib/postgresql/data ... ok
creating subdirectories ... ok
selecting dynamic shared memory implementation ... posix
selecting default max_connections ... 100
selecting default shared_buffers ... 128MB
selecting default time zone ... UTC
creating configuration files ... ok
running bootstrap script ... ok
sh: locale: not found
2026-01-23 12:48:36.141 UTC [33] WARNING:  no usable system locales were found
performing post-bootstrap initialization ... ok
syncing data to disk ... ok


Success. You can now start the database server using:

    pg_ctl -D /var/lib/postgresql/data -l logfile start

initdb: warning: enabling "trust" authentication for local connections
initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.
waiting for server to start....2026-01-23 12:48:36.713 UTC [39] LOG:  starting PostgreSQL 16.10 on x86_64-pc-linux-musl, compiled by gcc (Alpine 14.2.0) 14.2.0, 64-bit
2026-01-23 12:48:36.713 UTC [39] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2026-01-23 12:48:36.717 UTC [42] LOG:  database system was shut down at 2026-01-23 12:48:36 UTC
2026-01-23 12:48:36.721 UTC [39] LOG:  database system is ready to accept connections
 done
server started
CREATE DATABASE


/usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/init.sql
psql:/docker-entrypoint-initdb.d/init.sql:1: NOTICE:  table "IDENT_Tickets" does not exist, skipping
DROP TABLE
psql:/docker-entrypoint-initdb.d/init.sql:2: NOTICE:  table "IDENT_Intervals" does not exist, skipping
DROP TABLE
psql:/docker-entrypoint-initdb.d/init.sql:3: NOTICE:  table "IDENT_Doctors" does not exist, skipping
DROP TABLE
DROP TABLE
psql:/docker-entrypoint-initdb.d/init.sql:4: NOTICE:  table "IDENT_Branches" does not exist, skipping
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE


waiting for server to shut down....2026-01-23 12:48:36.912 UTC [39] LOG:  received fast shutdown request
2026-01-23 12:48:36.913 UTC [39] LOG:  aborting any active transactions
2026-01-23 12:48:36.920 UTC [39] LOG:  background worker "logical replication launcher" (PID 45) exited with exit code 1
2026-01-23 12:48:36.920 UTC [40] LOG:  shutting down
2026-01-23 12:48:36.921 UTC [40] LOG:  checkpoint starting: shutdown immediate
2026-01-23 12:48:36.950 UTC [40] LOG:  checkpoint complete: wrote 933 buffers (5.7%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.018 s, sync=0.010 s, total=0.030 s; sync files=311, longest=0.001 s, average=0.001 s; distance=4335 kB, estimate=4335 kB; lsn=0/192E4B0, redo lsn=0/192E4B0
2026-01-23 12:48:36.957 UTC [39] LOG:  database system is shut down
 done
server stopped

PostgreSQL init process complete; ready for start up.

2026-01-23 12:48:37.034 UTC [1] LOG:  starting PostgreSQL 16.10 on x86_64-pc-linux-musl, compiled by gcc (Alpine 14.2.0) 14.2.0, 64-bit
2026-01-23 12:48:37.035 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2026-01-23 12:48:37.035 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2026-01-23 12:48:37.035 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2026-01-23 12:48:37.039 UTC [57] LOG:  database system was shut down at 2026-01-23 12:48:36 UTC
2026-01-23 12:48:37.043 UTC [1] LOG:  database system is ready to accept connections
2026-01-23 12:48:45.592 UTC [67] FATAL:  database "identdbuser" does not exist
2026-01-23 12:48:55.641 UTC [73] FATAL:  database "identdbuser" does 

### subdomain ident.* is HTTP (without SSL)