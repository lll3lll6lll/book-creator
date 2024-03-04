import { bootstrap, getApp } from './app';
import { Callback, Context, Handler } from 'aws-lambda';
import { ConfigModule, ConfigService } from '@nestjs/config';

let server: Handler;

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  console.log('event', JSON.stringify(event));

  await ConfigModule.envVariablesLoaded;
  const app = await getApp();
  const config: ConfigService = await app.get(ConfigService);
  const schema = config.get<number>('DATABASE_SCHEMA');
  console.log('config-----', schema, JSON.stringify(config));

  return server(event, context, callback);
};
