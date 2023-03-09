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

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
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
