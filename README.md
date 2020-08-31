# WonderQ

## API docs
- [docs](docs.md)

## Possible Scalling
- [scalling](scalling.md)

## Setup

```
npm install
npm run start:dev
```

## Build
```
npm run build
npm run start
```

## Docker

With docker and docker compose installed. Run in development environment.
```
npm install
docker-compose up wonderq
```

## Environment variables

The messages processing timeout is set via LOCK_MESSAGES_TIMEOUT environment variable and it's value is set in ms. It defines the timeout to unlock messages from others consumers to get them.

Example running server:
```
export LOCK_MESSAGES_TIMEOUT=10000 npm run start:dev
```