import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { printSchema } from 'graphql';

import { createServer } from 'aws-serverless-express';

async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, { snapshot: true });
  app.use(cookieParser());

  app.setGlobalPrefix('api');
  return app;
}
export async function bootstrap() {
  const app = await createApp();
  const config = await app.get(ConfigService);
  const port = config.get<number>('PORT');

  // if (process.env.NODE_ENV === 'production') {
  // const { schema } = app.get(GraphQLSchemaHost);
  // writeFileSync(join(process.cwd(), `/schema.gql`), printSchema(schema));
  // }

  await app.listen(port || 3000, () => {
    console.log(`App started on port: ${port}`);
  });

  return createServer(app);
}
