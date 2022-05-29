<p align="center">
  <img src="https://avatars.githubusercontent.com/u/74259159?s=400&u=f78019832abe9865d4a54908c15f6ddb54ed3003&v=4" width="200" alt="Persist Logo" />
</p>

<p align="center">Postventa service</p>
    <p align="center">

## Description

Postventa API

## Installation

```bash
$ npm install
```
## Data base configuration to develop
It's necesarry install [dokcer](https://www.docker.com/).

Once [dokcer](https://www.docker.com/) was installed.

```bash
$ docker-compose up -d
```
The last command will use the docker-compose.yml configuration and generate a postgres container.

To stop the container use:
```bash
$ docker-compose down
```

## Environments variables configuration to develop
Use the example file as example environment.example

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoint docuemntation
The service use [Swagger](https://swagger.io/) for endpoint docuemtnation.

Access to http://localhost:3000/docs


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - Persist
