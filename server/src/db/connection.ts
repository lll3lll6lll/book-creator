import { DataSource } from 'typeorm';
import { dbConfig } from '@src/db/config';

export const createConnection = new DataSource({
  ...dbConfig,
  logging: 'all',
  migrationsTransactionMode: 'each',
});
