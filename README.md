# Description

A backend coding test project that develop a backend system using the NestJS and Serverless framework and deploy deployed on AWS Lambda.

All require project from [stayr-official/backend-coding-test](https://github.com/stayr-official/backend-coding-test)

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
