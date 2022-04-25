# Storefront Backend
This is a backend API that is built in Nodejs that will be used for the frontend of a store.

---

## Packages Installation
To install the packages simply run  `npm install`

## Database Setup
1. Connect to postgreSQL using `psql -U postgres`
2. Setup a user to use on the database using `CREATE USER full_stack_user WITH PASSWORD 'password';`
3. Create the dev and test databases to work on using
      -  `CREATE DATABASE full_stack_dev;`
      -  `CREATE DATABASE full_stack_test`
4. Grant all privileges to full_stack_user on the dev database using
      -  `\c full_stack_dev`
      -  `GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user`
5. Grant all privileges to full_stack_user on the test database using
      -  `\c full_stack_test`
      -  `GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO full_stack_user;`

## Environoment Variables
In order to use this project, you must set the environment variables like the example following below:
**PS**: You need to change POSTGRES_PASSWORD, BCRYPT_PASSWORD and TOKEN_SECRET to your own variables, As well as ENV to "test" or "dev" depending on the database you wish to use
```
ENV="[dev or test]"
POSTGRES_HOST="127.0.0.1"
POSTGRES_DB="full_stack_dev"
POSTGRES_DB_TEST="full_stack_test"
POSTGRES_USER="full_stack_user"
POSTGRES_PASSWORD="[Your postgres password]"
BCRYPT_PASSWORD="[Your Bcrypt password]"
SALTROUNDS="3"
TOKEN_SECRET="[Token secred]"
```

## Table Migrations
- To migrate the tables to the dev database, run `npm run migUp`
- To migrate the tables to the test database, run `npm run migUp:t`

## Starting the App
To start the app, run `npm start`, The app will start on port `8080` and the database will start on port `5432`

## Authentication
The JWT authorization token should be provided in the headers as key value like this `Authorization : Bearer [token]`