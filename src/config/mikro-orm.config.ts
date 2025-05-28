import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from '../users/user.entity'; // à adapter selon ton projet
import { Task } from '../tasks/task.entity';
import * as dotenv from 'dotenv';
dotenv.config();
const config: Options<PostgreSqlDriver> = {
  entities: [User, Task],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  // type: 'postgresql',
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
};

export default config; // Assure-toi que la configuration est exportée par défaut
