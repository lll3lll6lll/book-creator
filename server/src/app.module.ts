import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {UsersModule} from "@src/users/users.module";
import {UsersService} from "@src/users/services/users.service";
import {dbConfig} from "@src/db/config";

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}),
      TypeOrmModule.forRoot(dbConfig),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          autoSchemaFile: 'schema.gql',
          sortSchema: true,
          playground: true,
          driver: ApolloDriver,
      }),
      UsersModule,
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
