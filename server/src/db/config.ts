import * as dotenv from 'dotenv';
dotenv.config();

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { extname, join } from 'path';
import * as process from 'process';

export const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  entities: [join(__dirname, `./../**/*.{entity,view}${extname(__filename)}`)],
  migrations: [join(__dirname, `/migrations/*${extname(__filename)}`)],
  migrationsTableName: 'migrations_history',
  synchronize: false,
  migrationsRun: true,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  schema: process.env.DATABASE_SCHEMA,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  ssl:
    process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  poolSize: process.env.DATABASE_POOL_SIZE
    ? +process.env.DATABASE_POOL_SIZE || 40
    : 40,
};
