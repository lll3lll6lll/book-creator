import { DataSource } from 'typeorm';
import { dbConfig } from '@src/db/config';

export const handler = async () => {
  console.log('Running migrations');
  const connection = new DataSource({
    ...dbConfig,
    schema: 'public',
    logging: 'all',
    migrationsTransactionMode: 'each',
  });

  console.log('Connection initializing ');
  await connection.initialize();
  await connection.query('CREATE SCHEMA IF NOT EXISTS "boo_creator"');
  console.log('Connection initialized');

  let counter = 5;

  while (counter > 0) {
    try {
      await connection.runMigrations({ transaction: 'each' });
      counter = 0;
    } catch (error) {
      console.error(error);
      counter--;
      if (!counter) throw error;
    }
  }
  console.log('Migrations run');
};

handler();
