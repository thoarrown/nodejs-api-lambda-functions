import {
  HttpException,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import express from 'express';
import { Server } from 'http';
import { AppModule } from '@app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@app/filter/http-exception.filter';

let cachedServer: Server;
/**
 * Enable Swagger
 * @returns
 */
function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('APP API')
    .setDescription('Document App api')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

const bootstrapServer = async (): Promise<Server> => {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    app.use(eventContext());
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
    app.enableCors();
    // swagger
    setupSwagger(app);
    await app.init();

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (error) => {
          const objError = error[0].constraints;
          throw new HttpException(
            objError[Object.keys(objError)[0]],
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    );

    cachedServer = createServer(expressApp);
  }
  return cachedServer;
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (event.path === '/api') {
    event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui')
    ? `/api${event.path}`
    : event.path;

  cachedServer = await bootstrapServer();

  return proxy(cachedServer, event, context, 'PROMISE').promise;
};

// import { Handler, Context } from 'aws-lambda';
// import { Server } from 'http';
// import { createServer, proxy } from 'aws-serverless-express';
// import { eventContext } from 'aws-serverless-express/middleware';

// import { NestFactory } from '@nestjs/core';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import { AppModule } from './app/app.module';
// import { HttpExceptionFilter } from '@app/filter/http-exception.filter';

// const express = require('express');

// // NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this
// // is likely due to a compressed response (e.g. gzip) which has not
// // been handled correctly by aws-serverless-express and/or API
// // Gateway. Add the necessary MIME types to binaryMimeTypes below
// const binaryMimeTypes: string[] = [];

// let cachedServer: Server;

// // Create the Nest.js server and convert it into an Express.js server
// async function bootstrapServer(): Promise<Server> {
//   if (!cachedServer) {
//     const expressApp = express();
//     const nestApp = await NestFactory.create(AppModule, new
//       ExpressAdapter(expressApp))
//     nestApp.use(eventContext());
//     nestApp.useGlobalFilters(new HttpExceptionFilter());
//     await nestApp.init();
//     cachedServer = createServer(expressApp, undefined,
//       binaryMimeTypes);
//   }
//   return cachedServer;
// }

// // Export the handler : the entry point of the Lambda function
// export const handler: Handler = async (event: any, context: Context) => {
//   cachedServer = await bootstrapServer();
//   return proxy(cachedServer, event, context, 'PROMISE').promise;
// }