import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GqlModuleAsyncOptions,
  GqlModuleOptions,
  GraphQLModule,
} from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from '@src/users/users.module';
import { dbConfig } from '@src/db/config';
import { BooksModule } from '@src/books/books.module';
import { CommentsModule } from '@src/comments/comments.module';
import { AppContextModule } from '@src/shared/app-context/module';
import { ChaptersModule } from '@src/chapters/chapters.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from '@src/auth/auth.module';
import { TokenModule } from '@src/auth/auth-token/token.module';
import { AppInterceptor } from '@src/app.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(dbConfig),
    EventEmitterModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        const schemaModuleOptions: Partial<GqlModuleOptions> = {};

        // If we are in development, we want to generate the schema.graphql
        // if (process.env.NODE_ENV == 'local') {
        //   schemaModuleOptions.autoSchemaFile = 'schema.gql';
        // } else {
        //   // For production, the file should be generated
        //   schemaModuleOptions.typePaths = ['*.gql'];
        // }

        return {
          context: ({ req, res }) => ({ req, res }),
          ...schemaModuleOptions,
          autoSchemaFile:
            process.env.NODE_ENV === 'local'
              ? 'schema.gql'
              : '../../tmp/schema.gql',
          useGlobalPrefix: true, // <==
          playground: true, // Allow playground in production
          introspection: true, // Allow introspection in production
        };
      },
    } as GqlModuleAsyncOptions),

    AuthModule,
    TokenModule,
    UsersModule,
    BooksModule,
    CommentsModule,
    AppContextModule,
    ChaptersModule,
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: AppInterceptor }],
})
export class AppModule {}
