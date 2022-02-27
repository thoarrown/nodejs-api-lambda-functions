# Description

A backend coding project that develop a backend system using the NestJS and Serverless framework and deploy deployed on AWS Lambda.

Create a blog service that allows the creation and management of blog articles which will be stored both on the PostgreSQL instance and on a Firebase firestore instance. All api routes of the blog service should be protected and only accessible through the admin role.

## Features:

- Middleware that validates firebase auth token for each request.
- CRON Job that will run once a day.
- Deploy all work as instructed on AWS.
- Generate an [OpenAPI](https://swagger.io/specification/) documentation for all routes

## Technologies

- [AWS Lambda](https://aws.amazon.com/lambda)
- [Postgres](https://www.postgresql.org/)
- [Serverless](https://serverless.com/framework/docs/providers/aws/)
- [NestJS](https://docs.nestjs.com/)
- [Firebase](https://console.firebase.google.com/)

## Prepare for run

- Prepare connection to DB postgres
- Register Firebase Console and get credential write in .env file.Then get client replace to src/app/modules/firebase/firebase.client.json. Refference: [Firebase Auth using using PassportJs at Medium](https://medium.com/nerd-for-tech/nestjs-firebase-auth-secured-nestjs-app-using-passport-60e654681cff)

### Environment

```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

FIREBASE_CLIENT_EMAIL=
FIREBASE_PROJECT_ID=
FIREBASE_PUBLIC_KEY=
FIREBASE_PRIVATE_KEY=
```

## Local Offline Development

```bash
# start nestjs
$ npm run start:nest

# start serverless-offline server
$ npm run start:sls

```

## Deploy to AWS

```bash
# build dist folder and deploy
$ npm run build & npm run sls:deploy
```

## Learn More

To learn more about some of the technologies used, take a look at the following resources:

- [Nest.js Documentation](https://docs.nestjs.com/)
- [Dayjs](https://day.js.org/)
- [Serverless](https://www.serverless.com/framework/docs/)
- [AWS Lambda](https://aws.amazon.com/lambda/getting-started/)
- [PostgreSQL](https://www.postgresql.org/)
- [ElephantSQL](https://www.elephantsql.com/docs/index.html)
