import * as fs from 'fs';
import * as https from 'https';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { CustomExceptionFilter } from './custom-exception.filter';

const httpsOptions = {
  key: fs.readFileSync('path/to/server.key'),
  cert: fs.readFileSync('path/to/server.crt'),
};

const expressServer = require('express')();
const httpsServer = https.createServer(httpsOptions, expressServer);


async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(httpsServer));
  app.use(morgan('dev'));
  app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors(CORS);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new CustomExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
