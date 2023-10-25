import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from  'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { CustomWsExceptionsFilter } from './chat/custom-ws-exception.filter';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CustomExceptionsFilter } from './CustomExceptionsFilter';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new CustomExceptionsFilter());
  app.enableCors( {
    origin: `http://${process.env.REACT_APP_HOST}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use(cookieParser());
  
  const config = new DocumentBuilder()
    .setTitle('Ft_transcendence')
    .setDescription('the Ft_transcendence API description')
    .setVersion('0.1')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
