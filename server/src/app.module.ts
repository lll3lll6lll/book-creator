import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from '@src/users/users.module';
import { dbConfig } from '@src/db/config';
import { BooksModule } from './books/books.module';
import { CommentsModule } from './comments/comments.module';
import { AppContextModule } from '@src/app-context/module';
// import { AppInterceptor } from '@src/app.interceptor';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { ChaptersModule } from './chapter/chapters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(dbConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),
    UsersModule,
    BooksModule,
    CommentsModule,
    AppContextModule,
    ChaptersModule,
  ],
  controllers: [],
  // providers: [{ provide: APP_INTERCEPTOR, useClass: AppInterceptor }],
})
export class AppModule {}
