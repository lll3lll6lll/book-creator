import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { Handler } from 'aws-lambda';
import * as process from 'process';

let app;

async function createApp(): Promise<INestApplication> {
  app = await NestFactory.create(AppModule, { snapshot: true });
  app.use(cookieParser());

  if (process.env.NODE_ENV !== 'local') {
    app.setGlobalPrefix(process.env.NODE_ENV);
  }

  return app;
}

export async function getApp() {
  if (app) return app;
  return await createApp();
}

export async function bootstrap(): Promise<Handler> {
  const app = await createApp();
  await app.init();

  console.log('bootstrap function init app');

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}
