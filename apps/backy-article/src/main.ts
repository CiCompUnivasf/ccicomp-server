import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { createServer } from './server';

let server: Handler;

const createServerInstance = async () => {
  const app = await createServer();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({ app: expressApp });
};

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('server cached:', !!server);

  server = server ?? (await createServerInstance());

  return server(event, context, callback);
};

const isServerlessOffline = process.env.IS_OFFLINE === 'true';

if (process.env.APP_ENV === 'local' && !isServerlessOffline) {
  createServer().then((app) => app.listen(3000));
}
