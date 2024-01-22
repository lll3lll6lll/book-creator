import { bootstrap } from './app';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
