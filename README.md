[![Build Status](https://travis-ci.org/cerberus-org/cerberus-app.svg?branch=master)](https://travis-ci.org/cerberus-org/cerberus-app)
![Dependencies](https://david-dm.org/cerberus-org/cerberus-app.svg)

# Cerberus

Cerberus is a walk-up-and-use system for volunteers. Visit times are tracked without requiring account creation; name and signature only. Features include a signature pad, charts, volunteer directory, CSV generation, and user system for administrators.

This project is built with [Angular](https://angular.io/) and [Firebase](https://console.firebase.google.com/).

## Prerequisites
1. Install [Yarn](https://yarnpkg.com/en/): `brew install yarn`
2. Install [Angular CLI](https://cli.angular.io/): `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `yarn install`

## Running the app
Run command: `yarn start`

A window will automatically open at [localhost:4200](http://localhost:4200). Angular files are being watched. Any change automatically creates a new bundle and reloads your browser.

## Running unit tests
Run `yarn test` to execute all unit tests with code coverage.

## Running end-to-end tests
Run `yarn e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `yarn start`.

## Running TSLint
Run `yarn lint` (frontend) to execute the linter via [TSLint](https://palantir.github.io/tslint/).
