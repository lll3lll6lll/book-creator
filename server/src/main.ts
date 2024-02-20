import { bootstrap, getApp } from './app';
import { ConfigService } from '@nestjs/config';

async function start() {
  await bootstrap();
  const app = await getApp();

  const config: ConfigService = await app.get(ConfigService);
  const port = config.get<number>('PORT');

  await app.listen(port || 3000, () => {
    console.log(`App started on port: ${port}`);
  });
}

start();
