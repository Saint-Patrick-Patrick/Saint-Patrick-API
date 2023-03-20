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
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';

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
  
  const httpServer = app.getHttpServer();
  const io = new socketio.Server(httpServer, {
    cors: {
      origin: '*', // Reemplaza esta URL por la de tu front-end
      methods: ['GET', 'POST'],
      allowedHeaders:'*'
    },
  });
  
  
  app.useWebSocketAdapter(new IoAdapter(io));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Descripción de mi API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalFilters(new CustomExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  
  await httpServer.listen(process.env.PORT || 5000);
}
bootstrap();

