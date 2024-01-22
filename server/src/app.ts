import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
// import serverlessExpress from '@codegenie/serverless-express';
import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { Handler } from 'aws-lambda';

async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, { snapshot: true });
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  return app;
}

export async function bootstrap(): Promise<Handler> {
  const app = await createApp();
  await app.init();
  const config = await app.get(ConfigService);
  const port = config.get<number>('PORT');

  await app.listen(port || 3000, () => {
    console.log(`App started on port: ${port}`);
  });

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}
