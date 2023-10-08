import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from  'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors( {
    origin: 'http://localhost:5173',
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
