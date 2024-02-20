import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
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
import { join } from 'path';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(dbConfig),
    EventEmitterModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:
        process.env.NODE_ENV === 'local'
          ? 'schema.gql'
          : '../../tmp/schema.gql',
      sortSchema: true,
      introspection: true,
      useGlobalPrefix: true,
      playground: true,
      // playground: {
      //   settings: {
      //     'request.credentials': 'include', // Otherwise cookies won't be sent
      //   },
      // },

      context: ({ req, res }) => ({ req, res }),
    }),
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
