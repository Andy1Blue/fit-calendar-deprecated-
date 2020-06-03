﻿![icon](https://raw.githubusercontent.com/Andy1Blue/fit-calendar/master/views/assets/logo-calendar.png)

Training calendar
====

## Description

A project that allows you to track the progress of workouts. Data are presented in the form of clear tiles.

## Technologies and libraries

Libraries and technologies used in the project:
- [Nest](https://nestjs.com/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [React.js](https://facebook.github.io/react/)
- [Bootstrap](https://v4-alpha.getbootstrap.com)
- [SASS](https://sass-lang.com)

## Installation

```bash
$ npm install
```

Create `.env` file.

Create `/views/components/Config/index.js` file.

## Running the app

```bash
# development
$ npm run dev

# backend production mode
$ npm run start:prod

# build views for production
$ npm run build:react
```

## Docker

```
docker-compose -f docker-compose.yml up -d --build
```

## Test

```bash
# unit tests and e2e
$ npm run tests
```
