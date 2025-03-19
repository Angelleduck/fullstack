import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: process.env.Client_Url, credentials: true }));
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
  );
  await app.listen(2000);
}
bootstrap();
