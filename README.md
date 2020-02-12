# Emma Test App

## Intro

Small project to mock one of Emma's core features: connect to a bank account and surface insights about the spending.
This small backend, implements the following:

- User authentication flow with TrueLayer
- After login, the transaction are stored on a relational database
- Provides an endpoint `/transactions/{user_id}` to retrieve the stored transactions
- Provides an endpoint `/debug/{user_id}` to refetch the data and return additional information about the API calls

### Prerequisites

- `yarn` (recommended) or `npm`
- Node.js v10+

### Getting started

- Clone this repo
- Create a copy of the file `.env.example` with the name `.env` and replace the truelayer's client ids and database connection keys
- move in the root folder and run `yarn` or `npm i` to install the dependencies

### Scripts

To run the tests:

- `yarn:test` or `npm run test` runs the tests
- `yarn test:watch` or `npm run test:watch` runs the tests in watch mode

To start the app:

- `yarn start:dev` or `npm run start:dev` to run the app in dev mode
- `yarn start` or `npm run start` to build and run a production build

To build the app:

- `yarn build` or `npm run build`

### Users

This client has been developed against the TrueLayer API Sandbox. You can test it with [TrueLayer's mock users](https://docs.truelayer.com/#mock-users)

_Assumptions Notes_

- The only user with data that will allow the store of data is John Doe
- Given the above, it will be possible to run the debug endpoint against that test user

### Data

In order to minimize the setup of this project, the database is hosted on a third party service (which has been verified) to simulate a remote data store.
Anyway, it will work with any local mysql database provided that the credentials in the `.env` file are correct.

For the sake of this test project best security practices are not in place, but a few actions to protect them would be:

- protect the data behind a VPN
- hash salt the sensible data
- implement MFA for login
