# CerberusApp

The frontend is generated with [Angular CLI](https://github.com/angular/angular-cli). The backend is made from scratch. Whole stack in [TypeScript](https://www.typescriptlang.org).

This project uses the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**A**ngular 4](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment

Other tools and technologies used:
* [Angular CLI](https://cli.angular.io): frontend scaffolding
* [Angular Material](https://material.angular.io/): layout, icons, and styles

## Prerequisites
1. Install [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com)
2. Install Angular CLI: `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `npm i`

## Run
### Development mode
`npm run dev`: [Concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MongoDB, Angular build, TypeScript compiler and Express server.

### Production mode
`npm start`: Run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000).

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

## Running unit tests
Run `npm test` to execute all unit tests.

### Client
Run `npm run test-client` to execute the client unit tests via [Karma](https://karma-runner.github.io).

### Server
Run `npm run test-server` to execute the client unit tests via [jasmine-node](https://github.com/mhevery/jasmine-node).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `npm start`.

## Running TSLint
Run `ng lint` (frontend) and `npm run lintbe` (backend) to execute the linter via [TSLint](https://palantir.github.io/tslint/).

## Commit message guidelines

The seven rules of a great Git commit message:

>Keep in mind: This has all been said before.

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how
