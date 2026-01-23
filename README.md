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