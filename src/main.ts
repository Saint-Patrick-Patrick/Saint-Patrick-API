import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  app.use(morgan('dev'));
  app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
