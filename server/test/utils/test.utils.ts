import { ModuleMetadata, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import GraphQLJSON from 'graphql-type-json';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from '@src/db/config';

export function initGqlTestNest({
  imports = [],
  ...opts
}: Partial<ModuleMetadata> = {}): Promise<{
  module: TestingModule;
  app: INestApplication;
}> {
  imports.push(
    GraphQLModule.forRoot<ApolloDriverConfig>({
      resolvers: { JSON: GraphQLJSON },
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  );
  const options = { ...opts, imports };
  return initTestNest(options);
}

export async function initTestNest({
  imports = [],
  providers = [],
  ...opts
}: Partial<ModuleMetadata> = {}): Promise<{
  module: TestingModule;
  app: INestApplication;
}> {
  const module = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot(dbConfig),
      ConfigModule.forRoot({ isGlobal: true }),
      ...imports,
    ],
    providers: [...providers],
    ...opts,
  }).compile();

  const app = await module.createNestApplication();
  await app.init();

  return { app, module };
}
