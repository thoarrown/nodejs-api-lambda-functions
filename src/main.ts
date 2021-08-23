import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/filter/http-exception.filter';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('APP API')
    .setDescription('Document App api')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  fs.writeFileSync(
    './docs/openAPI/openAPI.json',
    JSON.stringify(document, null, 2),
  );
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
  await app.listen(3000);
}
bootstrap();
