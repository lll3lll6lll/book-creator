import { bootstrap } from './app';
import { Callback, Context, Handler } from 'aws-lambda';
// import serverlessExpress from 'aws-serverless-express';

let server: Handler;

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());

  console.log('event', JSON.stringify(event));
  return server(event, context, callback);
};
