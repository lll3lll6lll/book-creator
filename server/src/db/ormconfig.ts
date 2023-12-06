import { DataSource } from 'typeorm';
import { dbConfig } from '@src/db/config';

const connectionSource = new DataSource(dbConfig);

export default connectionSource;
