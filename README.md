# GETVOIS

### Requirements:
- Docker
- docker-compose
- php7.4
- node && npm
- yarn (optional, but preferable)

### Setup:
- `cd getvois && composer install`
- `cd ../laradock && cp env-example .env`
- `docker-compose up -d nginx mysql`
- `cd ../getvois && yarn`
- `yarn hot`

After each step you'll see instructions on screen
